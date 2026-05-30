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

  const prompt = `You are a concise JavaScript code reviewer. Review this implementation.

Question: ${question.title}
${question.content ? `\nDescription: ${question.content}` : ""}

User's Code:
\`\`\`javascript
${code?.trim() || "(empty — user submitted without code)"}
\`\`\`

${question.answer_hint ? `Reference Answer:\n\`\`\`javascript\n${question.answer_hint}\n\`\`\`` : ""}

Give a concise review in 3-5 bullet points. Cover: correctness, edge cases handled or missed, and key differences from reference. Be direct. No intro/outro text.

═══════════════════════════════════════════════════════════════
MANDATORY FINAL LINE — this rule is NOT optional:

The very last line of your response MUST be exactly one of:
  VERDICT: PASS
  VERDICT: PARTIAL
  VERDICT: FAIL

Pick exactly ONE token (PASS, PARTIAL, or FAIL). Do not output the pipe \`|\`, do not list all three, do not add explanation after it, do not omit the line.

Selection rubric:
- PASS    — solution is correct and covers the key cases; minor stylistic gaps are OK.
- PARTIAL — right idea but has bugs, misses edge cases, or skips important sub-problems.
- FAIL    — empty, fundamentally wrong, or doesn't address the problem.

A response without the VERDICT line is INVALID. The line must stand alone on its own line.`;

  const raw = await chatCompletion(prompt, { tier: "fast", maxTokens: 1024 });

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
