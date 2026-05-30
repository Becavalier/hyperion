-- Cluster support: a group of questions that always appears together in a daily.
-- cluster_id NULL = standalone question (default for all existing rows).
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS cluster_id UUID;

CREATE INDEX IF NOT EXISTS idx_questions_cluster_id
  ON questions (cluster_id) WHERE cluster_id IS NOT NULL;
