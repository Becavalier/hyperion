import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Pencil, X, Save, ChevronDown, ChevronUp, PlusCircle, Zap } from "lucide-react";
import { Fragment } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import confetti from "canvas-confetti";
import type { Category } from "@/types";
import { getSchedule, submitReview, resetReview, getAIReview, updateQuestion, extendSchedule, getStats } from "@/lib/api";
import { cn, todayStr, categoryLabel, difficultyLabel, difficultyColor, ratingLabel } from "@/lib/utils";
import { rankFor } from "@/lib/ranks";
import { RankUpBanner } from "@/components/RankUpBanner";
import type { Rank } from "@/lib/ranks";
import { useSettings } from "@/lib/settings";
import type { Question, Review, DailySchedule, SelfRating } from "@/types";

// ── types ─────────────────────────────────────────────────────────────────────

interface QState {
  code: string;
  phase: "coding" | "submitted" | "done";
  reviewMode: "ai" | "manual" | null;
  aiFeedback: string | null;
  aiVerdict: SelfRating | null;
  loadingAI: boolean;
}

const BLANK: QState = { code: "", phase: "coding", reviewMode: null, aiFeedback: null, aiVerdict: null, loadingAI: false };

const RATINGS: { value: SelfRating; label: string; cls: string }[] = [
  { value: "mastered", label: "PASS",    cls: "border-[#00ff41] text-[#00ff41] hover:bg-[#011200]" },
  { value: "fuzzy",    label: "PARTIAL", cls: "border-[#ffb300] text-[#ffb300] hover:bg-[#120d00]" },
  { value: "unknown",  label: "FAIL",    cls: "border-[#ff3358] text-[#ff3358] hover:bg-[#120004]" },
];

// ── custom CodeMirror theme matching hacker palette ──────────────────────────

const hackerTheme = EditorView.theme({
  "&": { background: "#050905", color: "#b8f5b8", height: "100%" },
  ".cm-scroller": { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace", overflow: "auto", lineHeight: "1.7" },
  ".cm-content": { padding: "12px", caretColor: "#00ff41" },
  ".cm-line": { padding: "0 2px" },
  ".cm-focused": { outline: "none" },
  ".cm-cursor": { borderLeftColor: "#00ff41" },
  ".cm-selectionBackground, ::selection": { background: "rgba(0,255,65,0.15) !important" },
  ".cm-activeLine": { background: "rgba(0,255,65,0.04)" },
  ".cm-gutters": { background: "#050905", borderRight: "1px solid #1e321e", color: "#2a402a" },
  ".cm-activeLineGutter": { background: "rgba(0,255,65,0.04)" },
  ".cm-lineNumbers .cm-gutterElement": { paddingLeft: "8px", paddingRight: "8px" },
  ".cm-placeholder": { color: "#1e321e" },
}, { dark: true });

// ── syntax highlight theme matching hacker palette ────────────────────────────

const hackerSyntaxTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': { color: "#c8ffc8", background: "#050905", fontFamily: "inherit", fontSize: "0.75rem" },
  'pre[class*="language-"]':  { color: "#c8ffc8", background: "#050905", margin: 0, padding: 0 },
  "comment":      { color: "#6aaa6a", fontStyle: "italic" },
  "prolog":       { color: "#6aaa6a" },
  "keyword":      { color: "#00ff41", fontWeight: "bold" },
  "operator":     { color: "#7dff7d" },
  "boolean":      { color: "#ff5577" },
  "null":         { color: "#ff5577" },
  "undefined":    { color: "#ff5577" },
  "number":       { color: "#ffcc44" },
  "string":       { color: "#ffc040" },
  "char":         { color: "#ffc040" },
  "template-string": { color: "#ffc040" },
  "regex":        { color: "#ff9944" },
  "function":     { color: "#33ffcc" },
  "method":       { color: "#33ffcc" },
  "class-name":   { color: "#33ddff" },
  "builtin":      { color: "#33ddff" },
  "constant":     { color: "#33ddff" },
  "symbol":       { color: "#33ddff" },
  "variable":     { color: "#c8ffc8" },
  "property":     { color: "#c8ffc8" },
  "parameter":    { color: "#aaddff" },
  "attr-name":    { color: "#33ffcc" },
  "attr-value":   { color: "#ffc040" },
  "tag":          { color: "#00ff41" },
  "punctuation":  { color: "#7aa87a" },
  "important":    { color: "#ff5577", fontWeight: "bold" },
};

