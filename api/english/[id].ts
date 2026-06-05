import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: "id required" });

  if (req.method === "PATCH") {
    const { content, phonetic, notes } = req.body;
    if (content !== undefined && !content.trim()) {
      return res.status(400).json({ error: "content cannot be empty" });
    }

    const fields: string[] = [];
    const params: unknown[] = [];
    let idx = 1;

    if (content !== undefined) { fields.push(`content = $${idx++}`); params.push(content.trim()); }
    if (phonetic !== undefined) { fields.push(`phonetic = $${idx++}`); params.push(phonetic.trim() || null); }
    if (notes !== undefined)    { fields.push(`notes = $${idx++}`);    params.push(notes.trim() || null); }

    if (!fields.length) return res.status(400).json({ error: "nothing to update" });

    fields.push(`updated_at = NOW()`);
    params.push(id);

    const result = await sql.query(
      `UPDATE english_bank SET ${fields.join(", ")} WHERE id = $${idx}
       RETURNING id, content, phonetic, notes, created_at, updated_at`,
      params
    );
    if (!result.rows.length) return res.status(404).json({ error: "not found" });
    return res.json({ entry: result.rows[0] });
  }

  if (req.method === "DELETE") {
    await sql`DELETE FROM english_bank WHERE id = ${id}`;
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method not allowed" });
}
