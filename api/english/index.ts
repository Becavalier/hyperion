import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  if (req.method === "GET") {
    const { search, page, limit } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 40));
    const offset = (pageNum - 1) * limitNum;

    let where = "WHERE 1=1";
    const params: unknown[] = [];
    let idx = 1;

    if (search) {
      where += ` AND (content ILIKE $${idx} OR phonetic ILIKE $${idx} OR notes ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    const [dataResult, countResult] = await Promise.all([
      sql.query(
        `SELECT id, content, phonetic, notes, created_at, updated_at
         FROM english_bank ${where}
         ORDER BY created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limitNum, offset]
      ),
      sql.query(`SELECT COUNT(*)::int AS total FROM english_bank ${where}`, params),
    ]);

    return res.json({
      entries: dataResult.rows,
      total: countResult.rows[0].total,
      page: pageNum,
      limit: limitNum,
    });
  }

  if (req.method === "POST") {
    const { content, phonetic, notes } = req.body;
    if (!content?.trim()) return res.status(400).json({ error: "content is required" });

    const result = await sql`
      INSERT INTO english_bank (content, phonetic, notes)
      VALUES (${content.trim()}, ${phonetic?.trim() || null}, ${notes?.trim() || null})
      RETURNING id, content, phonetic, notes, created_at, updated_at
    `;
    return res.status(201).json({ entry: result.rows[0] });
  }

  res.status(405).json({ error: "Method not allowed" });
}
