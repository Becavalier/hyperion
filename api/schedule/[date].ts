import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { buildDaySchedule } from "../_lib/scheduling";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date } = req.query as { date: string };

  const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
  const plan = planResult.rows[0];
  if (!plan) return res.json({ schedule: null, questions: [], reviews: [] });

  // POST = extend today's schedule with another batch (user finished and wants more)
  if (req.method === "POST") {
    const existing = await sql`
      SELECT * FROM daily_schedules WHERE plan_id = ${plan.id} AND date::text = ${date}
    `;
    const current = existing.rows[0];
    if (!current) return res.status(404).json({ error: "No schedule for date" });

    const dailyCount: number = plan.config?.daily_count ?? 6;
    const existingIds: string[] = current.question_ids ?? [];
    const newIds = await buildDaySchedule(date, dailyCount, existingIds);

    if (newIds.length === 0) {
      return res.json({ schedule: current, added: 0, exhausted: true });
    }

    const merged = [...existingIds, ...newIds];
    const updated = await sql`
      UPDATE daily_schedules
      SET question_ids = ${merged as unknown as string}, completed = false
      WHERE id = ${current.id}
      RETURNING *
    `;
    return res.json({ schedule: updated.rows[0], added: newIds.length, exhausted: false });
  }

  // Try existing schedule first
  let scheduleResult = await sql`
    SELECT * FROM daily_schedules WHERE plan_id = ${plan.id} AND date::text = ${date}
  `;
  let schedule = scheduleResult.rows[0];

  // Lazily generate if missing
  if (!schedule) {
    const dailyCount: number = plan.config?.daily_count ?? 6;
    const questionIds = await buildDaySchedule(date, dailyCount);

    if (questionIds.length === 0) {
      return res.json({ schedule: null, questions: [], reviews: [] });
    }

    const insertResult = await sql`
      INSERT INTO daily_schedules (plan_id, date, question_ids)
      VALUES (${plan.id}, ${date}, ${questionIds as unknown as string})
      ON CONFLICT (plan_id, date) DO NOTHING
      RETURNING *
    `;
    schedule = insertResult.rows[0];

    // Handle concurrent generation race
    if (!schedule) {
      scheduleResult = await sql`
        SELECT * FROM daily_schedules WHERE plan_id = ${plan.id} AND date::text = ${date}
      `;
      schedule = scheduleResult.rows[0];
    }

    if (!schedule) return res.json({ schedule: null, questions: [], reviews: [] });
  }

  const [questionsResult, reviewsResult] = await Promise.all([
    sql.query(
      `SELECT id, title, content, category, difficulty, tags, answer_hint, cluster_id, created_at,
              proficiency, next_review_date::text AS next_review_date, last_reviewed_at
       FROM questions WHERE id = ANY($1::uuid[]) ORDER BY array_position($1::uuid[], id)`,
      [schedule.question_ids]
    ),
    sql`SELECT * FROM reviews WHERE schedule_id = ${schedule.id}`,
  ]);

  return res.json({
    schedule,
    questions: questionsResult.rows,
    reviews: reviewsResult.rows,
  });
}
