import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  if (req.method === "GET") {
    const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
    const plan = planResult.rows[0] ?? null;

    const today = new Date().toISOString().split("T")[0];

    const [statsResult, queueResult] = await Promise.all([
      sql.query(
        `SELECT
          COUNT(*)::int                                                                    AS total,
          COUNT(*) FILTER (WHERE proficiency > 10)::int                                   AS graduated,
          COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10)::int              AS in_progress,
          COUNT(*) FILTER (WHERE proficiency = 0)::int                                    AS new_questions,
          COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                           AND next_review_date <= $1)::int                               AS due_today
        FROM questions`,
        [today]
      ),
      sql.query(
        `SELECT id, title, category, difficulty, proficiency,
                next_review_date::text AS next_review_date, last_reviewed_at
         FROM questions
         WHERE proficiency <= 10
         ORDER BY
           CASE WHEN next_review_date IS NULL THEN 1 ELSE 0 END ASC,
           next_review_date ASC,
           proficiency ASC
         LIMIT 200`,
        []
      ),
    ]);

    return res.json({
      plan,
      stats: statsResult.rows[0],
      queue: queueResult.rows,
    });
  }

  res.status(405).json({ error: "Method not allowed" });
}
