import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Calendar, CheckCircle2, Zap, Languages, TriangleAlert, Dices } from "lucide-react";
import { getStats, getDailyQuestion, addQuestionToSchedule } from "@/lib/api";
import { cn, todayStr, categoryLabel, difficultyLabel, difficultyColor } from "@/lib/utils";
import type { Stats, StudyPlan, Question } from "@/types";

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
            <div className="flex-1 h-4 bg-[var(--c-bg)] border border-[var(--c-border)] overflow-hidden">
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
            <span className="w-16 text-[var(--c-fg4)] shrink-0">{note}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyQuestion, setDailyQuestion] = useState<Question | null>(null);
  const [trainingDaily, setTrainingDaily] = useState(false);

  useEffect(() => {
    getStats().then(({ plan, stats }) => {
      setPlan(plan);
      setStats(stats);
    }).finally(() => setLoading(false));
    getDailyQuestion(todayStr()).then(({ question }) => setDailyQuestion(question)).catch(() => {});
  }, []);

  async function handleTrainDaily() {
    if (!dailyQuestion) return;
    setTrainingDaily(true);
    try {
      await addQuestionToSchedule(todayStr(), dailyQuestion.id);
      navigate(`/today?q=${dailyQuestion.id}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setTrainingDaily(false);
    }
  }

  if (loading) {
    return <div className="text-[var(--c-fg2)] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  if (!plan) {
    return (
      <div className="py-20 space-y-5 text-center">
        <p className="text-[var(--c-fg3)] text-xs tracking-widest">// NO_ACTIVE_PLAN</p>
        <p className="text-[var(--c-fg2)] text-xs">Add questions to the bank, then initialise a study plan.</p>
        <div className="flex justify-center gap-3">
          <Link to="/questions" className="px-4 py-2 border border-[var(--c-border)] text-[var(--c-fg2)] text-xs tracking-wider hover:border-[var(--c-fg1)] hover:text-[var(--c-fg1)] transition-colors">
            ADD_QUESTIONS
          </Link>
          <Link to="/plan" className="px-4 py-2 border border-[var(--c-green)] text-[var(--c-green)] text-xs tracking-wider hover:bg-[var(--c-green-bg)] transition-colors">
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
      color: "text-[var(--c-cyan)]",
      border: "border-[var(--c-border)]",
      bg: "bg-[var(--c-surface)]",
      alert: false,
    },
    {
      label: "GRADUATED",
      value: s.graduated,
      sub: `${graduationPct}% of bank`,
      icon: CheckCircle2,
      color: "text-[var(--c-green)]",
      border: s.graduated > 0 ? "border-[var(--c-green)]/30" : "border-[var(--c-border)]",
      bg: "bg-[var(--c-surface)]",
      alert: false,
    },
    {
      label: "DUE_TODAY",
      value: s.due_today,
      sub: s.due_today > 0 ? "needs review" : "all caught up",
      icon: Zap,
      color: s.due_today > 0 ? "text-[var(--c-red)]" : "text-[var(--c-fg2)]",
      border: s.due_today > 0 ? "border-[var(--c-red)]/30" : "border-[var(--c-border)]",
      bg: s.due_today > 0 ? "bg-[var(--c-red-bg)] shadow-[inset_0_0_16px_var(--c-red-glow)]" : "bg-[var(--c-surface)]",
      alert: s.due_today > 0,
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── QUESTIONS ─────────────────────────────────────────────────────────── */}
      <div className="space-y-5 px-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[var(--c-fg3)] text-xs tracking-widest mb-1">// QUESTIONS</p>
            <p className="text-[var(--c-fg2)] text-xs tabular-nums">
              {todayStr()}
              <span className="mx-2 text-[var(--c-fg4)]">·</span>
              {plan.config.daily_count} questions/day
            </p>
          </div>
          {s.today_completed ? (
            <div className="flex items-center gap-2 border border-[var(--c-border)] bg-[var(--c-surface)] px-4 py-2 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--c-green)]" />
              <span className="text-xs text-[var(--c-green)] tracking-wider hidden sm:inline">SESSION COMPLETE</span>
            </div>
          ) : (
            <Link to="/today"
              className="flex items-center gap-2 border border-[var(--c-green)] bg-[var(--c-green-bg)] px-4 py-2 hover:bg-[var(--c-green-bg)] transition-colors group shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-[var(--c-green)]" />
              <span className="text-xs text-[var(--c-green)] tracking-wider hidden sm:inline">TODAY'S SESSION</span>
              <span className="text-[var(--c-fg3)] text-xs group-hover:text-[var(--c-fg2)]">[ENTER]</span>
            </Link>
          )}
        </div>

        {dailyQuestion && (
          <div className="bg-[var(--c-surface)] border border-[var(--c-border)] px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <Dices className="w-4 h-4 text-[var(--c-cyan)] shrink-0" />
              <div className="min-w-0">
                <p className="text-[var(--c-fg3)] text-xs tracking-widest mb-1">// DAILY_ONE — random pick, any level</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[dailyQuestion.difficulty])}>
                    [{difficultyLabel[dailyQuestion.difficulty].toUpperCase()}]
                  </span>
                  <span className="text-xs text-[var(--c-fg2)] tracking-wider">{categoryLabel[dailyQuestion.category]}</span>
                  <span className="text-sm text-[var(--c-fg1)] truncate">{dailyQuestion.title}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleTrainDaily}
              disabled={trainingDaily}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-cyan)] text-[var(--c-cyan)] hover:bg-[var(--c-cyan-bg)] disabled:opacity-30 tracking-wider transition-colors shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              {trainingDaily ? "···" : "TRAIN"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {statCards.map(({ label, value, sub, icon: Icon, color, border, bg, alert }) => (
            <div key={label} className={cn("border p-4", border, bg)}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={cn("w-4 h-4", color)} />
                {alert && <TriangleAlert className={cn("w-4 h-4 alert-blink", color)} />}
              </div>
              <div className={cn("text-2xl font-bold tabular-nums", color)}>
                {value}
              </div>
              <div className="text-[var(--c-fg3)] text-xs mt-1 tracking-widest">{label}</div>
              <div className="text-[var(--c-fg4)] text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {s.today_total > 0 && (
          <div className="bg-[var(--c-surface)] border border-[var(--c-border)] px-4 py-3 flex items-center gap-4">
            <span className="text-[var(--c-fg3)] text-xs tracking-widest shrink-0">TODAY</span>
            <div className="flex-1 h-1.5 bg-[var(--c-bg)] border border-[var(--c-border)] overflow-hidden">
              <div className="h-full bg-[var(--c-green)] transition-all duration-700"
                style={{ width: `${todayPct}%`, boxShadow: todayPct > 0 ? "0 0 6px #00ff41" : "none" }} />
            </div>
            <span className="text-[var(--c-green)] text-xs tabular-nums shrink-0">
              {s.today_done}/{s.today_total}
            </span>
            <span className="text-[var(--c-fg3)] text-xs tabular-nums shrink-0">{todayPct}%</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="space-y-4">
            <div className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4 space-y-3">
              <p className="text-[var(--c-fg3)] text-xs tracking-widest">// PROFICIENCY_DISTRIBUTION</p>
              <ProficiencyHistogram dist={s.proficiency_dist} />
            </div>
            {s.category_breakdown.length > 0 && (
              <div className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4 space-y-4">
                <p className="text-[var(--c-fg3)] text-xs tracking-widest">// CATEGORY_BREAKDOWN</p>
                {s.category_breakdown.map((row) => {
                  const gradPct = row.total > 0 ? Math.round((row.graduated / row.total) * 100) : 0;
                  return (
                    <div key={row.category} className="space-y-1.5">
                      <div className="flex justify-between items-baseline text-xs gap-2 flex-wrap">
                        <span className="text-[var(--c-fg2)] tracking-wider">
                          {categoryLabel[row.category as keyof typeof categoryLabel] ?? row.category}
                        </span>
                        <span className="text-[var(--c-fg3)] tabular-nums text-right">
                          {row.graduated}/{row.total} graduated
                          {row.due_today > 0 && (
                            <span className="text-[var(--c-red)] ml-2">· {row.due_today} due</span>
                          )}
                          {row.avg_proficiency != null && (
                            <span className="text-[var(--c-fg2)] ml-2">· avg {row.avg_proficiency}</span>
                          )}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--c-bg)] border border-[var(--c-border)] overflow-hidden">
                        <div className="h-full bg-[var(--c-green)] transition-all duration-700"
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
              className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4 hover:border-[var(--c-fg2)] transition-colors group">
              <Calendar className="w-4 h-4 text-[var(--c-fg3)] mb-3 group-hover:text-[var(--c-fg2)]" />
              <p className="text-xs text-[var(--c-fg1)] tracking-wider">REVIEW_QUEUE</p>
              <p className="text-xs text-[var(--c-fg3)] mt-1">Proficiency schedule view</p>
            </Link>
            <Link to="/questions"
              className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4 hover:border-[var(--c-fg2)] transition-colors group">
              <BookOpen className="w-4 h-4 text-[var(--c-fg3)] mb-3 group-hover:text-[var(--c-fg2)]" />
              <p className="text-xs text-[var(--c-fg1)] tracking-wider">QUESTION_BANK</p>
              <p className="text-xs text-[var(--c-fg3)] mt-1">Add and manage questions</p>
            </Link>
          </div>
        </div>
      </div>

      {/* ── ENGLISH ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[var(--c-fg3)] text-xs tracking-widest">// ENGLISH</p>
          <Link to="/english"
            className="flex items-center gap-2 border border-[var(--c-cyan-b)] bg-[var(--c-cyan-bg)] px-4 py-2 hover:bg-[var(--c-cyan-bg)] transition-colors group shrink-0">
            <Languages className="w-3.5 h-3.5 text-[var(--c-cyan)]/70" />
            <span className="text-xs text-[var(--c-cyan)]/70 tracking-wider hidden sm:inline">ENGLISH_BANK</span>
            <span className="text-[var(--c-cyan-b)] text-xs group-hover:text-[var(--c-cyan-text)]">[ENTER]</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* BANK */}
          <div className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4">
            <Languages className="w-4 h-4 text-[var(--c-cyan)]/40 mb-3" />
            <div className="text-2xl font-bold tabular-nums text-[var(--c-cyan)]/70">
              {stats?.english?.total ?? "—"}
            </div>
            <div className="text-[var(--c-fg3)] text-xs mt-1 tracking-widest">ENGLISH_BANK</div>
            <div className="text-[var(--c-fg4)] text-xs mt-0.5">vocabulary entries</div>
          </div>
          {/* GRADUATED */}
          <div className={cn("bg-[var(--c-surface)] border p-4", (stats?.english?.graduated ?? 0) > 0 ? "border-[var(--c-green)]/30" : "border-[var(--c-border)]")}>
            <CheckCircle2 className="w-4 h-4 text-[var(--c-green)]/40 mb-3" />
            <div className="text-2xl font-bold tabular-nums text-[var(--c-green)]">
              {stats?.english?.graduated ?? "—"}
            </div>
            <div className="text-[var(--c-fg3)] text-xs mt-1 tracking-widest">GRADUATED</div>
            <div className="text-[var(--c-fg4)] text-xs mt-0.5">proficiency &gt; 10</div>
          </div>
          {/* OVERDUE — highlighted when non-zero */}
          <div className={cn(
            "border p-4",
            (stats?.english?.overdue ?? 0) > 0
              ? "border-[var(--c-red)]/30 bg-[var(--c-red-bg)] shadow-[inset_0_0_16px_var(--c-red-glow)]"
              : "border-[var(--c-border)] bg-[var(--c-surface)]"
          )}>
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-4 h-4 text-[var(--c-red)]/40" />
              {(stats?.english?.overdue ?? 0) > 0 && (
                <TriangleAlert className="w-4 h-4 text-[var(--c-red)] alert-blink" />
              )}
            </div>
            <div className={cn("text-2xl font-bold tabular-nums", (stats?.english?.overdue ?? 0) > 0 ? "text-[var(--c-red)]" : "text-[var(--c-fg2)]")}>
              {stats?.english?.overdue ?? "—"}
            </div>
            <div className="text-[var(--c-fg3)] text-xs mt-1 tracking-widest">OVERDUE</div>
            <div className="text-[var(--c-fg4)] text-xs mt-0.5">{(stats?.english?.overdue ?? 0) > 0 ? "needs review" : "all caught up"}</div>
          </div>
        </div>
      </div>

    </div>
  );
}
