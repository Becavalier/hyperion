import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getPlan, generatePlan } from "@/lib/api";
import { cn, todayStr, categoryLabel, difficultyColor, difficultyLabel } from "@/lib/utils";
import type { StudyPlan, PlanStats, QueueItem } from "@/types";

const STAT_CARDS = [
  { key: "total",        label: "TOTAL",       color: "text-[#b8f5b8]" },
  { key: "due_today",    label: "DUE_TODAY",   color: "text-[#ff3358]" },
  { key: "in_progress",  label: "IN_PROGRESS", color: "text-[#ffb300]" },
  { key: "graduated",    label: "GRADUATED",   color: "text-[#00ff41]" },
  { key: "new_questions",label: "NEW",         color: "text-[#4d7a4d]" },
] as const;

function ProficiencyBar({ value }: { value: number }) {
  const capped = Math.min(value, 10);
  const pct = (capped / 10) * 100;
  const color = capped >= 8 ? "#00ff41" : capped >= 4 ? "#ffb300" : "#4d7a4d";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1 bg-[#1e321e] overflow-hidden">
        <div style={{ width: `${pct}%`, background: color, height: "100%" }} />
      </div>
      <span className="text-xs tabular-nums" style={{ color }}>{value > 10 ? "★" : value}</span>
    </div>
  );
}

export default function Plan() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [stats, setStats] = useState<PlanStats | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ start_date: todayStr(), daily_count: 6 });

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

  const inputCls = "w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] transition-colors";

  if (loading) {
    return <div className="text-[#4d7a4d] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[#2a402a] text-xs tracking-widest mb-1">// STUDY_PLAN</p>
          {plan && (
            <p className="text-[#4d7a4d] text-xs tabular-nums">
              started {plan.start_date.slice(0, 10)}
              <span className="mx-2 text-[#1e321e]">·</span>
              {plan.config.daily_count} questions/day
            </p>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#00ff41] text-[#00ff41] text-xs tracking-wider hover:bg-[#001a00] transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {plan ? "RECONFIGURE" : "INIT_PLAN"}
        </button>
      </div>

      {/* Config form */}
      {showForm && (
        <div className="bg-[#0c120c] border border-[#1e321e] p-4 space-y-4">
          <p className="text-[#2a402a] text-xs tracking-widest">// PLAN_CONFIG</p>
          {plan && (
            <p className="text-xs text-[#ffb300] border border-[#ffb300] bg-[#120d00] px-3 py-2 tracking-wide">
              ⚠ This creates a new plan. Question proficiency is preserved.
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">START_DATE</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">DAILY_COUNT</label>
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
              className="px-3 py-1.5 text-xs border border-[#1e321e] text-[#4d7a4d] hover:border-[#b8f5b8] hover:text-[#b8f5b8] tracking-wider transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-1.5 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors"
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
            <div key={key} className="bg-[#0c120c] border border-[#1e321e] p-3 text-center">
              <p className={cn("text-lg font-bold tabular-nums", color)}>{stats[key]}</p>
              <p className="text-[#2a402a] text-[10px] tracking-widest mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Algorithm note */}
      {plan && (
        <div className="text-[#2a402a] text-xs border border-[#1e321e] px-3 py-2 tracking-wide leading-relaxed">
          // SCHEDULING — each day: up to {Math.floor(plan.config.daily_count / 2)} due reviews + {plan.config.daily_count - Math.floor(plan.config.daily_count / 2)} new questions.
          Pass → +1 proficiency · Needs Practice → no change · Proficiency &gt; 10 → graduated.
        </div>
      )}

      {/* Question queue */}
      {queue.length > 0 ? (
        <div className="bg-[#0c120c] border border-[#1e321e] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#1e321e] text-[#2a402a] text-xs tracking-widest">
            // QUESTION_QUEUE — {queue.length} active questions
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e321e]">
                  {["QUESTION", "CATEGORY", "DIFFICULTY", "PROFICIENCY", "NEXT_REVIEW"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-[#2a402a] tracking-widest font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => {
                  const isDue = item.next_review_date !== null && item.next_review_date <= today;
                  const isToday = item.next_review_date === today;
                  const isNew = item.next_review_date === null && item.proficiency === 0;
                  return (
                    <tr key={item.id} className={cn(
                      "border-b border-[#1e321e] transition-colors",
                      isDue ? "hover:bg-[#120400]" : "hover:bg-[#080c08]"
                    )}>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          "leading-snug",
                          isDue ? "text-[#ff3358]" : isNew ? "text-[#4d7a4d]" : "text-[#b8f5b8]"
                        )}>
                          {item.title}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[#4d7a4d] whitespace-nowrap">{categoryLabel[item.category]}</td>
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
                          <span className="text-[#4d7a4d]">NEW</span>
                        ) : isToday ? (
                          <span className="text-[#ffb300]">TODAY</span>
                        ) : isDue ? (
                          <span className="text-[#ff3358]">{item.next_review_date} ⚠</span>
                        ) : (
                          <span className="text-[#2a402a]">{item.next_review_date}</span>
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
        <div className="text-center py-12 text-[#2a402a] text-xs tracking-widest">
          NO_PLAN — Click INIT_PLAN to begin
        </div>
      ) : (
        <div className="text-center py-12 text-[#2a402a] text-xs tracking-widest">
          ALL_GRADUATED — No active questions in queue
        </div>
      )}
    </div>
  );
}
