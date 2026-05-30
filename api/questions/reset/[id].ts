import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../../_lib/db";
import { setCors, handleOptions } from "../../_lib/cors";
import { requireAuth } from "../../_lib/auth";

// POST /api/questions/reset/:id — wipe spaced-repetition state for one question.
// Sets proficiency = 0 and clears next_review_date + last_reviewed_at.
// Existing reviews and historical schedule rows are left intact.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query as { id: string };

  const result = await sql`
    UPDATE questions
    SET proficiency = 0, next_review_date = NULL, last_reviewed_at = NULL
    WHERE id = ${id}
    RETURNING id, title, proficiency, next_review_date::text AS next_review_date, last_reviewed_at
  `;
  if (!result.rows[0]) return res.status(404).json({ error: "Question not found" });
  return res.json({ question: result.rows[0] });
}
