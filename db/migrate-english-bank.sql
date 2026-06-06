CREATE TABLE IF NOT EXISTS english_bank (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  content     TEXT        NOT NULL,
  phonetic    TEXT,
  notes       TEXT,
  proficiency INTEGER     NOT NULL DEFAULT 0 CHECK (proficiency BETWEEN 0 AND 10),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- run once on existing tables:
ALTER TABLE english_bank ADD COLUMN IF NOT EXISTS proficiency INTEGER NOT NULL DEFAULT 0 CHECK (proficiency BETWEEN 0 AND 10);
ALTER TABLE english_bank ADD COLUMN IF NOT EXISTS next_review_date DATE;
ALTER TABLE english_bank ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_english_bank_created ON english_bank (created_at DESC);
