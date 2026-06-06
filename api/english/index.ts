import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { getDueEnglishWords, getNewEnglishWords, createEnglishWord } from "../_lib/repo";

const INTERVALS: Record<number, number> = {
  0: 1, 1: 2, 2: 4, 3: 7, 4: 14, 5: 21, 6: 30, 7: 30, 8: 30, 9: 30, 10: 30,
};
function nextReviewDate(proficiency: number, fromDate: string): string {
  const days = INTERVALS[Math.min(proficiency, 10)] ?? 30;
  const d = new Date(fromDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const today = new Date().toISOString().split("T")[0];

  // ── Train mode ────────────────────────────────────────────────────────────
  if (req.query.mode === "train") {
    if (req.method === "GET") {
      const [due, newWords] = await Promise.all([
        getDueEnglishWords(today, 20),
        getNewEnglishWords(10),
      ]);
      const fresh = newWords.filter((w) => !due.some((d) => d.id === w.id));
      const words = [...due, ...fresh].slice(0, 20);
      return res.json({ words, due_count: due.length });
    }

    if (req.method === "POST") {
      const { results } = req.body as { results: { id: string; known: boolean }[] };
      if (!Array.isArray(results) || results.length === 0)
        return res.status(400).json({ error: "results required" });

      const ids = results.map((r) => r.id);
      const existing = await sql.query(
        `SELECT id, proficiency FROM english_bank WHERE id = ANY($1::uuid[])`, [ids]
      );
      const profMap = new Map(existing.rows.map((r) => [r.id, r.proficiency]));

      const newProfs = results.map((r) => {
        const cur = profMap.get(r.id) ?? 0;
        return r.known ? Math.min(10, cur + 1) : cur;
      });
      const nextDates = results.map((_, i) => nextReviewDate(newProfs[i], today));

      await sql.query(
        `UPDATE english_bank AS e
         SET proficiency      = v.new_prof::int,
             next_review_date = v.next_date::date,
             last_reviewed_at = NOW()
         FROM (
           SELECT unnest($1::uuid[]) AS id,
                  unnest($2::int[])  AS new_prof,
                  unnest($3::text[]) AS next_date
         ) AS v
         WHERE e.id = v.id`,
        [ids, newProfs, nextDates]
      );
      return res.json({ ok: true, updated: results.length });
    }

    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Normal CRUD ───────────────────────────────────────────────────────────
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

    const [dataResult, countResult, avgResult] = await Promise.all([
      sql.query(
        `SELECT id, content, phonetic, notes, proficiency, created_at, updated_at
         FROM english_bank ${where}
         ORDER BY created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limitNum, offset]
      ),
      sql.query(`SELECT COUNT(*)::int AS total FROM english_bank ${where}`, params),
      sql.query(`SELECT ROUND(AVG(proficiency)::numeric, 1)::float AS avg_proficiency FROM english_bank ${where}`, params),
    ]);

    return res.json({
      entries: dataResult.rows,
      total: countResult.rows[0].total,
      avg_proficiency: avgResult.rows[0].avg_proficiency,
      page: pageNum,
      limit: limitNum,
    });
  }

  if (req.method === "POST") {
    const { content, phonetic, notes } = req.body;
    if (!content?.trim()) return res.status(400).json({ error: "content is required" });

    const entry = await createEnglishWord({
      content: content.trim(),
      phonetic: phonetic?.trim() || null,
      notes: notes?.trim() || null,
    });
    return res.status(201).json({ entry });
  }

  res.status(405).json({ error: "Method not allowed" });
}
