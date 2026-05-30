import type { Question } from "./db";

type SelfRating = "mastered" | "fuzzy" | "unknown";

// ── Provider abstraction ──────────────────────────────────────────────────────
// Priority: Anthropic (Claude) > DeepSeek > null (fallback to local algorithm)

type ModelTier = "fast" | "powerful";

export function aiProvider(): "anthropic" | "deepseek" | null {
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.DEEPSEEK_API_KEY) return "deepseek";
  return null;
}

const CLAUDE_MODELS: Record<ModelTier, string> = {
  fast: "claude-sonnet-4-6",
  powerful: "claude-opus-4-7",
};

const DEEPSEEK_MODELS: Record<ModelTier, string> = {
  fast: "deepseek-chat",
  powerful: "deepseek-chat",
};

export async function chatCompletion(
  prompt: string,
  opts: { tier: ModelTier; maxTokens: number },
): Promise<string> {
  const provider = aiProvider();
  if (provider === "anthropic") {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: CLAUDE_MODELS[opts.tier],
      max_tokens: opts.maxTokens,
      messages: [{ role: "user", content: prompt }],
    });
    return message.content[0].type === "text" ? message.content[0].text : "";
  }
  if (provider === "deepseek") {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODELS[opts.tier],
        max_tokens: opts.maxTokens,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });
    if (!res.ok) {
      throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
    }
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content ?? "";
  }
  throw new Error("No AI provider configured (set ANTHROPIC_API_KEY or DEEPSEEK_API_KEY)");
}

// ── 本地算法：调整计划 ─────────────────────────────────────────────────────────

function adjustPlanLocal(
  remainingSchedule: Array<{ date: string; question_ids: string[] }>,
  needReschedule: Array<{ question_id: string; reason: SelfRating; last_reviewed: string }>,
  _questions: Question[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const s of remainingSchedule) {
    result[s.date] = [...s.question_ids];
  }

  const sortedDates = Object.keys(result).sort();

  for (const item of needReschedule) {
    const delay = item.reason === "unknown" ? 1 : item.reason === "fuzzy" ? 3 : null;
    if (delay === null) continue; // mastered 不重排

    const [ry, rm, rd] = item.last_reviewed.slice(0, 10).split("-").map(Number);
    const targetDt = new Date(Date.UTC(ry, rm - 1, rd + delay));
    const targetDate = targetDt.toISOString().split("T")[0];

    // 找第一个 >= targetDate 且当天题数 < 8 的日期
    const insertDate =
      sortedDates.find((d) => d >= targetDate && (result[d]?.length ?? 0) < 8) ??
      sortedDates[sortedDates.length - 1];

    if (insertDate && !result[insertDate].includes(item.question_id)) {
      result[insertDate].push(item.question_id);
    }
  }

  return result;
}

// ── 公开 API ──────────────────────────────────────────────────────────────────

export async function adjustPlan(
  remainingSchedule: Array<{ date: string; question_ids: string[] }>,
  needReschedule: Array<{ question_id: string; reason: SelfRating; last_reviewed: string }>,
  questions: Question[]
): Promise<Record<string, string[]>> {
  if (!aiProvider()) return adjustPlanLocal(remainingSchedule, needReschedule, questions);

  const prompt = `你是一个自适应学习规划专家。根据复习情况动态调整后续计划。

当前剩余计划：
${JSON.stringify(remainingSchedule, null, 2)}

需要重新安排的题目：
${JSON.stringify(
  needReschedule.map((r) => ({
    ...r,
    title: questions.find((q) => q.id === r.question_id)?.title,
    difficulty: questions.find((q) => q.id === r.question_id)?.difficulty,
  })),
  null,
  2
)}

调整规则：
- 标记为 "unknown"（不会）的题目：在 1-2 天内重新插入
- 标记为 "fuzzy"（模糊）的题目：在 3-5 天内重新插入
- 插入时尽量不超过每天 8 题
- 保持其他题目顺序不变，可以向后顺延

返回调整后的完整剩余计划，格式同输入：JSON，key 为日期，value 为题目 id 数组。
只返回 JSON，不要任何解释。`;

  const text = await chatCompletion(prompt, { tier: "powerful", maxTokens: 4096 });
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI 未返回有效的调整 JSON");
  return JSON.parse(jsonMatch[0]);
}

export async function getAnswerHint(question: Question): Promise<string> {
  if (!aiProvider()) {
    if (question.answer_hint) return question.answer_hint;
    return "暂无参考答案，请配置 ANTHROPIC_API_KEY 或 DEEPSEEK_API_KEY 后使用 AI 生成，或手动添加。";
  }

  const categoryMap: Record<string, string> = {
    frontend: "前端开发",
    algorithm: "算法与数据结构",
    "system-design": "系统设计",
  };

  const prompt = `请为以下${categoryMap[question.category] ?? ""}面试题提供一份简洁的参考答案（约300-500字），覆盖核心考点即可，不要过度展开。

题目：${question.title}

${question.content ? `题目详情：${question.content}` : ""}

请直接给出参考答案，不需要重复题目。`;

  return chatCompletion(prompt, { tier: "fast", maxTokens: 2048 });
}
