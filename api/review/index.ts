import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { applyRating, getNextReviewDate } from "../_lib/scheduling";
import type { SelfRating } from "../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  if (req.method === "POST") {
    const { schedule_id, question_id, self_rating, notes } = req.body;

    if (!schedule_id || !question_id || !self_rating) {
      return res.status(400).json({ error: "schedule_id, question_id, self_rating 为必填项" });
    }

    const allowed = ["mastered", "fuzzy", "unknown"];
    if (!allowed.includes(self_rating)) {
      return res.status(400).json({ error: "self_rating 只能是 mastered/fuzzy/unknown" });
    }

    const result = await sql`
      INSERT INTO reviews (schedule_id, question_id, self_rating, notes)
      VALUES (${schedule_id}, ${question_id}, ${self_rating}, ${notes ?? null})
      ON CONFLICT (schedule_id, question_id)
      DO UPDATE SET self_rating = EXCLUDED.self_rating, notes = EXCLUDED.notes, reviewed_at = NOW()
      RETURNING *
    `;

    // Update question proficiency and next_review_date
    const qResult = await sql`SELECT proficiency FROM questions WHERE id = ${question_id}`;
    const currentProficiency: number = qResult.rows[0]?.proficiency ?? 0;
    const newProficiency = applyRating(currentProficiency, self_rating as SelfRating);
    const today = new Date().toISOString().split("T")[0];
    const nextDate = getNextReviewDate(newProficiency, today);

    if (nextDate !== null) {
      await sql`
        UPDATE questions
        SET proficiency = ${newProficiency}, next_review_date = ${nextDate}, last_reviewed_at = NOW()
        WHERE id = ${question_id}
      `;
    } else {
      // Graduated — clear next_review_date
      await sql`
        UPDATE questions
        SET proficiency = ${newProficiency}, next_review_date = NULL, last_reviewed_at = NOW()
        WHERE id = ${question_id}
      `;
    }

    // Mark day completed if all questions reviewed
    const scheduleResult = await sql`SELECT question_ids FROM daily_schedules WHERE id = ${schedule_id}`;
    const totalCount = scheduleResult.rows[0]?.question_ids?.length ?? 0;
    const reviewedResult = await sql`SELECT COUNT(*) as cnt FROM reviews WHERE schedule_id = ${schedule_id}`;
    const reviewedCount = parseInt(reviewedResult.rows[0]?.cnt ?? "0");

    if (reviewedCount >= totalCount) {
      await sql`UPDATE daily_schedules SET completed = true WHERE id = ${schedule_id}`;
    }

    return res.status(201).json({
      review: result.rows[0],
      day_completed: reviewedCount >= totalCount,
      proficiency_before: currentProficiency,
      proficiency_after: newProficiency,
      graduated: currentProficiency <= 10 && newProficiency > 10,
    });
  }

  if (req.method === "DELETE") {
    const { schedule_id, question_id } = req.body;

    if (!schedule_id || !question_id) {
      return res.status(400).json({ error: "schedule_id, question_id 为必填项" });
    }

    // Restore proficiency to 0 and clear next_review_date when resetting
    await sql`DELETE FROM reviews WHERE schedule_id = ${schedule_id} AND question_id = ${question_id}`;
    await sql`
      UPDATE questions SET proficiency = 0, next_review_date = NULL, last_reviewed_at = NULL
      WHERE id = ${question_id}
    `;
    await sql`UPDATE daily_schedules SET completed = false WHERE id = ${schedule_id}`;

    return res.json({ ok: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}
