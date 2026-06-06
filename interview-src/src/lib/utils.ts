import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category, Difficulty, SelfRating } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryLabel: Record<Category, string> = {
  frontend: "Frontend",
  algorithm: "Algorithm",
  "system-design": "Sys-Design",
  quiz: "Quiz",
};

export const difficultyLabel: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const ratingLabel: Record<SelfRating, string> = {
  mastered: "PASS",
  fuzzy: "NEEDS PRACTICE",
  unknown: "FAIL",
};

export const ratingColor: Record<SelfRating, string> = {
  mastered: "border-[var(--c-green)] bg-[var(--c-green-dim)]",
  fuzzy: "border-[var(--c-amber)] bg-[var(--c-amber-bg)]",
  unknown: "border-[var(--c-red)] bg-[var(--c-red-bg)]",
};

export const difficultyColor: Record<Difficulty, string> = {
  easy: "text-[var(--c-green)] bg-[var(--c-green-dim)]",
  medium: "text-[var(--c-amber)] bg-[var(--c-amber-bg)]",
  hard: "text-[var(--c-red)] bg-[var(--c-red-bg)]",
};

export function formatDate(date: string) {
  const d = new Date(date);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return `${days[d.getDay()]}  ${date.slice(0, 10)}`;
}

export function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
