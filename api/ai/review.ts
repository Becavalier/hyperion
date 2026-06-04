import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { aiProvider, chatCompletion } from "../_lib/ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question_id, code } = req.body;
  if (!question_id) return res.status(400).json({ error: "question_id required" });

  const result = await sql`SELECT * FROM questions WHERE id = ${question_id}`;
  const question = result.rows[0];
  if (!question) return res.status(404).json({ error: "Question not found" });

  if (!aiProvider()) {
    return res.json({
      feedback: "No AI provider configured — set ANTHROPIC_API_KEY or DEEPSEEK_API_KEY.\nSwitch to Manual Review to compare with the reference answer.",
      verdict: null,
    });
  }

  // 业务侧的设置（语言 / 自定义 system prompt）通过 header 传过来（在 settings 面板里维护）
  const language = (req.headers["x-prep-language"] as string) || "zh";
  const customSystemPrompt = req.headers["x-prep-system-prompt"]
    ? decodeURIComponent(req.headers["x-prep-system-prompt"] as string)
    : "";
  const langInstruction = language === "en"
    ? "Respond in English."
    : language === "ja"
    ? "日本語で回答してください。"
    : language === "auto"
    ? "Detect the language of the question and respond in the same language."
    : "用中文回答。";

  const prompt = `You are a JavaScript / coding review assistant. Evaluate the user's submission **by overall correctness and direction**, not exact wording.

Question: ${question.title}
${question.content ? `\nDescription:\n${question.content}` : ""}

User's submission (this could be code, or analysis/explanation text for review-type tasks):
\`\`\`
${code?.trim() || "(empty — user submitted nothing)"}
\`\`\`

${question.answer_hint ? `Reference / hint:\n${question.answer_hint}` : ""}

${customSystemPrompt ? `Additional instructions: ${customSystemPrompt}\n` : ""}

${langInstruction}

Provide your review in this structure (use markdown):

### 🎯 Verdict reasoning
3-5 bullet points covering: correctness, key insights matched / missed, edge cases.
**Important: be lenient on phrasing / variable names / minor stylistic differences. Focus on whether the user grasped the core idea, not whether wording matches the reference.**

### ✅ What was good
What the user got right.

### ⚠️ What's missing or wrong
Specific gaps. If empty submission, say so.

### 💡 Recommended answer
Provide a clean, idiomatic recommended answer (code or analysis depending on task type). For code: full working snippet with brief comments. For review tasks: a structured bug list with fixes.

═══════════════════════════════════════════════════════════════
MANDATORY FINAL LINE — this rule is NOT optional:

The very last line of your response MUST be exactly one of:
  VERDICT: PASS
  VERDICT: PARTIAL
  VERDICT: FAIL

Selection rubric (lenient):
- PASS    — overall direction is correct, key points covered; minor wording / style / edge-case gaps are OK.
- PARTIAL — right general idea but missing important pieces or has real bugs.
- FAIL    — empty, fundamentally wrong, or misses the core concept.

Do not output the pipe \`|\`, do not list all three, do not add explanation after VERDICT. The line must stand alone.`;

  const raw = await chatCompletion(prompt, { tier: "fast", maxTokens: 2048 });

  // Pull verdict off the end and strip it from the feedback shown to the user
  const verdictMatch = raw.match(/VERDICT:\s*(PASS|PARTIAL|FAIL)/i);
  const verdictMap: Record<string, "mastered" | "fuzzy" | "unknown"> = {
    PASS: "mastered",
    PARTIAL: "fuzzy",
    FAIL: "unknown",
  };
  const verdict = verdictMatch ? verdictMap[verdictMatch[1].toUpperCase()] : null;
  const feedback = raw.replace(/\n*VERDICT:\s*(PASS|PARTIAL|FAIL).*$/i, "").trim();

  return res.json({ feedback, verdict });
}
