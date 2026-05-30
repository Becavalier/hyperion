-- 面试复习计划 - 数据库初始化脚本
-- 在 Vercel Postgres 控制台或连接后执行

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  content     TEXT        NOT NULL DEFAULT '',
  category    VARCHAR(20) NOT NULL CHECK (category IN ('frontend', 'algorithm', 'system-design')),
  difficulty  VARCHAR(10) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  tags        TEXT[]      NOT NULL DEFAULT '{}',
  answer_hint TEXT,
  cluster_id  UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_plans (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  start_date DATE        NOT NULL,
  end_date   DATE        NOT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  config     JSONB       NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_schedules (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id      UUID    NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  date         DATE    NOT NULL,
  question_ids UUID[]  NOT NULL DEFAULT '{}',
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (plan_id, date)
);

CREATE TABLE IF NOT EXISTS reviews (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID        NOT NULL REFERENCES daily_schedules(id) ON DELETE CASCADE,
  question_id UUID        NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  self_rating VARCHAR(10) NOT NULL CHECK (self_rating IN ('mastered', 'fuzzy', 'unknown')),
  notes       TEXT,
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (schedule_id, question_id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_questions_category    ON questions (category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty  ON questions (difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_cluster_id  ON questions (cluster_id) WHERE cluster_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_daily_schedules_date  ON daily_schedules (plan_id, date);
CREATE INDEX IF NOT EXISTS idx_reviews_schedule      ON reviews (schedule_id);
CREATE INDEX IF NOT EXISTS idx_reviews_question      ON reviews (question_id);
