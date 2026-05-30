export type Category = "frontend" | "algorithm" | "system-design" | "quiz";
export type Difficulty = "easy" | "medium" | "hard";
export type SelfRating = "mastered" | "fuzzy" | "unknown";
export type PlanStatus = "active" | "paused" | "completed";

export interface Question {
  id: string;
  title: string;
  content: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  answer_hint: string | null;
  cluster_id: string | null;
  created_at: string;
  proficiency: number;
  next_review_date: string | null;
  last_reviewed_at: string | null;
}

export interface PlanStats {
  total: number;
  graduated: number;
  in_progress: number;
  new_questions: number;
  due_today: number;
}

export interface QueueItem {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  proficiency: number;
  next_review_date: string | null;
  last_reviewed_at: string | null;
}

export interface StudyPlan {
  id: string;
  start_date: string;
  end_date: string;
  status: PlanStatus;
  config: {
    daily_count: number;
    category_weights: Record<Category, number>;
  };
  created_at: string;
}

export interface DailySchedule {
  id: string;
  plan_id: string;
  date: string;
  question_ids: string[];
  completed: boolean;
  mastered_count?: number;
  fuzzy_count?: number;
  unknown_count?: number;
  total_count?: number;
}

export interface Review {
  id: string;
  schedule_id: string;
  question_id: string;
  self_rating: SelfRating;
  notes: string | null;
  reviewed_at: string;
}

export interface Stats {
  total: number;
  graduated: number;
  in_progress: number;
  new_questions: number;
  due_today: number;
  avg_proficiency: number | null;
  hacker_score: number;
  today_total: number;
  today_done: number;
  today_completed: boolean;
  proficiency_dist: Array<{ level: number; cnt: number }>;
  category_breakdown: Array<{
    category: Category;
    total: number;
    graduated: number;
    due_today: number;
    avg_proficiency: number | null;
  }>;
}
