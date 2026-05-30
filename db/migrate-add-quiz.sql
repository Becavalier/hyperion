ALTER TABLE questions
  DROP CONSTRAINT questions_category_check,
  ADD CONSTRAINT questions_category_check
    CHECK (category = ANY (ARRAY['frontend','algorithm','system-design','quiz']));
