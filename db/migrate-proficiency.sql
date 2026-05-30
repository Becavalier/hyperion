-- Add spaced-repetition fields to questions
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS proficiency       INTEGER     NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS next_review_date  DATE,
  ADD COLUMN IF NOT EXISTS last_reviewed_at  TIMESTAMPTZ;
