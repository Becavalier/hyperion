import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { start_date, daily_count = 6 } = req.body;
  if (!start_date) return res.status(400).json({ error: "start_date 为必填项" });

  await sql`UPDATE study_plans SET status = 'paused' WHERE status = 'active'`;

  // Open-ended plan — end_date is far future since duration is dynamic
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
