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
  fuzzy: "PARTIAL",
  unknown: "FAIL",
};

export const ratingColor: Record<SelfRating, string> = {
  mastered: "border-[#00ff41] bg-[#011200]",
  fuzzy: "border-[#ffb300] bg-[#120d00]",
  unknown: "border-[#ff3358] bg-[#120004]",
};

export const difficultyColor: Record<Difficulty, string> = {
  easy: "text-[#00ff41] bg-[#011500]",
  medium: "text-[#ffb300] bg-[#150e00]",
  hard: "text-[#ff3358] bg-[#150004]",
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
