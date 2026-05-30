import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { buildDaySchedule } from "../_lib/scheduling";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
  const plan = planResult.rows[0] ?? null;

  const today = new Date().toISOString().split("T")[0];

  const [questionStats, profDist, catBreakdown, todayScheduleResult] = await Promise.all([
    // Global question-level stats
    // hacker_score: difficulty-weighted average proficiency, clamped to graduated cap.
    //   weight: easy=1, medium=2, hard=3 — harder mastery counts more.
    //   range: 0 (untouched bank) → 11 (everything graduated).
    sql.query(
      `SELECT
        COUNT(*)::int                                                               AS total,
        COUNT(*) FILTER (WHERE proficiency > 10)::int                              AS graduated,
        COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10)::int         AS in_progress,
        COUNT(*) FILTER (WHERE proficiency = 0)::int                               AS new_questions,
        COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                         AND next_review_date <= $1)::int                          AS due_today,
        ROUND(AVG(proficiency) FILTER (WHERE proficiency > 0), 1)                  AS avg_proficiency,
        ROUND(
          COALESCE(
            SUM(LEAST(proficiency, 11) *
                CASE difficulty WHEN 'easy' THEN 1 WHEN 'medium' THEN 2 WHEN 'hard' THEN 3 ELSE 1 END)::numeric /
            NULLIF(SUM(
                CASE difficulty WHEN 'easy' THEN 1 WHEN 'medium' THEN 2 WHEN 'hard' THEN 3 ELSE 1 END
            ), 0),
            0
          ),
          2
        )                                                                          AS hacker_score
       FROM questions`,
      [today]
    ),

    // Proficiency distribution (bucket 11 = all graduated)
    sql`
      SELECT LEAST(proficiency, 11) AS level, COUNT(*)::int AS cnt
      FROM questions
      GROUP BY level
      ORDER BY level
    `,

    // Per-category summary
    sql.query(
      `SELECT
        category,
        COUNT(*)::int                                                              AS total,
        COUNT(*) FILTER (WHERE proficiency > 10)::int                             AS graduated,
        COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                         AND next_review_date <= $1)::int                         AS due_today,
        ROUND(AVG(proficiency) FILTER (WHERE proficiency > 0), 1)                 AS avg_proficiency
       FROM questions
       GROUP BY category`,
      [today]
    ),

    // Today's existing schedule (if plan exists)
    plan
      ? sql.query(
          `SELECT ds.id, ds.completed, array_length(ds.question_ids, 1) AS total_q
           FROM daily_schedules ds
           WHERE ds.plan_id = $1 AND ds.date::text = $2
           LIMIT 1`,
          [plan.id, today]
        )
      : Promise.resolve({ rows: [] }),
  ]);

  // Lazily generate today's schedule if it doesn't exist yet
  let todaySchedule = todayScheduleResult.rows[0];
  if (!todaySchedule && plan) {
    const dailyCount: number = plan.config?.daily_count ?? 6;
    const questionIds = await buildDaySchedule(today, dailyCount);
    if (questionIds.length > 0) {
      const inserted = await sql`
        INSERT INTO daily_schedules (plan_id, date, question_ids)
        VALUES (${plan.id}, ${today}, ${questionIds})
        ON CONFLICT (plan_id, date) DO NOTHING
        RETURNING id, completed, array_length(question_ids, 1) AS total_q
      `;
      todaySchedule = inserted.rows[0];
      if (!todaySchedule) {
        const retry = await sql.query(
          `SELECT id, completed, array_length(question_ids, 1) AS total_q
           FROM daily_schedules WHERE plan_id = $1 AND date::text = $2`,
          [plan.id, today]
        );
        todaySchedule = retry.rows[0];
      }
    }
  }

  // Count today's reviewed questions
  let todayDone = 0;
  let todayTotal = 0;
  let todayCompleted = false;
  if (todaySchedule) {
    todayTotal = todaySchedule.total_q ?? 0;
    todayCompleted = todaySchedule.completed ?? false;
    const reviewCount = await sql`SELECT COUNT(*)::int AS cnt FROM reviews WHERE schedule_id = ${todaySchedule.id}`;
    todayDone = reviewCount.rows[0]?.cnt ?? 0;
  }

  return res.json({
    plan,
    stats: {
      ...questionStats.rows[0],
      proficiency_dist: profDist.rows,
      category_breakdown: catBreakdown.rows,
      today_total: todayTotal,
      today_done: todayDone,
      today_completed: todayCompleted,
    },
  });
}
