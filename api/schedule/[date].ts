import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { buildDaySchedule } from "../_lib/scheduling";
import { getActivePlan, getScheduleByDate, getQuestionsByIds, getReviewsByScheduleId } from "../_lib/repo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date } = req.query as { date: string };

  const plan = await getActivePlan();
  if (!plan) return res.json({ schedule: null, questions: [], reviews: [] });

  // POST = extend today's schedule with another batch (user finished and wants more)
  if (req.method === "POST") {
    const current = await getScheduleByDate(plan.id as string, date);
    if (!current) return res.status(404).json({ error: "No schedule for date" });

    const dailyCount: number = (plan.config as { daily_count?: number } | null)?.daily_count ?? 6;
    const existingIds: string[] = (current.question_ids as string[]) ?? [];
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
  let schedule = await getScheduleByDate(plan.id as string, date);

  // Lazily generate if missing
  if (!schedule) {
    const dailyCount: number = (plan.config as Record<string, number>)?.daily_count ?? 6;
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
    schedule = insertResult.rows[0] ?? await getScheduleByDate(plan.id as string, date);

    if (!schedule) return res.json({ schedule: null, questions: [], reviews: [] });
  }

  const [questions, reviews] = await Promise.all([
    getQuestionsByIds((schedule.question_ids as string[]) ?? []),
    getReviewsByScheduleId(schedule.id as string),
  ]);

  return res.json({ schedule, questions, reviews });
}