// ── shared markdown components (used by quiz reader + AI feedback) ───────────

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1
      className="text-2xl text-[#00ff41] font-mono font-bold tracking-wider mt-10 mb-6 px-4 py-2.5 bg-[#001a00] border-l-4 border-[#00ff41] uppercase before:content-['#_'] before:text-[#4d7a4d]"
      style={{ textShadow: "0 0 10px rgba(0,255,65,0.55)" }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      className="text-lg text-[#00ff41] font-mono font-bold tracking-wide mt-8 mb-4 pb-1.5 border-b-2 border-[#00ff41]/40 before:content-['##_'] before:text-[#2a402a]"
      style={{ textShadow: "0 0 6px rgba(0,255,65,0.25)" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base text-[#7dff7d] font-mono tracking-wider mt-7 mb-3 pl-3 border-l-2 border-[#00ff41]/50 before:content-['###_'] before:text-[#2a402a]">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="inline-block text-xs text-[#ffb300] font-mono font-bold tracking-[0.25em] uppercase mt-5 mb-2 px-2 py-0.5 bg-[#1a1100] border border-[#ffb300]/40">
      {children}
    </h4>
  ),
  p:  ({ children }: { children?: React.ReactNode }) => <p className="text-xs text-[#b8f5b8] leading-loose mb-4">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="text-xs text-[#b8f5b8] list-none space-y-2.5 mb-4 pl-2 [&>li]:pl-5 [&>li]:-indent-5 [&>li]:before:content-['▸'] [&>li]:before:text-[#2a402a] [&>li]:before:mr-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="text-xs text-[#b8f5b8] list-decimal list-inside space-y-2.5 mb-4 pl-2 marker:text-[#4d7a4d] marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-xs text-[#b8f5b8] leading-loose [&>p]:inline [&>p]:m-0">
      {children}
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-[#00ff41] font-semibold">{children}</strong>,
  em:     ({ children }: { children?: React.ReactNode }) => <em className="text-[#ffb300] not-italic">{children}</em>,
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    if (match) {
      return (
        <SyntaxHighlighter
          style={hackerSyntaxTheme}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, padding: 0, background: "transparent" }}
          codeTagProps={{ style: { fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace", fontSize: "0.75rem", lineHeight: "1.6" } }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    // Distinguish block code (multiline, lives inside <pre>) from inline `code`.
    // Inline gets the chip-with-border; block gets plain mono text — the outer <pre>
    // already provides the container border + padding, so no per-line frame.
    const isBlock = typeof children === "string" && children.includes("\n");
    if (isBlock) {
      return <code className="text-[#c8ffc8] font-mono text-xs whitespace-pre">{children}</code>;
    }
    return <code className="text-[#00ff41] bg-[#011200] border border-[#1e321e] px-1 py-0.5 text-xs font-mono">{children}</code>;
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-[#050905] border border-[#1e321e] p-3 overflow-x-auto mb-3 font-mono leading-relaxed">{children}</pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-[#2a402a] pl-3 text-[#4d7a4d] italic mb-3">{children}</blockquote>
  ),
  hr: () => <hr className="border-[#1e321e] my-4" />,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => <a href={href} className="text-[#00d4ff] underline hover:text-[#b8f5b8]">{children}</a>,
  table: ({ children }: { children?: React.ReactNode }) => <table className="w-full text-xs border-collapse mb-3">{children}</table>,
  th:    ({ children }: { children?: React.ReactNode }) => <th className="border border-[#1e321e] px-2 py-1 text-[#4d7a4d] text-left bg-[#080c08]">{children}</th>,
  td:    ({ children }: { children?: React.ReactNode }) => <td className="border border-[#1e321e] px-2 py-1 text-[#b8f5b8]">{children}</td>,
};

// ── per-category language extension ───────────────────────────────────────────

function langExtension(category: Category) {
  if (category === "frontend") return javascript();
  if (category === "algorithm") return cpp();
  return null; // quiz / system-design → plain text
}

const EDITOR_LANG_LABEL: Record<Category, string> = {
  frontend: "javascript",
  algorithm: "c++",
  "system-design": "plaintext",
  quiz: "plaintext",
};

// ── Keyboard spark effect ─────────────────────────────────────────────────────

function spawnSparks(x: number, y: number) {
  const count = 2 + Math.floor(Math.random() * 2); // 2–3
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "kbd-spark";
    const angle = Math.random() * Math.PI * 2;
    const dist = 8 + Math.random() * 10; // 短距离
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 2;
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--dy", `${dy}px`);
    el.style.animationDuration = `${220 + Math.random() * 120}ms`; // 更快
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 380);
  }
}

// ── Celebrations ──────────────────────────────────────────────────────────────

// PASS rating → wave of sparks fanning out from a screen point.
function spawnPassWave(originX: number, originY: number) {
  const count = 28;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "kbd-spark";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const dist = 60 + Math.random() * 90;
    el.style.setProperty("--sx", `${originX}px`);
    el.style.setProperty("--sy", `${originY}px`);
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    el.style.animationDuration = `${700 + Math.random() * 400}ms`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

// Question graduation (proficiency > 10) → full-screen confetti cascade.
function fireGraduationConfetti() {
  const colors = ["#00ff41", "#7dff7d", "#ffcc44", "#ffffff", "#33ddff"];
  const defaults = { spread: 360, ticks: 80, gravity: 0.7, decay: 0.94, startVelocity: 32, colors };

  // Center burst
  confetti({ ...defaults, particleCount: 80, scalar: 1.2, origin: { x: 0.5, y: 0.45 } });
  // Side cannons, staggered
  setTimeout(() => confetti({ ...defaults, particleCount: 50, angle: 60,  spread: 70, origin: { x: 0,  y: 0.7 } }), 150);
  setTimeout(() => confetti({ ...defaults, particleCount: 50, angle: 120, spread: 70, origin: { x: 1,  y: 0.7 } }), 150);
  // Slow shimmer follow-up
  setTimeout(() => confetti({ ...defaults, particleCount: 40, scalar: 0.8, gravity: 0.4, startVelocity: 18, origin: { x: 0.5, y: 0.3 } }), 450);
}

const sparkExtension = EditorView.updateListener.of((update) => {
  if (!update.docChanged) return;
  const view = update.view;
  const head = update.state.selection.main.head;
  const coords = view.coordsAtPos(head);
  if (coords) spawnSparks(coords.left, (coords.top + coords.bottom) / 2);
});

// ── CodeEditor ─────────────────────────────────────────────────────────────────

function CodeEditor({
  value,
  onChange,
  readOnly = false,
  label,
  category = "frontend",
  fontSize = "0.875rem",
}: {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  label?: string;
  category?: Category;
  fontSize?: string;
}) {
  const { settings } = useSettings();
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {label && (
        <div className="px-3 py-1.5 border-b border-[#1e321e] bg-[#080c08] text-[#2a402a] text-xs tracking-widest shrink-0">
          // {label}
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={value}
          onChange={readOnly ? undefined : onChange}
          extensions={[
            ...(langExtension(category) ? [langExtension(category)!] : []),
            EditorView.lineWrapping,
            ...(readOnly || !settings.sparksEnabled ? [] : [sparkExtension]),
          ]}
          theme={[oneDark, hackerTheme]}
          readOnly={readOnly}
          placeholder={category === "quiz" ? "// jot down keywords and thoughts..." : "// write your solution here..."}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            autocompletion: false,
            searchKeymap: false,
          }}
          style={{ height: "100%", fontSize }}
        />
      </div>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

export default function Today() {
  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [qStates, setQStates] = useState<Record<string, QState>>({});
  const [submitting, setSubmitting] = useState<SelfRating | null>(null);
  const [resetting, setResetting] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizDraft, setQuizDraft] = useState("");
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [hintDraft, setHintDraft] = useState("");
  const [savingHint, setSavingHint] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [extending, setExtending] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const [rankUp, setRankUp] = useState<{ from: Rank; to: Rank } | null>(null);

  const today = todayStr();

  useEffect(() => {
    const cur = questions[current];
    if (cur) setHintDraft(cur.answer_hint ?? "");
    setNotesOpen(false);   // 切题时自动收起 NOTES
  }, [current, questions]);

  useEffect(() => {
    setExhausted(false);
    getSchedule(today)
      .then(({ schedule, questions, reviews }) => {
        setSchedule(schedule);
        setQuestions(questions);
        setReviews(reviews);
        const init: Record<string, QState> = {};
        for (const q of questions) {
          const done = reviews.some((r) => r.question_id === q.id);
          init[q.id] = {
            ...BLANK,
            phase: done ? "done" : q.category === "quiz" ? "submitted" : "coding",
          };
        }
        setQStates(init);
        const firstPending = questions.findIndex((q) => !reviews.some((r) => r.question_id === q.id));
        if (firstPending !== -1) setCurrent(firstPending);
      })
      .finally(() => setLoading(false));
  }, [today]);

  function patch(qId: string, update: Partial<QState>) {
    setQStates((prev) => ({ ...prev, [qId]: { ...prev[qId], ...update } }));
  }

  if (loading) {
    return <div className="text-[#4d7a4d] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  if (!schedule) {
    return (
      <div className="text-center py-12 space-y-2">
        <p className="text-[#4d7a4d] text-xs tracking-widest">NO_SESSION_TODAY</p>
        <p className="text-[#2a402a] text-xs">
          No questions due and no new questions — or no active plan. Check the Schedule page.
        </p>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  const qs = qStates[q.id] ?? BLANK;
  const savedHint = q.answer_hint ?? "";
  const hintDirty = hintDraft !== savedHint;
  const review = reviews.find((r) => r.question_id === q.id);
  const doneCount = reviews.length;
  const pct = questions.length > 0 ? Math.round((doneCount / questions.length) * 100) : 0;

  async function handleAIReview() {
    patch(q.id, { reviewMode: "ai", loadingAI: true });
    try {
      const { feedback, verdict } = await getAIReview(q.id, qs.code);
      patch(q.id, { aiFeedback: feedback, aiVerdict: verdict, loadingAI: false });
    } catch {
      patch(q.id, { aiFeedback: "AI review failed — check console.", aiVerdict: null, loadingAI: false });
    }
  }

  async function handleReset() {
    if (!schedule) return;
    setResetting(true);
    try {
      await resetReview(schedule.id, q.id);
      setReviews((prev) => prev.filter((r) => r.question_id !== q.id));
      patch(q.id, { phase: q.category === "quiz" ? "submitted" : "coding", reviewMode: null, aiFeedback: null });
      window.dispatchEvent(new CustomEvent("prep:reviews-changed"));
    } finally {
      setResetting(false);
    }
  }

  async function handleRate(rating: SelfRating, event?: { currentTarget: HTMLElement }) {
    if (!schedule) return;
    setSubmitting(rating);
    try {
      const resp = await submitReview({ schedule_id: schedule.id, question_id: q.id, self_rating: rating });
      const nextReviews = [...reviews.filter((rv) => rv.question_id !== q.id), resp.review];
      setReviews(nextReviews);
      patch(q.id, { phase: "done" });
      window.dispatchEvent(new CustomEvent("prep:reviews-changed"));

      // ── Celebrations (after state updates so the UI repaints first) ──

      // PASS → sparks wave from the rating button
      if (rating === "mastered") {
        const target = event?.currentTarget?.getBoundingClientRect();
        const origin = target
          ? { x: target.left + target.width / 2, y: target.top + target.height / 2 }
          : { x: window.innerWidth / 2, y: window.innerHeight - 60 };
        spawnPassWave(origin.x, origin.y);
      }

      // Question graduated → full-screen confetti
      if (resp.graduated) {
        fireGraduationConfetti();
      }

      // Hacker rank crossed → banner
      try {
        const { stats } = await getStats();
        const newScore = stats?.hacker_score ?? 0;
        const prevScoreRaw = localStorage.getItem("hacker.score.v2");
        const prevScore = prevScoreRaw !== null ? Number(prevScoreRaw) : newScore;
        const { rank: prevRank } = rankFor(prevScore);
        const { rank: newRank } = rankFor(newScore);
        if (newRank.key !== prevRank.key) {
          setRankUp({ from: prevRank, to: newRank });
        }
        localStorage.setItem("hacker.score.v2", String(newScore));
        localStorage.removeItem("hacker.score"); // 清理旧 0-11 分数 key
      } catch {
        // non-fatal — celebration is opportunistic
      }

      const nextIdx = questions.findIndex((qu, i) => i !== current && !nextReviews.some((rv) => rv.question_id === qu.id));
      if (nextIdx !== -1) setCurrent(nextIdx);
    } finally {
      setSubmitting(null);
    }
  }

  async function handleExtend() {
    setExtending(true);
    try {
      const { added, exhausted: ex } = await extendSchedule(today);
      if (ex || added === 0) {
        setExhausted(true);
        return;
      }
      // Re-fetch the schedule to get the new questions
      const { schedule: s, questions: qs, reviews: rs } = await getSchedule(today);
      setSchedule(s);
      setQuestions(qs);
      setReviews(rs);
      const updatedStates: Record<string, QState> = { ...qStates };
      for (const qu of qs) {
        if (!updatedStates[qu.id]) {
          const done = rs.some((r) => r.question_id === qu.id);
          updatedStates[qu.id] = {
            ...BLANK,
            phase: done ? "done" : qu.category === "quiz" ? "submitted" : "coding",
          };
        }
      }
      setQStates(updatedStates);
      // Jump to the first newly-added question
      const firstNewIdx = qs.findIndex((qu) => !rs.some((r) => r.question_id === qu.id));
      if (firstNewIdx !== -1) setCurrent(firstNewIdx);
      window.dispatchEvent(new CustomEvent("prep:reviews-changed"));
    } finally {
      setExtending(false);
    }
  }

  async function handleSaveHint() {
    setSavingHint(true);
    try {
      await updateQuestion(q.id, { answer_hint: hintDraft });
      setQuestions((prev) => prev.map((qu) => qu.id === q.id ? { ...qu, answer_hint: hintDraft } : qu));
    } finally {
      setSavingHint(false);
    }
  }

  async function handleSaveQuizContent() {
    setSavingQuiz(true);
    try {
      await updateQuestion(q.id, { content: quizDraft });
      setQuestions((prev) => prev.map((qu) => qu.id === q.id ? { ...qu, content: quizDraft } : qu));
      setEditingQuizId(null);
    } finally {
      setSavingQuiz(false);
    }
  }

  // ── render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#2a402a] text-xs tracking-widest">// DAILY_REVIEW</p>
          <p className="text-[#4d7a4d] text-xs tabular-nums mt-0.5">
            {today}
            <span className="mx-2 text-[#1e321e]">|</span>
            <span className="text-[#00ff41]">{doneCount}</span>
            <span className="text-[#2a402a]">/{questions.length} completed</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {doneCount === questions.length && questions.length > 0 && (
            exhausted ? (
              <span className="text-[#4d7a4d] text-xs tracking-widest">// BANK_EXHAUSTED</span>
            ) : (
              <button
                onClick={handleExtend}
                disabled={extending}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#00ff41] text-[#00ff41] bg-[#001a00] hover:bg-[#002500] disabled:opacity-30 tracking-wider transition-colors"
                style={{ boxShadow: extending ? "none" : "0 0 8px rgba(0,255,65,0.4)" }}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {extending ? "FETCHING..." : "PICK_NEXT_BATCH ▶"}
              </button>
            )
          )}
          <div className="w-28 h-1.5 bg-[#080c08] border border-[#1e321e] overflow-hidden">
            <div className="h-full bg-[#00ff41] transition-all duration-500"
              style={{ width: `${pct}%`, boxShadow: pct > 0 ? "0 0 6px #00ff41" : "none" }} />
          </div>
          <span className="text-[#00ff41] text-xs tabular-nums">{pct}%</span>
        </div>
      </div>

      {/* Question tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 min-w-0 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-[#1e321e]">
        {questions.map((qu, i) => {
          const rv = reviews.find((r) => r.question_id === qu.id);
          const isActive = i === current;
          const next = questions[i + 1];
          const inCluster = qu.cluster_id !== null;
          const linksToNext = inCluster && next?.cluster_id === qu.cluster_id;
          return (
            <Fragment key={qu.id}>
              <button onClick={() => setCurrent(i)}
                ref={isActive ? (el) => el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) : undefined}
                title={inCluster ? "Part of a question cluster — solved together" : undefined}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 text-xs border tracking-wider transition-colors shrink-0",
                  isActive
                    ? "border-[#00ff41] text-[#00ff41] bg-[#001a00]"
                    : rv
                    ? "border-[#1e321e] text-[#2a402a] bg-[#080c08]"
                    : "border-[#1e321e] text-[#4d7a4d] hover:border-[#2a402a] hover:text-[#b8f5b8]",
                )}>
                {rv && <CheckCircle2 className="w-3 h-3" />}
                Q{i + 1}
              </button>
              {linksToNext && (
                <span
                  className="cluster-bolt shrink-0 flex items-center"
                  style={{ animationDelay: `${(i % 4) * 0.18}s` }}
                  aria-hidden
                >
                  <Zap className="w-3.5 h-3.5" strokeWidth={2.5} fill="currentColor" />
                </span>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Main panel — quiz: single full-width; others: split */}
      {q.category === "quiz" ? (
        /* ── QUIZ: single-panel markdown reader ── */
        <div
          className="flex flex-col border border-[#1e321e] overflow-hidden"
          style={{ height: "calc(100dvh - 14rem)", minHeight: 480 }}
        >
          <div className="px-4 py-2 border-b border-[#1e321e] bg-[#080c08] text-[#2a402a] text-xs tracking-widest shrink-0 flex items-center justify-between">
            <span>// QUIZ_CONTENT</span>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[q.difficulty])}>
                [{difficultyLabel[q.difficulty].toUpperCase()}]
              </span>
              {q.tags.map((t) => (
                <span key={t} className="text-xs text-[#2a402a] bg-[#050905] border border-[#1e321e] px-1.5 py-0.5">
                  {t}
                </span>
              ))}
              {editingQuizId === q.id ? (
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={handleSaveQuizContent}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[#00ff41] text-[#00ff41] px-2 py-0.5 hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    {savingQuiz ? "···" : "SAVE"}
                  </button>
                  <button
                    onClick={() => setEditingQuizId(null)}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[#1e321e] text-[#4d7a4d] px-2 py-0.5 hover:border-[#2a402a] hover:text-[#b8f5b8] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <X className="w-3 h-3" />
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingQuizId(q.id); setQuizDraft(q.content); }}
                  className="flex items-center gap-1 text-xs border border-[#1e321e] text-[#2a402a] px-2 py-0.5 hover:border-[#2a402a] hover:text-[#4d7a4d] tracking-wider transition-colors ml-2"
                >
                  <Pencil className="w-3 h-3" />
                  EDIT
                </button>
              )}
            </div>
          </div>

          {editingQuizId === q.id ? (
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                value={quizDraft}
                onChange={(v) => setQuizDraft(v)}
                category="system-design"
                label="MARKDOWN_SOURCE"
              />
            </div>
          ) : (
          <div className="flex-1 overflow-auto p-6">
            <h2 className="text-base text-[#b8f5b8] font-mono mb-4">{q.title}</h2>
            <div className="prose-quiz">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {q.content}
              </ReactMarkdown>
            </div>
          </div>
          )}

          {/* Nav + rating bar */}
          <div className="px-4 py-2.5 border-t border-[#1e321e] bg-[#080c08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrent((i) => Math.max(0, i - 1))} disabled={current === 0}
                className="flex items-center gap-1 text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider">
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>
              <span className="text-[#1e321e] text-xs tabular-nums">{current + 1}/{questions.length}</span>
              <button onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))} disabled={current === questions.length - 1}
                className="flex items-center gap-1 text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider">
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#2a402a] text-xs tracking-widest">SELF_RATE:</span>
              {review ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-wider" style={{
                    color: review.self_rating === "mastered" ? "#00ff41" : review.self_rating === "fuzzy" ? "#ffb300" : "#ff3358"
                  }}>
                    STATUS: {ratingLabel[review.self_rating]}
                  </span>
                  <button
                    onClick={handleReset}
                    disabled={resetting}
                    className="flex items-center gap-1 text-xs border border-[#1e321e] text-[#2a402a] px-2 py-1 hover:border-[#ff3358] hover:text-[#ff3358] hover:bg-[#120004] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {resetting ? "···" : "RESET"}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  {RATINGS.map(({ value, label, cls }) => (
                    <button key={value} onClick={(e) => handleRate(value, e)} disabled={submitting !== null}
                      className={`px-3 py-1.5 text-xs border tracking-wider disabled:opacity-30 transition-colors ${cls}`}>
                      {submitting === value ? "···" : label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── NORMAL: split panel ── */
        <div
          className="flex flex-col md:flex-row border border-[#1e321e] overflow-hidden"
          style={{ height: "calc(100dvh - 14rem)", minHeight: 480 }}
        >

          {/* LEFT — question description */}
          <div className="flex flex-col overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[#1e321e] h-52 md:h-auto md:w-[38%] xl:w-[32%]">
            <div className="px-4 py-2 border-b border-[#1e321e] bg-[#080c08] text-[#2a402a] text-xs tracking-widest shrink-0">
              // PROBLEM
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-3 min-h-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[q.difficulty])}>
                  [{difficultyLabel[q.difficulty].toUpperCase()}]
                </span>
                <span className="text-xs text-[#4d7a4d] tracking-wider">{categoryLabel[q.category]}</span>
              </div>
              <h2 className="text-sm text-[#b8f5b8] leading-snug">{q.title}</h2>
              {q.content && (
                <div className="prose-quiz [&_p]:leading-[1.65] [&_li]:leading-[1.65] [&_ul]:space-y-1.5 [&_ol]:space-y-1.5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {q.content}
                  </ReactMarkdown>
                </div>
              )}
              {q.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {q.tags.map((t) => (
                    <span key={t} className="text-xs text-[#2a402a] bg-[#050905] border border-[#1e321e] px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* NOTES — editable answer_hint, saveable anytime */}
            <div
              className="flex flex-col border-t border-[#1e321e] shrink-0"
              style={notesOpen ? { height: "40%", minHeight: 160 } : undefined}
            >
              <div className="px-4 py-1.5 border-b border-[#1e321e] bg-[#080c08] text-xs tracking-widest shrink-0 flex items-center justify-between">
                <button
                  onClick={() => setNotesOpen((o) => !o)}
                  className="flex items-center gap-1 text-[#2a402a] hover:text-[#4d7a4d] tracking-widest transition-colors"
                >
                  {notesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  // NOTES{hintDirty && <span className="text-[#ffb300] ml-1.5">*</span>}
                </button>
                {notesOpen && (
                  <button
                    onClick={handleSaveHint}
                    disabled={savingHint || !hintDirty}
                    className="flex items-center gap-1 text-xs border border-[#1e321e] text-[#2a402a] px-2 py-0.5 hover:border-[#00ff41] hover:text-[#00ff41] disabled:opacity-30 disabled:hover:border-[#1e321e] disabled:hover:text-[#2a402a] tracking-wider transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    {savingHint ? "···" : "SAVE"}
                  </button>
                )}
              </div>
              {notesOpen && (
                <div className="flex-1 overflow-hidden min-h-0">
                  <CodeEditor
                    value={hintDraft}
                    onChange={(v) => setHintDraft(v)}
                    category={q.category}
                    fontSize="0.75rem"
                  />
                </div>
              )}
            </div>

            {/* Prev / Next nav */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#1e321e] bg-[#080c08] shrink-0">
              <button onClick={() => setCurrent((i) => Math.max(0, i - 1))} disabled={current === 0}
                className="flex items-center gap-1 text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider">
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>
              <span className="text-[#2a402a] text-xs tabular-nums">{current + 1} / {questions.length}</span>
              <button onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))} disabled={current === questions.length - 1}
                className="flex items-center gap-1 text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider">
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* RIGHT — editor / review / done */}
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">

            {qs.phase === "coding" ? (
              /* ── CODING ── */
              <>
                <div className="px-4 py-2 border-b border-[#1e321e] bg-[#080c08] text-[#2a402a] text-xs tracking-widest flex items-center justify-between shrink-0">
                  <span>// EDITOR</span>
                  <span className="text-[#1e321e]">{EDITOR_LANG_LABEL[q.category]}</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <CodeEditor value={qs.code} onChange={(v) => patch(q.id, { code: v })} category={q.category} />
                </div>
                <div className="px-4 py-2.5 border-t border-[#1e321e] bg-[#080c08] flex items-center justify-between gap-2 shrink-0">
                  <span className="text-[#2a402a] text-xs tabular-nums">
                    {qs.code.trim() ? `${qs.code.split("\n").length} ln` : "empty"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        patch(q.id, { phase: "submitted" });
                        setTimeout(() => handleAIReview(), 0);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00091a] tracking-wider transition-colors"
                      style={{ boxShadow: "0 0 6px rgba(0,212,255,0.25)" }}
                    >
                      <Sparkles className="w-3 h-3" /> AI_REVIEW
                    </button>
                    <span className="text-[#1e321e] text-xs tracking-widest select-none">// or</span>
                    <div className="flex items-center gap-1.5">
                      {RATINGS.map(({ value, label, cls }) => (
                        <button
                          key={value}
                          onClick={(e) => { patch(q.id, { phase: "submitted", reviewMode: "manual" }); handleRate(value, e); }}
                          disabled={submitting !== null}
                          className={`px-3 py-1.5 text-xs border tracking-wider disabled:opacity-30 transition-colors ${cls}`}
                        >
                          {submitting === value ? "···" : label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>

            ) : (
              /* ── SUBMITTED: AI review 全屏，header 内联评分按钮 ── */
              <>
                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Header: // AI_REVIEW + inline 评分按钮 */}
                  <div className="px-4 py-2 border-b border-[#1e321e] bg-[#080c08] text-xs tracking-widest flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-2 text-[#00d4ff]">
                      <Sparkles className="w-3 h-3" /> // AI_REVIEW
                    </div>
                    <div className="flex items-center gap-0 divide-x divide-[#1e321e]">
                      {!review && (
                        <button
                          onClick={() => patch(q.id, { phase: "coding", reviewMode: null, aiFeedback: null, aiVerdict: null })}
                          className="text-[#2a402a] hover:text-[#4d7a4d] tracking-wider transition-colors px-3 py-1"
                        >
                          ← EDIT
                        </button>
                      )}
                      {review && (
                        <>
                          <span className="px-3 py-1 tracking-wider" style={{
                            color: review.self_rating === "mastered" ? "#00ff41" : review.self_rating === "fuzzy" ? "#ffb300" : "#ff3358"
                          }}>
                            {ratingLabel[review.self_rating]}
                          </span>
                          <button
                            onClick={handleReset}
                            disabled={resetting}
                            className="flex items-center gap-1 text-[#2a402a] hover:text-[#ff3358] disabled:opacity-30 tracking-wider transition-colors px-3 py-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            {resetting ? "···" : "RESET"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* AI feedback content */}
                  <div className="flex-1 overflow-auto">
                    {qs.loadingAI || !qs.aiFeedback ? (
                      <p className="text-[#4d7a4d] text-xs tracking-widest animate-pulse p-4">ANALYZING CODE...</p>
                    ) : (
                      <>
                        {/* Verdict banner */}
                        {qs.aiVerdict && (() => {
                          const r = RATINGS.find((x) => x.value === qs.aiVerdict)!;
                          const color = r.value === "mastered" ? "#00ff41" : r.value === "fuzzy" ? "#ffb300" : "#ff3358";
                          return (
                            <div
                              className="border-b border-[#1e321e] py-5 flex flex-col items-center justify-center gap-2"
                              style={{ background: `${color}10` }}
                            >
                              <p className="text-[#2a402a] text-xs tracking-[0.4em]">// VERDICT</p>
                              <p
                                className="text-3xl sm:text-4xl font-bold tracking-[0.2em] tabular-nums"
                                style={{ color, textShadow: `0 0 12px ${color}99` }}
                              >
                                {r.label}
                              </p>
                              {!review && (
                                <button
                                  onClick={(e) => handleRate(qs.aiVerdict!, e)}
                                  disabled={submitting !== null}
                                  className="mt-1 px-3 py-1 text-xs border tracking-wider disabled:opacity-30 transition-colors"
                                  style={{ borderColor: color, color }}
                                >
                                  {submitting ? "···" : "ACCEPT_VERDICT ▶"}
                                </button>
                              )}
                            </div>
                          );
                        })()}
                        <div className="prose-quiz p-4">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                            {qs.aiFeedback ?? ""}
                          </ReactMarkdown>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {rankUp && (
        <RankUpBanner from={rankUp.from} to={rankUp.to} onDismiss={() => setRankUp(null)} />
      )}
    </div>
  );
}
