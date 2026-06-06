import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import type { Rank } from "@/lib/ranks";

interface Props {
  from: Rank;
  to: Rank;
  onDismiss: () => void;
}

export function RankUpBanner({ from, to, onDismiss }: Props) {
  const [phase, setPhase] = useState<"enter" | "stable" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("stable"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 4500);
    const t3 = setTimeout(onDismiss, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-[9000] flex items-center justify-center pointer-events-auto cursor-pointer"
      style={{
        background: `radial-gradient(circle at center, ${to.color}26 0%, rgba(0,0,0,0.7) 70%)`,
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 500ms ease",
      }}
    >
      <div
        className={`rank-glow ${to.glowClass} bg-[var(--c-bg)] border-2 px-12 py-10 flex flex-col items-center gap-4 transform-gpu`}
        style={{
          borderColor: to.color,
          transform:
            phase === "enter" ? "scale(0.5) translateY(-20px)" :
            phase === "exit"  ? "scale(0.92) translateY(0)" :
                                "scale(1) translateY(0)",
          opacity: phase === "enter" ? 0 : 1,
          transition: "transform 600ms cubic-bezier(0.16, 0.84, 0.44, 1), opacity 400ms ease",
        }}
      >
        <div className="flex items-center gap-2 text-[var(--c-fg2)] text-xs tracking-[0.4em]">
          <ChevronUp className="w-4 h-4" style={{ color: to.color }} />
          RANK_UP
          <ChevronUp className="w-4 h-4" style={{ color: to.color }} />
        </div>

        <div className="flex items-baseline gap-3 text-base text-[var(--c-fg2)]">
          <span style={{ color: from.color }}>{from.nameEn}</span>
          <span>→</span>
          <span
            className="text-2xl font-bold tracking-wider"
            style={{ color: to.color, textShadow: `0 0 14px ${to.color}` }}
          >
            {to.nameEn}
          </span>
        </div>

        <p className="text-[var(--c-fg1)] text-xs">{to.nameCn}</p>
        <p className="text-[var(--c-fg3)] text-xs tracking-widest">{to.tagline}</p>

        <p className="text-[var(--c-fg4)] text-xs mt-2 tracking-widest">// click anywhere to dismiss</p>
      </div>
    </div>
  );
}
