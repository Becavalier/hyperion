import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  if (req.method === "GET") {
    const { category, difficulty, search, page, limit } = req.query;

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 20));
    const offset = (pageNum - 1) * limitNum;

    let where = "WHERE 1=1";
    const params: unknown[] = [];
    let idx = 1;

    if (category) {
      where += ` AND category = $${idx++}`;
      params.push(category);
    }
    if (difficulty) {
      where += ` AND difficulty = $${idx++}`;
      params.push(difficulty);
    }
    if (search) {
      where += ` AND (title ILIKE $${idx} OR content ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    const cols = `id, title, content, category, difficulty, tags, answer_hint, cluster_id, created_at,
                  proficiency, next_review_date::text AS next_review_date, last_reviewed_at`;
    const [dataResult, countResult] = await Promise.all([
      sql.query(
        `SELECT ${cols} FROM questions ${where} ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limitNum, offset]
      ),
      sql.query(`SELECT COUNT(*)::int AS total FROM questions ${where}`, params),
    ]);

    return res.json({
      questions: dataResult.rows,
      total: countResult.rows[0].total,
      page: pageNum,
      limit: limitNum,
    });
  }

  if (req.method === "POST") {
    const { title, content, category, difficulty, tags, answer_hint } = req.body;

    if (!title || !category || !difficulty) {
      return res.status(400).json({ error: "title, category, difficulty 为必填项" });
    }

    const result = await sql`
      INSERT INTO questions (title, content, category, difficulty, tags, answer_hint)
      VALUES (${title}, ${content ?? ""}, ${category}, ${difficulty}, ${tags ?? []}, ${answer_hint ?? null})
      RETURNING id, title, content, category, difficulty, tags, answer_hint, created_at,
                proficiency, next_review_date::text AS next_review_date, last_reviewed_at
    `;

    return res.status(201).json({ question: result.rows[0] });
  }

  res.status(405).json({ error: "Method not allowed" });
}
