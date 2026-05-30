// Hacker rank ladder — 5 tiers mapped to weighted-avg proficiency score (0–11).
// Visuals: each rank gets a qualitatively distinct glow (see index.css).

export type RankKey =
  | "script-kiddie"
  | "data-stalker"
  | "ghost-protocol"
  | "red-hat-vanguard"
  | "root-architect";

export interface Rank {
  key: RankKey;
  nameEn: string;
  nameCn: string;
  min: number;
  max: number;
  color: string;
  glowClass: string;
  tagline: string;
}

export const RANKS: Rank[] = [
  {
    key: "script-kiddie",
    nameEn: "SCRIPT_KIDDIE",
    nameCn: "脚本小子",
    min: 0,
    max: 2.5,
    color: "#4d7a4d",
    glowClass: "glow-kiddie",
    tagline: "// running other people's exploits",
  },
  {
    key: "data-stalker",
    nameEn: "DATA_STALKER",
    nameCn: "数据潜行者",
    min: 2.5,
    max: 5,
    color: "#00ff41",
    glowClass: "glow-stalker",
    tagline: "// pattern recognition online",
  },
  {
    key: "ghost-protocol",
    nameEn: "GHOST_PROTOCOL",
    nameCn: "幽灵协议",
    min: 5,
    max: 7.5,
    color: "#c8d3d8",
    glowClass: "glow-ghost",
    tagline: "// moving through the matrix",
  },
  {
    key: "red-hat-vanguard",
    nameEn: "RED_HAT_VANGUARD",
    nameCn: "红帽教官",
    min: 7.5,
    max: 9.5,
    color: "#ff3358",
    glowClass: "glow-redhat",
    tagline: "// offensive ops · zero-day class",
  },
  {
    key: "root-architect",
    nameEn: "ROOT_ARCHITECT",
    nameCn: "根源权限者",
    min: 9.5,
    max: 11.0001, // include 11
    color: "#b94dff",
    glowClass: "glow-root",
    tagline: "// kernel privileges acquired",
  },
];

export function rankFor(score: number): { rank: Rank; index: number } {
  const s = Math.max(0, Math.min(11, score));
  const idx = RANKS.findIndex((r) => s >= r.min && s < r.max);
  const i = idx === -1 ? RANKS.length - 1 : idx;
  return { rank: RANKS[i], index: i };
}

export function progressToNext(score: number): {
  current: Rank;
  next: Rank | null;
  pct: number;
} {
  const { rank, index } = rankFor(score);
  const next = index < RANKS.length - 1 ? RANKS[index + 1] : null;
  const span = rank.max - rank.min;
  const raw = (score - rank.min) / span;
  const pct = Math.max(0, Math.min(1, raw));
  return { current: rank, next, pct };
}
