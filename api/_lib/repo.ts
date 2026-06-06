import { sql as raw, eq, lte, gt, and, isNull, or, ilike, asc, desc } from "drizzle-orm";
import { db, sql } from "./db";
import { questions, englishBank, dailySchedules, reviews } from "./schema";

// ── Study Plans ───────────────────────────────────────────────────────────────

export async function getActivePlan() {
  const result = await sql`SELECT * FROM study_plans WHERE status = 'active' LIMIT 1`;
  return (result.rows[0] ?? null) as Record<string, unknown> | null;
}

// ── Questions ─────────────────────────────────────────────────────────────────

export async function getQuestionStats(today: string) {
  const result = await db.execute(raw`
    SELECT
      COUNT(*)::int                                                           AS total,
      COUNT(*) FILTER (WHERE proficiency > 10)::int                          AS graduated,
      COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10)::int     AS in_progress,
      COUNT(*) FILTER (WHERE proficiency = 0)::int                           AS new_questions,
      COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                        AND next_review_date <= ${today})::int               AS due_today,
      ROUND(AVG(proficiency) FILTER (WHERE proficiency > 0), 1)              AS avg_proficiency
    FROM questions
  `);
  return result.rows[0] as Record<string, number>;
}

export async function getCategoryBreakdown(today: string) {
  const result = await db.execute(raw`
    SELECT category,
           COUNT(*)::int                                             AS total,
           COUNT(*) FILTER (WHERE proficiency > 10)::int            AS graduated,
           COUNT(*) FILTER (WHERE proficiency > 0 AND proficiency <= 10
                             AND next_review_date <= ${today})::int  AS due_today,
           ROUND(AVG(proficiency) FILTER (WHERE proficiency > 0), 1) AS avg_proficiency
    FROM questions GROUP BY category ORDER BY total DESC
  `);
  return result.rows as Record<string, unknown>[];
}

export async function getProficiencyDistribution() {
  const result = await db.execute(raw`
    SELECT LEAST(proficiency, 11) AS level, COUNT(*)::int AS cnt
    FROM questions GROUP BY level ORDER BY level
  `);
  return result.rows as { level: number; cnt: number }[];
}

export async function listQuestions(opts: {
  search?: string;
  category?: string;
  dueOnly?: boolean;
  today: string;
  limit: number;
}) {
  const { search, category, dueOnly, today, limit } = opts;
  const conditions = [];

  if (search)   conditions.push(or(ilike(questions.title, `%${search}%`), ilike(questions.content!, `%${search}%`)));
  if (category) conditions.push(eq(questions.category, category));
  if (dueOnly)  conditions.push(and(gt(questions.proficiency, 0), lte(questions.proficiency, 10), lte(questions.nextReviewDate!, today)));

  return db.select({
    title:          questions.title,
    category:       questions.category,
    difficulty:     questions.difficulty,
    proficiency:    questions.proficiency,
    nextReviewDate: questions.nextReviewDate,
  })
    .from(questions)
    .where(conditions.length ? and(...(conditions as Parameters<typeof and>)) : undefined)
    .orderBy(raw`next_review_date ASC NULLS LAST`)
    .limit(limit);
}

// ── English Bank ──────────────────────────────────────────────────────────────

export async function getEnglishStats(today: string) {
  const result = await db.execute(raw`
    SELECT
      COUNT(*)::int                                                   AS total,
      COUNT(*) FILTER (WHERE proficiency = 0)::int                   AS new_words,
      COUNT(*) FILTER (WHERE proficiency = 10)::int                  AS mastered,
      COUNT(*) FILTER (WHERE next_review_date IS NOT NULL
                        AND next_review_date <= ${today})::int       AS due_today,
      ROUND(AVG(proficiency), 1)                                     AS avg_proficiency
    FROM english_bank
  `);
  return result.rows[0] as Record<string, unknown>;
}

export async function createQuestion(data: {
  title: string;
  content?: string;
  category: string;
  difficulty: string;
  tags?: string[];
  answer_hint?: string;
}) {
  const result = await sql`
    INSERT INTO questions (title, content, category, difficulty, tags, answer_hint)
    VALUES (${data.title}, ${data.content ?? ""}, ${data.category}, ${data.difficulty},
            ${(data.tags ?? []) as unknown as string}, ${data.answer_hint ?? null})
    RETURNING id, title, content, category, difficulty, tags, answer_hint, created_at,
              proficiency, next_review_date::text AS next_review_date
  `;
  return result.rows[0];
}

export async function findQuestionById(id: string) {
  const [row] = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
  return row ?? null;
}

export async function updateQuestionSRS(id: string, proficiency: number, nextReviewDate: string | null) {
  await db.update(questions)
    .set({ proficiency, nextReviewDate, lastReviewedAt: new Date() })
    .where(eq(questions.id, id));
}

export async function resetQuestionSRS(id: string) {
  const [row] = await db.update(questions)
    .set({ proficiency: 0, nextReviewDate: null, lastReviewedAt: null })
    .where(eq(questions.id, id))
    .returning();
  return row ?? null;
}

export async function updateQuestionAnswerHint(id: string, answerHint: string) {
  await db.update(questions).set({ answerHint }).where(eq(questions.id, id));
}

export async function updateQuestionFields(id: string, fields: {
  title?: string; content?: string; category?: string;
  difficulty?: string; answerHint?: string;
}) {
  const sets: Partial<typeof questions.$inferInsert> = {};
  if (fields.title       !== undefined) sets.title       = fields.title;
  if (fields.content     !== undefined) sets.content     = fields.content;
  if (fields.category    !== undefined) sets.category    = fields.category;
  if (fields.difficulty  !== undefined) sets.difficulty  = fields.difficulty;
  if (fields.answerHint  !== undefined) sets.answerHint  = fields.answerHint;
  if (!Object.keys(sets).length) return null;
  const [row] = await db.update(questions).set(sets).where(eq(questions.id, id)).returning();
  return row ?? null;
}

