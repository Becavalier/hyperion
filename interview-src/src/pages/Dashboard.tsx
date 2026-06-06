import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, CheckCircle2, TrendingUp, Zap, Languages } from "lucide-react";
import { getStats, getEnglishEntries } from "@/lib/api";
import { cn, todayStr, categoryLabel } from "@/lib/utils";
import type { Stats, StudyPlan } from "@/types";
import { HackerRank } from "@/components/HackerRank";

// ── Proficiency histogram ─────────────────────────────────────────────────────

function ProficiencyHistogram({ dist }: { dist: Stats["proficiency_dist"] }) {
  const map: Record<number, number> = {};
  for (const { level, cnt } of dist) map[level] = cnt;
  const max = Math.max(...Object.values(map), 1);

  const buckets = [
    { level: 0,  label: "LV 0",  note: "new",       color: "#2a402a" },
    { level: 1,  label: "LV 1",  note: "1d",        color: "#3d6b3d" },
    { level: 2,  label: "LV 2",  note: "3d",        color: "#4d7a4d" },
    { level: 3,  label: "LV 3",  note: "7d",        color: "#5c8a5c" },
    { level: 4,  label: "LV 4",  note: "14d",       color: "#6fa06f" },
    { level: 5,  label: "LV 5",  note: "21d",       color: "#8ab58a" },
    { level: 6,  label: "LV 6",  note: "30d",       color: "#a3c9a3" },
    { level: 7,  label: "LV 7",  note: "45d",       color: "#b8d9b8" },
    { level: 8,  label: "LV 8",  note: "60d",       color: "#c8e4c8" },
    { level: 9,  label: "LV 9",  note: "90d",       color: "#d8efd8" },
    { level: 10, label: "LV 10", note: "180d",      color: "#e8f8e8" },
    { level: 11, label: "★",     note: "graduated", color: "#00ff41" },
  ];

  return (
    <div className="space-y-1.5">
      {buckets.map(({ level, label, note, color }) => {
        const cnt = map[level] ?? 0;
        const pct = (cnt / max) * 100;
        return (
          <div key={level} className="flex items-center gap-2 text-xs">
            <span className="w-10 text-right tabular-nums shrink-0" style={{ color: cnt > 0 ? color : "#1e321e" }}>
              {label}
            </span>
            <div className="flex-1 h-4 bg-[#080c08] border border-[#1e321e] overflow-hidden">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: color,
                  boxShadow: cnt > 0 && level >= 10 ? `0 0 6px ${color}` : "none",
                  opacity: cnt > 0 ? 1 : 0,
                }}
              />
            </div>
            <span className="w-5 tabular-nums text-right shrink-0" style={{ color: cnt > 0 ? color : "#1e321e" }}>
              {cnt > 0 ? cnt : ""}
            </span>
            <span className="w-16 text-[#1e321e] shrink-0">{note}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [englishTotal, setEnglishTotal] = useState<number | null>(null);
  const [englishAvg, setEnglishAvg] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getStats(),
      getEnglishEntries({ limit: 1 }),
    ]).then(([statsRes, engRes]) => {
      if (statsRes.status === "fulfilled") {
        setPlan(statsRes.value.plan);
        setStats(statsRes.value.stats);
      }
      if (engRes.status === "fulfilled") {
        setEnglishTotal(engRes.value.total);
        setEnglishAvg(engRes.value.avg_proficiency ?? null);
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-[#4d7a4d] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  if (!plan) {
    return (
      <div className="py-20 space-y-5 text-center">
        <p className="text-[#2a402a] text-xs tracking-widest">// NO_ACTIVE_PLAN</p>
        <p className="text-[#4d7a4d] text-xs">Add questions to the bank, then initialise a study plan.</p>
        <div className="flex justify-center gap-3">
          <Link to="/questions" className="px-4 py-2 border border-[#1e321e] text-[#4d7a4d] text-xs tracking-wider hover:border-[#b8f5b8] hover:text-[#b8f5b8] transition-colors">
            ADD_QUESTIONS
          </Link>
          <Link to="/plan" className="px-4 py-2 border border-[#00ff41] text-[#00ff41] text-xs tracking-wider hover:bg-[#001a00] transition-colors">
            INIT_PLAN
          </Link>
        </div>
      </div>
    );
  }

  const s = stats!;
  const todayPct = s.today_total > 0 ? Math.round((s.today_done / s.today_total) * 100) : 0;
  const graduationPct = s.total > 0 ? Math.round((s.graduated / s.total) * 100) : 0;

  const statCards = [
    {
      label: "QUESTION_BANK",
      value: s.total,
      sub: `${s.new_questions} new · ${s.in_progress} active`,
      icon: BookOpen,
      color: "text-[#00d4ff]",
      border: "border-[#1e321e]",
    },
    {
      label: "GRADUATED",
      value: s.graduated,
      sub: `${graduationPct}% of bank`,
      icon: CheckCircle2,
      color: "text-[#00ff41]",
      border: s.graduated > 0 ? "border-[#00ff41]/30" : "border-[#1e321e]",
    },
    {
      label: "DUE_TODAY",
      value: s.due_today,
      sub: s.due_today > 0 ? "needs review" : "all caught up",
      icon: Zap,
      color: s.due_today > 0 ? "text-[#ff3358]" : "text-[#4d7a4d]",
      border: s.due_today > 0 ? "border-[#ff3358]/30" : "border-[#1e321e]",
    },
    {
      label: "AVG_PROFICIENCY",
      value: s.avg_proficiency != null ? s.avg_proficiency : "—",
      suffix: s.avg_proficiency != null ? "/ 10" : undefined,
      sub: s.avg_proficiency != null ? `across ${s.in_progress + s.graduated} reviewed` : "no reviews yet",
      icon: TrendingUp,
      color: "text-[#ffb300]",
      border: "border-[#1e321e]",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── QUESTIONS ─────────────────────────────────────────────────────────── */}
      <div className="space-y-5 bg-[#0a0f0a] rounded-sm px-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[#2a402a] text-xs tracking-widest mb-1">// QUESTIONS</p>
            <p className="text-[#4d7a4d] text-xs tabular-nums">
              {todayStr()}
              <span className="mx-2 text-[#1e321e]">·</span>
              {plan.config.daily_count} questions/day
            </p>
          </div>
          {s.today_completed ? (
            <div className="flex items-center gap-2 border border-[#1e321e] bg-[#0c120c] px-4 py-2 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff41]" />
              <span className="text-xs text-[#00ff41] tracking-wider hidden sm:inline">SESSION COMPLETE</span>
            </div>
          ) : (
            <Link to="/today"
              className="flex items-center gap-2 border border-[#00ff41] bg-[#001a00] px-4 py-2 hover:bg-[#002500] transition-colors group shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-[#00ff41]" />
              <span className="text-xs text-[#00ff41] tracking-wider hidden sm:inline">TODAY'S SESSION</span>
              <span className="text-[#2a402a] text-xs group-hover:text-[#4d7a4d]">[ENTER]</span>
            </Link>
          )}
        </div>

        <HackerRank score={s.hacker_score ?? 0} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map(({ label, value, suffix, sub, icon: Icon, color, border }) => (
            <div key={label} className={cn("bg-[#0c120c] border p-4", border)}>
              <Icon className={cn("w-4 h-4 mb-3", color)} />
              <div className={cn("text-2xl font-bold tabular-nums", color)}>
                {value}
                {suffix && <span className="text-sm font-normal text-[#3a5a3a] ml-1">{suffix}</span>}
              </div>
              <div className="text-[#2a402a] text-xs mt-1 tracking-widest">{label}</div>
              <div className="text-[#1e321e] text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {s.today_total > 0 && (
          <div className="bg-[#0c120c] border border-[#1e321e] px-4 py-3 flex items-center gap-4">
            <span className="text-[#2a402a] text-xs tracking-widest shrink-0">TODAY</span>
            <div className="flex-1 h-1.5 bg-[#080c08] border border-[#1e321e] overflow-hidden">
              <div className="h-full bg-[#00ff41] transition-all duration-700"
                style={{ width: `${todayPct}%`, boxShadow: todayPct > 0 ? "0 0 6px #00ff41" : "none" }} />
            </div>
            <span className="text-[#00ff41] text-xs tabular-nums shrink-0">
              {s.today_done}/{s.today_total}
            </span>
            <span className="text-[#2a402a] text-xs tabular-nums shrink-0">{todayPct}%</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="space-y-4">
            <div className="bg-[#0c120c] border border-[#1e321e] p-4 space-y-3">
              <p className="text-[#2a402a] text-xs tracking-widest">// PROFICIENCY_DISTRIBUTION</p>
              <ProficiencyHistogram dist={s.proficiency_dist} />
            </div>
            {s.category_breakdown.length > 0 && (
              <div className="bg-[#0c120c] border border-[#1e321e] p-4 space-y-4">
                <p className="text-[#2a402a] text-xs tracking-widest">// CATEGORY_BREAKDOWN</p>
                {s.category_breakdown.map((row) => {
                  const gradPct = row.total > 0 ? Math.round((row.graduated / row.total) * 100) : 0;
                  return (
                    <div key={row.category} className="space-y-1.5">
                      <div className="flex justify-between items-baseline text-xs gap-2 flex-wrap">
                        <span className="text-[#4d7a4d] tracking-wider">
                          {categoryLabel[row.category as keyof typeof categoryLabel] ?? row.category}
                        </span>
                        <span className="text-[#2a402a] tabular-nums text-right">
                          {row.graduated}/{row.total} graduated
                          {row.due_today > 0 && (
                            <span className="text-[#ff3358] ml-2">· {row.due_today} due</span>
                          )}
                          {row.avg_proficiency != null && (
                            <span className="text-[#4d7a4d] ml-2">· avg {row.avg_proficiency}</span>
                          )}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#080c08] border border-[#1e321e] overflow-hidden">
                        <div className="h-full bg-[#00ff41] transition-all duration-700"
                          style={{ width: `${gradPct}%`, boxShadow: gradPct > 0 ? "0 0 6px #00ff41" : "none" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-1 gap-3 xl:content-start">
            <Link to="/plan"
              className="bg-[#0c120c] border border-[#1e321e] p-4 hover:border-[#4d7a4d] transition-colors group">
              <Calendar className="w-4 h-4 text-[#2a402a] mb-3 group-hover:text-[#4d7a4d]" />
              <p className="text-xs text-[#b8f5b8] tracking-wider">REVIEW_QUEUE</p>
              <p className="text-xs text-[#2a402a] mt-1">Proficiency schedule view</p>
            </Link>
            <Link to="/questions"
              className="bg-[#0c120c] border border-[#1e321e] p-4 hover:border-[#4d7a4d] transition-colors group">
              <BookOpen className="w-4 h-4 text-[#2a402a] mb-3 group-hover:text-[#4d7a4d]" />
              <p className="text-xs text-[#b8f5b8] tracking-wider">QUESTION_BANK</p>
              <p className="text-xs text-[#2a402a] mt-1">Add and manage questions</p>
            </Link>
          </div>
        </div>
      </div>

      {/* ── ENGLISH ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 bg-[#080c10] rounded-sm px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[#2a402a] text-xs tracking-widest">// ENGLISH</p>
          <Link to="/english"
            className="flex items-center gap-2 border border-[#1e4a5a] bg-[#00080c] px-4 py-2 hover:bg-[#001520] transition-colors group shrink-0">
            <Languages className="w-3.5 h-3.5 text-[#00d4ff]/70" />
            <span className="text-xs text-[#00d4ff]/70 tracking-wider hidden sm:inline">ENGLISH_BANK</span>
            <span className="text-[#1e3a4a] text-xs group-hover:text-[#2a5a6a]">[ENTER]</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0c120c] border border-[#1e321e] p-4">
            <Languages className="w-4 h-4 text-[#00d4ff]/40 mb-3" />
            <div className="text-2xl font-bold tabular-nums text-[#00d4ff]/70">
              {englishTotal ?? "—"}
            </div>
            <div className="text-[#2a402a] text-xs mt-1 tracking-widest">ENGLISH_BANK</div>
            <div className="text-[#1e321e] text-xs mt-0.5">vocabulary entries</div>
          </div>
          <div className="bg-[#0c120c] border border-[#1e321e] p-4">
            <TrendingUp className="w-4 h-4 text-[#ffb300]/40 mb-3" />
            <div className="text-2xl font-bold tabular-nums text-[#ffb300]">
              {englishAvg != null ? englishAvg : "—"}
              {englishAvg != null && <span className="text-sm font-normal text-[#3a5a3a] ml-1">/ 10</span>}
            </div>
            <div className="text-[#2a402a] text-xs mt-1 tracking-widest">AVG_PROFICIENCY</div>
            <div className="text-[#1e321e] text-xs mt-0.5">across all entries</div>
          </div>
        </div>
      </div>

    </div>
  );
}
