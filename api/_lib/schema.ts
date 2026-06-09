import { pgTable, uuid, text, integer, date, timestamp, boolean } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  id:              uuid("id").primaryKey().defaultRandom(),
  title:           text("title").notNull(),
  content:         text("content"),
  category:        text("category").notNull(),
  difficulty:      text("difficulty").notNull(),
  clusterId:       uuid("cluster_id"),
  answerHint:      text("answer_hint"),
  proficiency:     integer("proficiency").notNull().default(0),
  nextReviewDate:  date("next_review_date"),
  lastReviewedAt:  timestamp("last_reviewed_at"),
  createdAt:       timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id:          uuid("id").primaryKey().defaultRandom(),
  scheduleId:  uuid("schedule_id"),
  questionId:  uuid("question_id"),
  selfRating:  text("self_rating"),
  notes:       text("notes"),
  reviewedAt:  timestamp("reviewed_at").defaultNow(),
});

export const dailySchedules = pgTable("daily_schedules", {
  id:          uuid("id").primaryKey().defaultRandom(),
  date:        date("date").notNull(),
  questionIds: uuid("question_ids").array(),
  completedAt: timestamp("completed_at"),
  createdAt:   timestamp("created_at").defaultNow(),
});

export const englishBank = pgTable("english_bank", {
  id:             uuid("id").primaryKey().defaultRandom(),
  content:        text("content").notNull(),
  phonetic:       text("phonetic"),
  notes:          text("notes"),
  proficiency:    integer("proficiency").notNull().default(0),
  nextReviewDate: date("next_review_date"),
  lastReviewedAt: timestamp("last_reviewed_at"),
  createdAt:      timestamp("created_at").defaultNow(),
  updatedAt:      timestamp("updated_at").defaultNow(),
});

export type Question    = typeof questions.$inferSelect;
export type EnglishWord = typeof englishBank.$inferSelect;
export type Review      = typeof reviews.$inferSelect;
export type Schedule    = typeof dailySchedules.$inferSelect;