export async function updateEnglishWordFields(id: string, fields: {
  word?: string; phonetic?: string | null; meaning?: string | null;
}) {
  const sets: Partial<typeof englishBank.$inferInsert> = {};
  if (fields.word     !== undefined) sets.content  = fields.word;
  if (fields.phonetic !== undefined) sets.phonetic = fields.phonetic;
  if (fields.meaning  !== undefined) sets.notes    = fields.meaning;
  if (!Object.keys(sets).length) return null;
  const [row] = await db.update(englishBank).set(sets).where(eq(englishBank.id, id)).returning();
  return row ?? null;
}

export async function searchEnglishEntries(search: string, limit: number) {
  return db.select({
    id:       englishBank.id,
    word:     englishBank.content,
    phonetic: englishBank.phonetic,
    meaning:  englishBank.notes,
    proficiency: englishBank.proficiency,
  })
    .from(englishBank)
    .where(or(ilike(englishBank.content, `%${search}%`), ilike(englishBank.notes!, `%${search}%`)))
    .orderBy(asc(englishBank.proficiency))
    .limit(limit);
}

// ── English Bank ──────────────────────────────────────────────────────────────

export async function findEnglishWordById(id: string) {
  const [row] = await db.select().from(englishBank).where(eq(englishBank.id, id)).limit(1);
  return row ?? null;
}

export async function deleteEnglishWord(id: string) {
  await db.delete(englishBank).where(eq(englishBank.id, id));
}

export async function createEnglishWord(data: { content: string; phonetic?: string | null; notes?: string | null }) {
  const [row] = await db.insert(englishBank)
    .values({ content: data.content, phonetic: data.phonetic ?? null, notes: data.notes ?? null })
    .returning();
  return row;
}

export async function getDueEnglishWords(today: string, limit = 20) {
  return db.select()
    .from(englishBank)
    .where(and(gt(englishBank.proficiency, 0), lte(englishBank.nextReviewDate!, today)))
    .orderBy(asc(englishBank.nextReviewDate!), asc(englishBank.proficiency))
    .limit(limit);
}

export async function getNewEnglishWords(limit = 10) {
  return db.select()
    .from(englishBank)
    .where(or(eq(englishBank.proficiency, 0), isNull(englishBank.nextReviewDate)))
    .orderBy(asc(englishBank.createdAt!))
    .limit(limit);
}

export async function searchVocabulary(search: string, limit: number) {
  return db.select({
    content:        englishBank.content,
    phonetic:       englishBank.phonetic,
    notes:          englishBank.notes,
    proficiency:    englishBank.proficiency,
    nextReviewDate: englishBank.nextReviewDate,
  })
    .from(englishBank)
    .where(or(ilike(englishBank.content, `%${search}%`), ilike(englishBank.notes!, `%${search}%`)))
    .orderBy(asc(englishBank.proficiency))
    .limit(limit);
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export async function upsertReview(scheduleId: string, questionId: string, selfRating: string, notes: string | null) {
  const result = await sql`
    INSERT INTO reviews (schedule_id, question_id, self_rating, notes)
    VALUES (${scheduleId}, ${questionId}, ${selfRating}, ${notes ?? null})
    ON CONFLICT (schedule_id, question_id)
    DO UPDATE SET self_rating = EXCLUDED.self_rating, notes = EXCLUDED.notes, reviewed_at = NOW()
    RETURNING *
  `;
  return result.rows[0];
}

export async function getReviewCountForSchedule(scheduleId: string): Promise<number> {
  const result = await sql`SELECT COUNT(*)::int AS cnt FROM reviews WHERE schedule_id = ${scheduleId}`;
  return result.rows[0]?.cnt ?? 0;
}

export async function getReviewsByScheduleId(scheduleId: string) {
  return db.select().from(reviews).where(eq(reviews.scheduleId, scheduleId));
}

export async function deleteReview(scheduleId: string, questionId: string) {
  await db.delete(reviews)
    .where(and(eq(reviews.scheduleId, scheduleId), eq(reviews.questionId, questionId)));
}

// ── Daily Schedule ────────────────────────────────────────────────────────────

export async function getScheduleByDate(planId: string, date: string) {
  const result = await sql`
    SELECT * FROM daily_schedules WHERE plan_id = ${planId} AND date::text = ${date}
  `;
  return (result.rows[0] ?? null) as Record<string, unknown> | null;
}

export async function getQuestionsByIds(ids: string[]) {
  const result = await sql.query(
    `SELECT id, title, content, category, difficulty, tags, answer_hint, cluster_id, created_at,
            proficiency, next_review_date::text AS next_review_date, last_reviewed_at
     FROM questions WHERE id = ANY($1::uuid[]) ORDER BY array_position($1::uuid[], id)`,
    [ids]
  );
  return result.rows;
}

export async function setScheduleCompleted(id: string, completed: boolean) {
  await db.update(dailySchedules)
    .set({ completedAt: completed ? new Date() : null })
    .where(eq(dailySchedules.id, id));
}

export async function getTodaySchedule(today: string) {
  const result = await db.execute(raw`
    SELECT ds.id, ds.date, ds.completed_at,
           array_length(ds.question_ids, 1) AS total_questions,
           COUNT(r.id)::int                  AS reviewed
    FROM daily_schedules ds
    LEFT JOIN reviews r ON r.schedule_id = ds.id
    WHERE ds.date = ${today}
    GROUP BY ds.id
  `);
  return (result.rows[0] ?? null) as Record<string, unknown> | null;
}
