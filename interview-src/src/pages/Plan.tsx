import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap } from "lucide-react";
import { getPlan, generatePlan, addQuestionToSchedule } from "@/lib/api";
import { cn, todayStr, categoryLabel, difficultyColor, difficultyLabel } from "@/lib/utils";
import type { StudyPlan, PlanStats, QueueItem } from "@/types";

const STAT_CARDS = [
  { key: "total",        label: "TOTAL",       color: "text-[var(--c-fg1)]" },
  { key: "due_today",    label: "DUE_TODAY",   color: "text-[var(--c-red)]" },
  { key: "in_progress",  label: "IN_PROGRESS", color: "text-[var(--c-amber)]" },
  { key: "graduated",    label: "GRADUATED",   color: "text-[var(--c-green)]" },
  { key: "new_questions",label: "NEW",         color: "text-[var(--c-fg2)]" },
] as const;

function ProficiencyBar({ value }: { value: number }) {
  const capped = Math.min(value, 10);
  const pct = (capped / 10) * 100;
  const color = capped >= 8 ? "#00ff41" : capped >= 4 ? "#ffb300" : "#4d7a4d";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1 bg-[var(--c-fg4)] overflow-hidden">
        <div style={{ width: `${pct}%`, background: color, height: "100%" }} />
      </div>
      <span className="text-xs tabular-nums" style={{ color }}>{value > 10 ? "★" : value}</span>
    </div>
  );
}

