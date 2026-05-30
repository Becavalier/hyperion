import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { getAnswerHint } from "../_lib/ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question_id } = req.body;
  if (!question_id) return res.status(400).json({ error: "question_id 为必填项" });

  const result = await sql`SELECT * FROM questions WHERE id = ${question_id}`;
  const question = result.rows[0];
  if (!question) return res.status(404).json({ error: "题目不存在" });

  const answer = await getAnswerHint(question);

  // 如果题目本身没有 answer_hint，顺便缓存一下
  if (!question.answer_hint) {
    await sql`UPDATE questions SET answer_hint = ${answer} WHERE id = ${question_id}`;
  }

  return res.json({ answer });
}
