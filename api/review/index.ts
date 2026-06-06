import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { applyRating, getNextReviewDate } from "../_lib/scheduling";
import type { SelfRating } from "../_lib/db";
import {
  upsertReview, findQuestionById, updateQuestionSRS, resetQuestionSRS,
  getReviewCountForSchedule, setScheduleCompleted, deleteReview,
} from "../_lib/repo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  if (req.method === "POST") {
    const { schedule_id, question_id, self_rating, notes } = req.body;

    if (!schedule_id || !question_id || !self_rating) {
      return res.status(400).json({ error: "schedule_id, question_id, self_rating 为必填项" });
    }
    if (!["mastered", "fuzzy", "unknown"].includes(self_rating)) {
      return res.status(400).json({ error: "self_rating 只能是 mastered/fuzzy/unknown" });
    }

    const review = await upsertReview(schedule_id, question_id, self_rating, notes ?? null);

    const question = await findQuestionById(question_id);
    const currentProficiency = question?.proficiency ?? 0;
    const newProficiency = applyRating(currentProficiency, self_rating as SelfRating);
    const today = new Date().toISOString().split("T")[0];
    const nextDate = getNextReviewDate(newProficiency, today);

    await updateQuestionSRS(question_id, newProficiency, nextDate);

    const scheduleResult = await sql`SELECT question_ids FROM daily_schedules WHERE id = ${schedule_id}`;
    const totalCount: number = scheduleResult.rows[0]?.question_ids?.length ?? 0;
    const reviewedCount = await getReviewCountForSchedule(schedule_id);

    if (reviewedCount >= totalCount) {
      await setScheduleCompleted(schedule_id, true);
    }

    return res.status(201).json({
      review,
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

    await deleteReview(schedule_id, question_id);
    await resetQuestionSRS(question_id);
    await setScheduleCompleted(schedule_id, false);

    return res.json({ ok: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}
