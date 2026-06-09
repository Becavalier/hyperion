import type { Question, DailySchedule, Review, StudyPlan, Stats, SelfRating, Category, Difficulty, PlanStats, QueueItem } from "@/types";
import { getToken, clearToken } from "./auth";
import { loadSettings } from "./settings";

const BASE = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const settings = loadSettings();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Prep-Language": settings.aiLanguage,
    ...(settings.systemPrompt ? { "X-Prep-System-Prompt": encodeURIComponent(settings.systemPrompt) } : {}),
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 401) {
    // Token expired or invalid — drop it and bounce to login.
    clearToken();
    window.location.reload();
    throw new Error("Session expired");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "请求失败");
  }
  return res.json();
}

// ---------- Questions ----------
export const getQuestions = (params?: {
  category?: Category;
  difficulty?: Difficulty;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams(
    Object.fromEntries(Object.entries(params ?? {}).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => [k, String(v)]))
  ).toString();
  return request<{ questions: Question[]; total: number; page: number; limit: number }>(
    `/questions${q ? `?${q}` : ""}`
  );
};

export type CreateQuestionInput = Pick<
  Question,
  "title" | "content" | "category" | "difficulty" | "tags" | "answer_hint"
>;

export const createQuestion = (data: CreateQuestionInput) =>
  request<{ question: Question }>("/questions", { method: "POST", body: JSON.stringify(data) });

export const updateQuestion = (id: string, data: Partial<Question>) =>
  request<{ question: Question }>(`/questions/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteQuestion = (id: string) =>
  request<void>(`/questions/${id}`, { method: "DELETE" });

export const resetQuestionProficiency = (id: string) =>
  request<{ question: Pick<Question, "id" | "title" | "proficiency" | "next_review_date" | "last_reviewed_at"> }>(
    `/questions/reset/${id}`,
    { method: "POST" }
  );

// ---------- Plan ----------
export const getPlan = () =>
  request<{ plan: StudyPlan | null; stats: PlanStats; queue: QueueItem[] }>("/plan");

export const generatePlan = (data: { start_date: string; daily_count?: number }) =>
  request<{ plan: StudyPlan }>("/plan/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ---------- Schedule ----------
export const getSchedule = (date: string) =>
  request<{ schedule: DailySchedule | null; questions: Question[]; reviews: Review[] }>(
    `/schedule/${date}`
  );

export const extendSchedule = (date: string) =>
  request<{ schedule: DailySchedule; added: number; exhausted: boolean }>(
    `/schedule/${date}`,
    { method: "POST" }
  );

export const reshuffleSchedule = (date: string) =>
  request<{ schedule: DailySchedule; questions: Question[]; reviews: Review[]; replaced: number; exhausted?: boolean }>(
    `/schedule/${date}?action=reshuffle`,
    { method: "POST" }
  );

// ---------- Review ----------
export const submitReview = (data: { schedule_id: string; question_id: string; self_rating: SelfRating; notes?: string }) =>
  request<{
    review: Review;
    day_completed: boolean;
    proficiency_before: number;
    proficiency_after: number;
    graduated: boolean;
  }>("/review", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetReview = (schedule_id: string, question_id: string) =>
  request<{ ok: boolean }>("/review", {
    method: "DELETE",
    body: JSON.stringify({ schedule_id, question_id }),
  });

// ---------- AI ----------
export const getAIAnswer = (question_id: string) =>
  request<{ answer: string }>("/ai?action=answer", { method: "POST", body: JSON.stringify({ question_id }) });

export const getAIReview = (question_id: string, code: string) =>
  request<{ feedback: string; verdict: SelfRating | null }>("/ai?action=review", { method: "POST", body: JSON.stringify({ question_id, code }) });

// ---------- English Bank ----------
export interface EnglishEntry { id: string; content: string; phonetic: string | null; notes: string | null; proficiency: number; created_at: string; updated_at: string; }
export const getEnglishEntries = (params?: { search?: string; page?: number; limit?: number }, signal?: AbortSignal) =>
  request<{ entries: EnglishEntry[]; total: number; avg_proficiency: number | null; page: number; limit: number }>(`/english?${new URLSearchParams(Object.entries(params ?? {}).filter(([,v]) => v != null).map(([k,v]) => [k, String(v)]))}`, { signal } as RequestInit);
export const createEnglishEntry = (body: { content: string; phonetic?: string; notes?: string }) =>
  request<{ entry: EnglishEntry }>("/english", { method: "POST", body: JSON.stringify(body) });
export const updateEnglishEntry = (id: string, body: { content?: string; phonetic?: string; notes?: string; proficiency?: number }) =>
  request<{ entry: EnglishEntry }>(`/english/${id}`, { method: "PATCH", body: JSON.stringify(body) });
export const deleteEnglishEntry = (id: string) =>
  request<void>(`/english/${id}`, { method: "DELETE" });
export interface TrainWord { id: string; content: string; phonetic: string | null; notes: string | null; proficiency: number; }
export const getTrainWords = () =>
  request<{ words: TrainWord[]; due_count: number }>("/english?mode=train");
export const submitTrainResults = (results: { id: string; known: boolean }[]) =>
  request<{ ok: boolean; updated: number }>("/english?mode=train", { method: "POST", body: JSON.stringify({ results }) });

// ---------- Stock ----------
export const getStockQuote = (symbol: string) =>
  request<{ symbol: string; price: number; change: number; changePercent: number; prevClose: number; lines: [number, number][] }>(`/stock?symbol=${encodeURIComponent(symbol)}`);

// ---------- Stats ----------
export const getStats = () =>
  request<{ plan: StudyPlan | null; stats: Stats | null }>("/stats");
