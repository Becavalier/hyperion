import { Cpu } from "lucide-react";
import { progressToNext, RANKS } from "@/lib/ranks";
import { cn } from "@/lib/utils";

interface Props {
  score: number;
  className?: string;
}

export function HackerRank({ score, className }: Props) {
  const { current, next, pct } = progressToNext(score);
  const safeScore = Math.max(0, Math.min(100, score));

  return (
    <div
      className={cn(
        "rank-glow bg-[#0c120c] border border-[#1e321e] p-4 sm:p-5 flex flex-col gap-3",
        current.glowClass,
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 shrink-0" style={{ color: current.color }} />
          <div>
            <p className="text-[#2a402a] text-xs tracking-widest">// HACKER_RANK</p>
            <p
              className="text-base sm:text-lg font-bold tracking-wider mt-0.5"
              style={{ color: current.color, textShadow: `0 0 8px ${current.color}66` }}
            >
              {current.nameEn}
              <span className="ml-2 text-xs text-[#4d7a4d] font-normal tracking-normal">
                {current.nameCn}
              </span>
            </p>
            <p className="text-[#2a402a] text-xs mt-0.5">{current.tagline}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[#2a402a] text-xs tracking-widest">SCORE</p>
          <p
            className="text-2xl sm:text-3xl font-bold tabular-nums"
            style={{ color: current.color }}
          >
            {safeScore.toFixed(1)}
          </p>
          <p className="text-[#1e321e] text-xs tabular-nums">/ 100</p>
        </div>
      </div>

      {/* Progress to next rank */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline text-xs gap-2">
          <span className="text-[#4d7a4d] tracking-wider">
            {next ? "NEXT" : "MAX_TIER"}
          </span>
          <span className="text-[#2a402a] tabular-nums text-right">
            {next ? (
              <>
                <span style={{ color: next.color }}>{next.nameEn}</span>
                <span className="text-[#1e321e] ml-2">
                  {safeScore.toFixed(1)} / {next.min.toFixed(0)}
                </span>
              </>
            ) : (
              <span className="text-[#b94dff]">// kernel access unlocked</span>
            )}
          </span>
        </div>
        <div className="h-2 bg-[#080c08] border border-[#1e321e] overflow-hidden">
          <div
            className="h-full transition-all duration-700"
            style={{
              width: `${Math.round(pct * 100)}%`,
              background: current.color,
              boxShadow: `0 0 10px ${current.color}`,
            }}
          />
        </div>
      </div>

      {/* Tier ladder */}
      <div className="grid grid-cols-5 gap-1 pt-1">
        {RANKS.map((r) => {
          const reached = safeScore >= r.min;
          const isCurrent = r.key === current.key;
          return (
            <div
              key={r.key}
              className={cn(
                "text-[10px] sm:text-xs tracking-widest text-center py-1 border tabular-nums transition-colors",
                isCurrent ? "border-[#1e321e]" : "border-[#1e321e]/40",
              )}
              style={{
                color: reached ? r.color : "#1e321e",
                background: isCurrent ? `${r.color}10` : "transparent",
              }}
              title={`${r.nameCn} · ${r.min.toFixed(0)}–${r.max <= 100 ? r.max.toFixed(0) : "100"}`}
            >
              T{RANKS.indexOf(r) + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
