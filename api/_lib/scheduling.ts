import { sql } from "./db";
import type { SelfRating } from "./db";

// Days to wait before rescheduling, indexed by proficiency level.
// proficiency 0 = new/unmastered; interval used only when setting next_review_date after a review.
const INTERVALS: Record<number, number> = {
  0: 1,
  1: 2,
  2: 4,
  3: 7,
  4: 14,
  5: 21,
  6: 30,
  7: 30,
  8: 30,
  9: 30,
  10: 30,
};

export function applyRating(current: number, rating: SelfRating): number {
  if (rating === "mastered") return current + 1;
  if (rating === "fuzzy") return current;
  return Math.max(0, current - 1);
}

export function getNextReviewDate(proficiency: number, fromDate: string): string | null {
  if (proficiency > 10) return null; // graduated — no longer scheduled
  const days = INTERVALS[proficiency] ?? 180;
  const d = new Date(fromDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/**
 * Selects question IDs for a given date using the review-first 50/50 algorithm.
 *
 * Slot-based: each "slot" is either a standalone question or an entire cluster.
 * Clusters always appear together (or not at all). Graduated members (proficiency > 10)
 * are excluded when a cluster is expanded.
 *
 * Rule (given daily_count N, half = floor(N/2)):
 *   - both due and new slots available → min(due, half) due + fill rest with new
 *   - only one side available          → up to N slots from that side
 *   - neither                          → [] (empty day)
 *
 * A slot is "due" if it has any reviewable member whose next_review_date <= date.
 * A slot is "new" if ALL its non-graduated members have proficiency = 0.
 * Cluster slot expansion picks all cluster members with proficiency <= 10.
 *
 * `excludeIds`: if any id of a cluster is in excludeIds, the entire cluster is skipped.
 */
type SlotKind = "due" | "new";
type Slot = {
  kind: SlotKind;
  // For ranking inside `due`/`new`:
  rank: number; // due: min(proficiency) of due members; new: created_at sort key
  // Expansion target — the ids we'll write to daily_schedules.question_ids
  expandIds: string[];
};

function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export async function buildDaySchedule(
  date: string,
  dailyCount: number,
  excludeIds: string[] = [],
  random = false,
): Promise<string[]> {
  const half = Math.floor(dailyCount / 2);

  // Pull all non-graduated questions with the fields we need to bucket into slots.
  const all = await sql.query(
    `SELECT id, cluster_id, proficiency, next_review_date::text AS next_review_date, created_at
     FROM questions
     WHERE proficiency <= 10
     ORDER BY created_at ASC`,
    []
  );

  type Row = {
    id: string;
    cluster_id: string | null;
    proficiency: number;
    next_review_date: string | null;
    created_at: string;
  };
  const rows: Row[] = all.rows as Row[];

  const excluded = new Set(excludeIds);

  // Group: standalones first, then by cluster_id
  const standalone: Row[] = [];
  const clusters = new Map<string, Row[]>();
  for (const r of rows) {
    if (r.cluster_id) {
      const arr = clusters.get(r.cluster_id) ?? [];
      arr.push(r);
      clusters.set(r.cluster_id, arr);
    } else {
      standalone.push(r);
    }
  }

  const dueSlots: Slot[] = [];
  const newSlots: Slot[] = [];

  // Standalone slots
  for (const r of standalone) {
    if (excluded.has(r.id)) continue;
    const isDue = r.proficiency > 0 && r.next_review_date !== null && r.next_review_date <= date;
    const isNew = r.proficiency === 0;
    if (isDue) {
      dueSlots.push({ kind: "due", rank: r.proficiency, expandIds: [r.id] });
    } else if (isNew) {
      newSlots.push({ kind: "new", rank: Date.parse(r.created_at), expandIds: [r.id] });
    }
  }

  // Cluster slots — group members, skip if any member is excluded
  for (const [, members] of clusters) {
    if (members.some((m) => excluded.has(m.id))) continue;

    const reviewable = members.filter((m) => m.proficiency <= 10); // drop graduated
    if (reviewable.length === 0) continue;

    const ids = reviewable.map((m) => m.id);
    const anyDue = reviewable.some(
      (m) => m.proficiency > 0 && m.next_review_date !== null && m.next_review_date <= date
    );
    const allNew = reviewable.every((m) => m.proficiency === 0);

    if (anyDue) {
      const minProf = Math.min(...reviewable.filter((m) => m.proficiency > 0).map((m) => m.proficiency));
      dueSlots.push({ kind: "due", rank: isFinite(minProf) ? minProf : 0, expandIds: ids });
    } else if (allNew) {
      const earliest = Math.min(...reviewable.map((m) => Date.parse(m.created_at)));
      newSlots.push({ kind: "new", rank: earliest, expandIds: ids });
    }
    // else: cluster is in-progress but nothing due today → skip
  }

  if (random) {
    shuffle(dueSlots);
    shuffle(newSlots);
  } else {
    dueSlots.sort((a, b) => a.rank - b.rank);
    newSlots.sort((a, b) => a.rank - b.rank);
  }

  if (dueSlots.length === 0 && newSlots.length === 0) return [];

  // Pick slots: 50/50 split
  let picked: Slot[];
  if (dueSlots.length > 0 && newSlots.length > 0) {
    const duePick = dueSlots.slice(0, half);
    const newPick = newSlots.slice(0, dailyCount - duePick.length);
    picked = [...duePick, ...newPick];
  } else if (dueSlots.length > 0) {
    picked = dueSlots.slice(0, dailyCount);
  } else {
    picked = newSlots.slice(0, dailyCount);
  }

  // Expand to flat id list
  return picked.flatMap((s) => s.expandIds);
}
