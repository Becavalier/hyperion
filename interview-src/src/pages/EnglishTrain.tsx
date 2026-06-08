import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { getTrainWords, submitTrainResults } from "@/lib/api";
import type { TrainWord } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Result { id: string; known: boolean; }

function Card({ word, onAnswer }: { word: TrainWord; onAnswer: (known: boolean) => void }) {
  const [revealed, setRevealed] = useState(false);
  const lines = word.content.split("\n");
  const noteLines = (word.notes ?? "").split("\n");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (document.body.dataset.chatOpen) return;
      if (e.target instanceof HTMLButtonElement) return;
      if (!revealed) {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); setRevealed(true); }
      } else {
        if (e.key === "ArrowLeft"  || e.key === "1") onAnswer(false);
        if (e.key === "ArrowRight" || e.key === "2") onAnswer(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, onAnswer]);

  return (
    <div className="card-slide-in flex flex-col bg-[var(--c-surface)] border border-[var(--c-border)] p-8 gap-6 min-h-[280px]">
      {/* Content rows — note + english side by side */}
      <div className="space-y-4">
        {lines.map((line, i) => (
          <div key={i} className="flex items-baseline gap-16">
            <p className="text-xl text-[var(--c-fg1)] leading-relaxed flex-1">
              {noteLines[i] || <span className="text-[var(--c-fg3)] italic text-sm">—</span>}
            </p>
            <div className={cn("text-right transition-opacity duration-200 shrink-0", revealed ? "opacity-100" : "opacity-0")}>
              <p className="text-2xl font-bold text-[var(--c-green)]/80 font-mono tracking-wide">{line}</p>
              {word.phonetic && i === 0 && (
                <p className="text-sm text-[var(--c-fg2)] font-mono">{word.phonetic}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[var(--c-fg4)] text-xs tabular-nums">LV {word.proficiency}</div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 border border-[var(--c-cyan-b)] text-[var(--c-cyan)]/60 text-sm tracking-wider hover:bg-[var(--c-cyan-bg)] hover:border-[var(--c-cyan)]/40 transition-colors flex items-center justify-center gap-3"
        >
          显示英文
          <span className="text-[var(--c-cyan-b)] text-xs">[SPACE]</span>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onAnswer(false)}
            className="flex items-center justify-center gap-2 py-3 border border-[var(--c-red)]/40 text-[var(--c-red)]/70 text-sm tracking-wider hover:bg-[var(--c-red-bg)] hover:border-[var(--c-red)]/70 transition-colors"
          >
            <XCircle className="w-4 h-4" /> 不认识
            <span className="text-[var(--c-red)]/30 text-xs">[←]</span>
          </button>
          <button
            onClick={() => onAnswer(true)}
            className="flex items-center justify-center gap-2 py-3 border border-[var(--c-green)]/40 text-[var(--c-green)]/80 text-sm tracking-wider hover:bg-[var(--c-green-bg)] hover:border-[var(--c-green)]/70 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> 认识
            <span className="text-[var(--c-green)]/30 text-xs">[→]</span>
          </button>
        </div>
      )}
    </div>
  );
}

function Summary({ results, words, onNextRound, onDone }: {
  results: Result[];
  words: TrainWord[];
  onNextRound: () => void;
  onDone: () => void;
}) {
  const known = results.filter((r) => r.known).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((known / total) * 100) : 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (document.body.dataset.chatOpen) return;
      if (e.key === "ArrowRight") onNextRound();
      if (e.key === " ") { e.preventDefault(); onDone(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNextRound, onDone]);

  return (
    <div className="flex flex-col gap-6 items-center py-10">
      <div className="text-center space-y-2">
        <p className="text-[var(--c-fg3)] text-xs tracking-widest">// TRAIN_COMPLETE</p>
        <p className="text-5xl font-bold tabular-nums text-[var(--c-green)]">{pct}%</p>
        <p className="text-[var(--c-fg2)] text-sm">{known} / {total} 认识</p>
      </div>

      <div className="w-full max-w-sm h-1.5 bg-[var(--c-bg)] border border-[var(--c-border)] overflow-hidden">
        <div
          className="h-full bg-[var(--c-green)] transition-all duration-700"
          style={{ width: `${pct}%`, boxShadow: pct > 0 ? "0 0 6px #00ff41" : "none" }}
        />
      </div>

      <div className="w-full max-w-sm space-y-1">
        {results.map((r) => {
          const w = words.find((w) => w.id === r.id);
          if (!w) return null;
          return (
            <div key={r.id} className={cn(
              "flex items-center justify-between px-3 py-1.5 text-xs font-mono",
              r.known ? "text-[var(--c-fg2)]" : "text-[var(--c-fg3)]"
            )}>
              <span className="truncate flex-1">{w.content.split("\n")[0]}</span>
              <span>{r.known ? "✓" : "✗"}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={onNextRound}
          className="px-4 py-2 border border-[var(--c-cyan-b)] text-[var(--c-cyan)]/70 text-xs tracking-wider hover:bg-[var(--c-cyan-bg)] hover:border-[var(--c-cyan)]/50 transition-colors"
        >
          NEXT_ROUND <span className="text-[var(--c-cyan-b)] text-xs">[→]</span>
        </button>
        <button
          onClick={onDone}
          className="px-4 py-2 border border-[var(--c-green)] text-[var(--c-green)] text-xs tracking-wider hover:bg-[var(--c-green-bg)] transition-colors"
        >
          DONE <span className="text-[var(--c-green)]/30 text-xs">[SPACE]</span>
        </button>
      </div>
    </div>
  );
}

export default function EnglishTrain() {
  const navigate = useNavigate();
  const [words, setWords] = useState<TrainWord[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    getTrainWords()
      .then(({ words: w, due_count }) => {
        setWords(w);
        setDueCount(due_count);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAnswer(known: boolean) {
    const word = words[idx];
    const newResults = [...results, { id: word.id, known }];
    setResults(newResults);

    if (idx + 1 >= words.length) {
      // All done — submit
      setSubmitting(true);
      try {
        await submitTrainResults(newResults);
      } finally {
        setSubmitting(false);
        setDone(true);
      }
    } else {
      setIdx((i) => i + 1);
      setCardKey((k) => k + 1);
    }
  }

  async function handleNextRound() {
    setLoading(true);
    setDone(false);
    setResults([]);
    setIdx(0);
    try {
      const { words: w, due_count } = await getTrainWords();
      setWords(w);
      setDueCount(due_count);
      setCardKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-[var(--c-fg2)] text-xs py-12 text-center tracking-widest animate-pulse">LOADING...</div>;
  }

  if (words.length === 0) {
    return (
      <div className="py-20 space-y-4 text-center">
        <p className="text-[var(--c-fg3)] text-xs tracking-widest">// NO_WORDS_DUE</p>
        <p className="text-[var(--c-fg2)] text-xs">今日无需复习的单词。</p>
        <button onClick={() => navigate("/english")} className="px-4 py-2 border border-[var(--c-border)] text-[var(--c-fg2)] text-xs tracking-wider hover:border-[var(--c-fg2)] transition-colors">
          BACK
        </button>
      </div>
    );
  }

  if (submitting) {
    return <div className="text-[var(--c-fg2)] text-xs py-12 text-center tracking-widest animate-pulse">SAVING...</div>;
  }

  if (done) {
    return <Summary results={results} words={words} onNextRound={handleNextRound} onDone={() => navigate("/english")} />;
  }

  const current = words[idx];

  return (
    <div className="flex flex-col gap-4 min-w-[560px] w-fit mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[var(--c-fg3)] text-xs tracking-widest">// TRAIN_MODE</p>
          <p className="text-[var(--c-fg4)] text-xs mt-0.5">
            {dueCount > 0 && <span className="text-[var(--c-red)]/60">{dueCount} due · </span>}
            {words.length} words
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[var(--c-fg2)] text-xs tabular-nums">{idx + 1} / {words.length}</div>
          <button onClick={() => navigate("/english")} className="p-1.5 text-[var(--c-fg3)] hover:text-[var(--c-fg2)] transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[var(--c-surface)] overflow-hidden">
        <div
          className="h-full bg-[var(--c-green)]/40 transition-all duration-300"
          style={{ width: `${(idx / words.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <Card key={cardKey} word={current} onAnswer={handleAnswer} />
    </div>
  );
}
