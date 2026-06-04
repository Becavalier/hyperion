import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { adjustPlan } from "../_lib/ai";
import type { Question } from "../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const url = (req.url ?? "").replace(/\?.*$/, "").replace(/\/$/, "");
  const sub = url.split("/api/plan")[1] ?? "";  // "", "/generate", "/adjust"

  // ── GET /api/plan ─────────────────────────────────────────────────────────
  if (sub === "" && req.method === "GET") {
    const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
    const plan = planResult.rows[0] ?? null;
    const today = new Date().toISOString().split("T")[0];

    const [statsResult, queueResult] = await Promise.all([
      sql`SELECT
            COUNT(*)::int                                                               AS total,
            COUNT(*) FILTER (WHERE proficiency > 10)::int                              AS graduated,
            COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10)::int         AS in_progress,
            COUNT(*) FILTER (WHERE proficiency = 0)::int                               AS new_questions,
            COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                             AND next_review_date <= ${today})::int                    AS due_today
          FROM questions`,
      sql`SELECT id, title, category, difficulty, proficiency,
                 next_review_date::text AS next_review_date, last_reviewed_at
          FROM questions
          WHERE proficiency <= 10
          ORDER BY
            CASE WHEN next_review_date IS NULL THEN 1 ELSE 0 END ASC,
            next_review_date ASC,
            proficiency ASC
          LIMIT 200`,
    ]);

    return res.json({ plan, stats: statsResult.rows[0], queue: queueResult.rows });
  }

  // ── POST /api/plan/generate ────────────────────────────────────────────────
  if (sub === "/generate" && req.method === "POST") {
    const { start_date, daily_count = 6 } = req.body;
    if (!start_date) return res.status(400).json({ error: "start_date 为必填项" });

    await sql`UPDATE study_plans SET status = 'paused' WHERE status = 'active'`;

    const planResult = await sql`
      INSERT INTO study_plans (start_date, end_date, status, config)
      VALUES (
        ${start_date},
        '9999-12-31',
        'active',
        ${JSON.stringify({ daily_count, category_weights: { frontend: 1, algorithm: 1, "system-design": 1 } })}
      )
      RETURNING *
    `;

    return res.status(201).json({ plan: planResult.rows[0] });
  }

  // ── POST /api/plan/adjust ──────────────────────────────────────────────────
  if (sub === "/adjust" && req.method === "POST") {
    const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
    const plan = planResult.rows[0];
    if (!plan) return res.status(404).json({ error: "没有激活中的计划" });

    const today = new Date().toISOString().split("T")[0];

    const schedulesResult = await sql`
      SELECT * FROM daily_schedules
      WHERE plan_id = ${plan.id} AND date > ${today} AND completed = false
      ORDER BY date ASC
    `;
    const remainingSchedule = schedulesResult.rows.map((s) => ({
      date: s.date,
      question_ids: s.question_ids,
    }));

    const todayScheduleResult = await sql`
      SELECT id FROM daily_schedules WHERE plan_id = ${plan.id} AND date = ${today}
    `;
    const todayScheduleId = todayScheduleResult.rows[0]?.id;
    if (!todayScheduleId) return res.status(404).json({ error: "今天没有复习记录" });

    const reviewsResult = await sql`
      SELECT question_id, self_rating, reviewed_at FROM reviews
      WHERE schedule_id = ${todayScheduleId} AND self_rating IN ('fuzzy', 'unknown')
    `;
    const needReschedule = reviewsResult.rows.map((r) => ({
      question_id: r.question_id,
      reason: r.self_rating,
      last_reviewed: r.reviewed_at,
    }));

    if (needReschedule.length === 0) {
      return res.json({ message: "今天全部掌握，无需调整", adjusted: false });
    }

    const ids = needReschedule.map((r) => r.question_id);
    const questionsResult = await sql`SELECT * FROM questions WHERE id = ANY(${ids})`;

    const adjusted = await adjustPlan(remainingSchedule, needReschedule, questionsResult.rows as Question[]);

    for (const [date, questionIds] of Object.entries(adjusted)) {
      await sql`
        INSERT INTO daily_schedules (plan_id, date, question_ids)
        VALUES (${plan.id}, ${date}, ${questionIds as unknown as string})
        ON CONFLICT (plan_id, date) DO UPDATE SET question_ids = EXCLUDED.question_ids
      `;
    }

    return res.json({ adjusted: true, rescheduled_count: needReschedule.length });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
