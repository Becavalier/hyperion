import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { findQuestionById, resetQuestionSRS } from "../_lib/repo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const { id, reset } = req.query as { id: string; reset?: string };

  // POST /api/questions/:id?reset=1 — wipe spaced-repetition state
  if (reset !== undefined || req.method === "POST") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const question = await resetQuestionSRS(id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    return res.json({ question });
  }

  if (req.method === "GET") {
    const question = await findQuestionById(id);
    if (!question) return res.status(404).json({ error: "题目不存在" });
    return res.json({ question });
  }

  if (req.method === "PUT") {
    const { title, content, category, difficulty, tags, answer_hint } = req.body;
    const result = await sql`
      UPDATE questions
      SET title       = COALESCE(${title}, title),
          content     = COALESCE(${content}, content),
          category    = COALESCE(${category}, category),
          difficulty  = COALESCE(${difficulty}, difficulty),
          tags        = COALESCE(${tags}, tags),
          answer_hint = COALESCE(${answer_hint}, answer_hint)
      WHERE id = ${id}
      RETURNING id, title, content, category, difficulty, tags, answer_hint, cluster_id, created_at,
                proficiency, next_review_date::text AS next_review_date, last_reviewed_at
    `;
    if (!result.rows[0]) return res.status(404).json({ error: "题目不存在" });
    return res.json({ question: result.rows[0] });
  }

  if (req.method === "DELETE") {
    await sql`DELETE FROM questions WHERE id = ${id}`;
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method not allowed" });
}
