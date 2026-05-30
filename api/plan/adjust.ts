import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { adjustPlan } from "../_lib/ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // 获取当前激活计划
  const planResult = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
  const plan = planResult.rows[0];
  if (!plan) return res.status(404).json({ error: "没有激活中的计划" });

  const today = new Date().toISOString().split("T")[0];

  // 获取今天之后的所有未完成计划
  const schedulesResult = await sql`
    SELECT * FROM daily_schedules
    WHERE plan_id = ${plan.id} AND date > ${today} AND completed = false
    ORDER BY date ASC
  `;
  const remainingSchedule = schedulesResult.rows.map((s) => ({
    date: s.date,
    question_ids: s.question_ids,
  }));

  // 获取需要重新安排的题目（今天标记为 fuzzy 或 unknown）
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

  // 获取对应题目信息供 AI 参考
  const ids = needReschedule.map((r) => r.question_id);
  const questionsResult = await sql.query(
    `SELECT * FROM questions WHERE id = ANY($1::uuid[])`,
    [ids]
  );

  // 调用 AI 调整
  const adjusted = await adjustPlan(remainingSchedule, needReschedule, questionsResult.rows);

  // 更新数据库中的剩余计划
  for (const [date, questionIds] of Object.entries(adjusted)) {
    await sql`
      INSERT INTO daily_schedules (plan_id, date, question_ids)
      VALUES (${plan.id}, ${date}, ${questionIds as unknown as string})
      ON CONFLICT (plan_id, date) DO UPDATE SET question_ids = EXCLUDED.question_ids
    `;
  }

  return res.json({ adjusted: true, rescheduled_count: needReschedule.length });
}