export default function Plan() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [stats, setStats] = useState<PlanStats | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ start_date: todayStr(), daily_count: 6 });
  const [trainingId, setTrainingId] = useState<string | null>(null);

  const today = todayStr();

  useEffect(() => {
    getPlan()
      .then(({ plan, stats, queue }) => { setPlan(plan); setStats(stats); setQueue(queue); })
      .finally(() => setLoading(false));
  }, []);

  async function handleGenerate() {
    setGenerating(true);
    try {
      await generatePlan(form);
      const { plan, stats, queue } = await getPlan();
      setPlan(plan); setStats(stats); setQueue(queue);
      setShowForm(false);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleTrainNow(questionId: string) {
    setTrainingId(questionId);
    try {
      await addQuestionToSchedule(today, questionId);
      navigate(`/today?q=${questionId}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setTrainingId(null);
    }
  }

  const inputCls = "w-full bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-fg1)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--c-green)] transition-colors";

  if (loading) {
    return <div className="text-[var(--c-fg2)] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[var(--c-fg3)] text-xs tracking-widest mb-1">// STUDY_PLAN</p>
          {plan && (
            <p className="text-[var(--c-fg2)] text-xs tabular-nums">
              started {plan.start_date.slice(0, 10)}
              <span className="mx-2 text-[var(--c-fg4)]">·</span>
              {plan.config.daily_count} questions/day
            </p>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--c-green)] text-[var(--c-green)] text-xs tracking-wider hover:bg-[var(--c-green-bg)] transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {plan ? "RECONFIGURE" : "INIT_PLAN"}
        </button>
      </div>

      {/* Config form */}
      {showForm && (
        <div className="bg-[var(--c-surface)] border border-[var(--c-border)] p-4 space-y-4">
          <p className="text-[var(--c-fg3)] text-xs tracking-widest">// PLAN_CONFIG</p>
          {plan && (
            <p className="text-xs text-[var(--c-amber)] border border-[var(--c-amber)] bg-[var(--c-amber-bg)] px-3 py-2 tracking-wide">
              ⚠ This creates a new plan. Question proficiency is preserved.
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--c-fg2)] mb-1.5 tracking-widest">START_DATE</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--c-fg2)] mb-1.5 tracking-widest">DAILY_COUNT</label>
              <input
                type="number"
                min={2}
                max={30}
                value={form.daily_count}
                onChange={(e) => setForm((f) => ({ ...f, daily_count: parseInt(e.target.value) }))}
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs border border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-fg1)] hover:text-[var(--c-fg1)] tracking-wider transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-1.5 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors"
            >
              {generating ? "SAVING..." : "EXECUTE"}
            </button>
          </div>
        </div>
      )}

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {STAT_CARDS.map(({ key, label, color }) => (
            <div key={key} className="bg-[var(--c-surface)] border border-[var(--c-border)] p-3 text-center">
              <p className={cn("text-lg font-bold tabular-nums", color)}>{stats[key]}</p>
              <p className="text-[var(--c-fg3)] text-[10px] tracking-widest mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Algorithm note */}
      {plan && (
        <div className="text-[var(--c-fg3)] text-xs border border-[var(--c-border)] px-3 py-2 tracking-wide leading-relaxed">
          // SCHEDULING — each day: up to {Math.floor(plan.config.daily_count / 2)} due reviews + {plan.config.daily_count - Math.floor(plan.config.daily_count / 2)} new questions.
          Pass → +1 proficiency · Needs Practice → no change · Proficiency &gt; 10 → graduated.
        </div>
      )}

      {/* Question queue */}
      {queue.length > 0 ? (
        <div className="bg-[var(--c-surface)] border border-[var(--c-border)] overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--c-border)] text-[var(--c-fg3)] text-xs tracking-widest">
            // QUESTION_QUEUE — {queue.length} active questions
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--c-border)]">
                  {["QUESTION", "CATEGORY", "DIFFICULTY", "PROFICIENCY", "NEXT_REVIEW", ""].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-[var(--c-fg3)] tracking-widest font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => {
                  const isDue = item.next_review_date !== null && item.next_review_date <= today;
                  const isToday = item.next_review_date === today;
                  const isNew = item.next_review_date === null && item.proficiency === 0;
                  const isOverdue = isDue && !isToday;
                  return (
                    <tr key={item.id} className={cn(
                      "border-b border-[var(--c-border)] transition-colors",
                      isDue ? "hover:bg-[var(--c-red-bg)]" : "hover:bg-[var(--c-bg)]"
                    )}>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          "leading-snug",
                          isDue ? "text-[var(--c-red)]" : isNew ? "text-[var(--c-fg2)]" : "text-[var(--c-fg1)]"
                        )}>
                          {item.title}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[var(--c-fg2)] whitespace-nowrap">{categoryLabel[item.category]}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className={cn("px-1.5 py-0.5 tracking-wider", difficultyColor[item.difficulty])}>
                          {difficultyLabel[item.difficulty].toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <ProficiencyBar value={item.proficiency} />
                      </td>
                      <td className="px-4 py-2.5 tabular-nums whitespace-nowrap">
                        {isNew ? (
                          <span className="text-[var(--c-fg2)]">NEW</span>
                        ) : isToday ? (
                          <span className="text-[var(--c-amber)]">TODAY</span>
                        ) : isDue ? (
                          <span className="text-[var(--c-red)]">{item.next_review_date} ⚠</span>
                        ) : (
                          <span className="text-[var(--c-fg3)]">{item.next_review_date}</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        {isOverdue && (
                          <button
                            onClick={() => handleTrainNow(item.id)}
                            disabled={trainingId === item.id}
                            title="Train this question now"
                            className="flex items-center gap-1 text-xs border border-[var(--c-red)] text-[var(--c-red)] px-2 py-1 hover:bg-[var(--c-red-bg)] disabled:opacity-30 tracking-wider transition-colors"
                          >
                            <Zap className="w-3 h-3" />
                            {trainingId === item.id ? "···" : "TRAIN"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : !plan ? (
        <div className="text-center py-12 text-[var(--c-fg3)] text-xs tracking-widest">
          NO_PLAN — Click INIT_PLAN to begin
        </div>
      ) : (
        <div className="text-center py-12 text-[var(--c-fg3)] text-xs tracking-widest">
          ALL_GRADUATED — No active questions in queue
        </div>
      )}
    </div>
  );
}
