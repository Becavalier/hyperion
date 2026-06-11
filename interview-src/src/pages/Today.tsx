import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Pencil, X, Save, ChevronDown, ChevronUp, PlusCircle, Zap } from "lucide-react";
import { Fragment } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import confetti from "canvas-confetti";
import { diffLines } from "diff";
import type { Category } from "@/types";
import { getSchedule, submitReview, resetReview, getAIReview, updateQuestion, extendSchedule, reshuffleSchedule, getStats } from "@/lib/api";
import { cn, todayStr, categoryLabel, difficultyLabel, difficultyColor, ratingLabel } from "@/lib/utils";
import { rankFor } from "@/lib/ranks";
import { RankUpBanner } from "@/components/RankUpBanner";
import type { Rank } from "@/lib/ranks";
import { useSettings } from "@/lib/settings";
import { useSetReviewCtx } from "@/lib/reviewContext";
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
  { value: "mastered", label: "PASS",          cls: "border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-dim)]" },
  { value: "fuzzy",    label: "NEEDS PRACTICE", cls: "border-[var(--c-amber)] text-[var(--c-amber)] hover:bg-[var(--c-amber-bg)]" },
];

// ── custom CodeMirror theme matching hacker palette ──────────────────────────

const hackerTheme = EditorView.theme({
  "&": { background: "var(--c-code)", color: "var(--c-fg1)", height: "100%" },
  ".cm-scroller": { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace", overflow: "auto", lineHeight: "1.7" },
  ".cm-content": { padding: "12px", caretColor: "var(--c-green)" },
  ".cm-line": { padding: "0 2px" },
  ".cm-focused": { outline: "none" },
  ".cm-cursor": { borderLeftColor: "var(--c-green)" },
  ".cm-selectionBackground, ::selection": { background: "color-mix(in srgb, var(--c-green) 18%, transparent) !important" },
  ".cm-activeLine": { background: "color-mix(in srgb, var(--c-green) 5%, transparent)" },
  ".cm-gutters": { background: "var(--c-code)", borderRight: "1px solid var(--c-border)", color: "var(--c-fg3)" },
  ".cm-activeLineGutter": { background: "color-mix(in srgb, var(--c-green) 5%, transparent)" },
  ".cm-lineNumbers .cm-gutterElement": { paddingLeft: "8px", paddingRight: "8px" },
  ".cm-placeholder": { color: "var(--c-fg4)" },
});

const hackerHighlight = HighlightStyle.define([
  { tag: tags.keyword,                       color: "var(--c-green)",   fontWeight: "bold" },
  { tag: tags.operator,                      color: "var(--c-green-s)" },
  { tag: tags.comment,                       color: "var(--c-fg3)",     fontStyle: "italic" },
  { tag: tags.lineComment,                   color: "var(--c-fg3)",     fontStyle: "italic" },
  { tag: tags.blockComment,                  color: "var(--c-fg3)",     fontStyle: "italic" },
  { tag: tags.string,                        color: "var(--c-amber)" },
  { tag: tags.special(tags.string),          color: "var(--c-amber)" },
  { tag: tags.number,                        color: "var(--c-amber)" },
  { tag: tags.bool,                          color: "var(--c-red)" },
  { tag: tags.null,                          color: "var(--c-red)" },
  { tag: tags.function(tags.variableName),   color: "var(--c-cyan)" },
  { tag: tags.function(tags.propertyName),   color: "var(--c-cyan)" },
  { tag: tags.definition(tags.variableName), color: "var(--c-cyan)" },
  { tag: tags.className,                     color: "var(--c-cyan)" },
  { tag: tags.typeName,                      color: "var(--c-cyan)" },
  { tag: tags.namespace,                     color: "var(--c-cyan)" },
  { tag: tags.tagName,                       color: "var(--c-green)" },
  { tag: tags.attributeName,                 color: "var(--c-cyan)" },
  { tag: tags.propertyName,                  color: "var(--c-fg0)" },
  { tag: tags.variableName,                  color: "var(--c-fg0)" },
  { tag: tags.regexp,                        color: "var(--c-red)" },
  { tag: tags.punctuation,                   color: "var(--c-fg2)" },
  { tag: tags.angleBracket,                  color: "var(--c-fg2)" },
  { tag: tags.meta,                          color: "var(--c-fg3)" },
]);

// ── syntax highlight theme matching hacker palette ────────────────────────────

const hackerSyntaxTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': { color: "var(--c-fg0)", background: "var(--c-code)", fontFamily: "inherit", fontSize: "0.75rem" },
  'pre[class*="language-"]':  { color: "var(--c-fg0)", background: "var(--c-code)", margin: 0, padding: 0 },
  "comment":         { color: "var(--c-fg3)", fontStyle: "italic" },
  "prolog":          { color: "var(--c-fg3)" },
  "keyword":         { color: "var(--c-green)", fontWeight: "bold" },
  "operator":        { color: "var(--c-green-s)" },
  "boolean":         { color: "var(--c-red)" },
  "null":            { color: "var(--c-red)" },
  "undefined":       { color: "var(--c-red)" },
  "number":          { color: "var(--c-amber)" },
  "string":          { color: "var(--c-amber)" },
  "char":            { color: "var(--c-amber)" },
  "template-string": { color: "var(--c-amber)" },
  "regex":           { color: "var(--c-red)" },
  "function":        { color: "var(--c-cyan)" },
  "method":          { color: "var(--c-cyan)" },
  "class-name":      { color: "var(--c-cyan)" },
  "builtin":         { color: "var(--c-cyan)" },
  "constant":        { color: "var(--c-cyan)" },
  "symbol":          { color: "var(--c-cyan)" },
  "variable":        { color: "var(--c-fg0)" },
  "property":        { color: "var(--c-fg0)" },
  "parameter":       { color: "var(--c-fg1)" },
  "attr-name":       { color: "var(--c-cyan)" },
  "attr-value":      { color: "var(--c-amber)" },
  "tag":             { color: "var(--c-green)" },
  "punctuation":     { color: "var(--c-fg2)" },
  "important":       { color: "var(--c-red)", fontWeight: "bold" },
};

// ── shared markdown components (used by quiz reader + AI feedback) ───────────

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1
      className="text-2xl text-[var(--c-green)] font-mono font-bold tracking-wider mt-10 mb-6 px-4 py-2.5 bg-[var(--c-green-bg)] border-l-4 border-[var(--c-green)] uppercase before:content-['#_'] before:text-[var(--c-fg2)] [text-shadow:0_0_10px_rgba(0,255,65,0.55)]"
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      className="text-lg text-[var(--c-green)] font-mono font-bold tracking-wide mt-8 mb-4 pb-1.5 border-b-2 border-[var(--c-green)]/40 before:content-['##_'] before:text-[var(--c-fg3)] [text-shadow:0_0_6px_rgba(0,255,65,0.25)]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base text-[var(--c-green-s)] font-mono tracking-wider mt-7 mb-3 pl-3 border-l-2 border-[var(--c-green)]/50 before:content-['###_'] before:text-[var(--c-fg3)]">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="inline-block text-xs text-[var(--c-amber)] font-mono font-bold tracking-[0.25em] uppercase mt-5 mb-2 px-2 py-0.5 bg-[var(--c-amber-bg)] border border-[var(--c-amber)]/40">
      {children}
    </h4>
  ),
  p:  ({ children }: { children?: React.ReactNode }) => <p className="text-xs text-[var(--c-fg1)] leading-loose mb-4">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="text-xs text-[var(--c-fg1)] list-none space-y-2.5 mb-4 pl-2 [&>li]:pl-5 [&>li]:-indent-5 [&>li]:before:content-['▸'] [&>li]:before:text-[var(--c-fg3)] [&>li]:before:mr-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="text-xs text-[var(--c-fg1)] list-decimal list-inside space-y-2.5 mb-4 pl-2 marker:text-[var(--c-fg2)] marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-xs text-[var(--c-fg1)] leading-loose [&>p]:inline [&>p]:m-0">
      {children}
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-[var(--c-green)] font-semibold">{children}</strong>,
  em:     ({ children }: { children?: React.ReactNode }) => <em className="text-[var(--c-amber)] not-italic">{children}</em>,
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
      return <code className="text-[var(--c-fg0)] font-mono text-xs whitespace-pre">{children}</code>;
    }
    return <code className="text-[var(--c-green)] bg-[var(--c-green-dim)] border border-[var(--c-border)] px-1 py-0.5 text-xs font-mono">{children}</code>;
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-[var(--c-code)] border border-[var(--c-border)] p-3 overflow-x-auto mb-3 font-mono leading-relaxed">{children}</pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-[var(--c-border2)] pl-3 text-[var(--c-fg2)] italic mb-3">{children}</blockquote>
  ),
  hr: () => <hr className="border-[var(--c-border)] my-4" />,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => <a href={href} className="text-[var(--c-cyan)] underline hover:text-[var(--c-fg1)]">{children}</a>,
  table: ({ children }: { children?: React.ReactNode }) => <table className="w-full text-xs border-collapse mb-3">{children}</table>,
  th:    ({ children }: { children?: React.ReactNode }) => <th className="border border-[var(--c-border)] px-2 py-1 text-[var(--c-fg2)] text-left bg-[var(--c-bg)]">{children}</th>,
  td:    ({ children }: { children?: React.ReactNode }) => <td className="border border-[var(--c-border)] px-2 py-1 text-[var(--c-fg1)]">{children}</td>,
};

// ── plain markdown components — traditional black-on-white style ─────────────

const plainMdComponents = {
  h1:         ({ children }: { children?: React.ReactNode }) => <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">{children}</h1>,
  h2:         ({ children }: { children?: React.ReactNode }) => <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">{children}</h2>,
  h3:         ({ children }: { children?: React.ReactNode }) => <h3 className="text-lg font-semibold mt-5 mb-2 text-gray-800 dark:text-gray-200">{children}</h3>,
  h4:         ({ children }: { children?: React.ReactNode }) => <h4 className="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">{children}</h4>,
  p:          ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-gray-800 dark:text-gray-300 leading-relaxed text-sm">{children}</p>,
  ul:         ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-outside pl-5 mb-5 text-gray-800 dark:text-gray-300 space-y-2 text-sm">{children}</ul>,
  ol:         ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-outside pl-5 mb-5 text-gray-800 dark:text-gray-300 space-y-2 text-sm">{children}</ol>,
  li:         ({ children }: { children?: React.ReactNode }) => <li className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed">{children}</li>,
  strong:     ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
  em:         ({ children }: { children?: React.ReactNode }) => <em className="italic text-gray-700 dark:text-gray-400">{children}</em>,
  blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 text-gray-600 dark:text-gray-400 italic mb-4 my-4">{children}</blockquote>,
  hr:         () => <hr className="border-gray-300 dark:border-gray-700 my-5" />,
  a:          ({ href, children }: { href?: string; children?: React.ReactNode }) => <a href={href} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">{children}</a>,
  table:      ({ children }: { children?: React.ReactNode }) => <table className="w-full text-sm border-collapse mb-5">{children}</table>,
  th:         ({ children }: { children?: React.ReactNode }) => <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100">{children}</th>,
  td:         ({ children }: { children?: React.ReactNode }) => <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-300">{children}</td>,
  pre:        ({ children }: { children?: React.ReactNode }) => <pre className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto mt-3 mb-5 rounded text-sm font-mono leading-relaxed">{children}</pre>,
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    if (match) {
      return (
        <SyntaxHighlighter
          style={hackerSyntaxTheme}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, padding: 0, background: "transparent" }}
          codeTagProps={{ style: { fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace", fontSize: "0.8rem", lineHeight: "1.6" } }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    return <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
  },
};

// ── per-category language extension ───────────────────────────────────────────

function langExtension(category: Category) {
  if (category === "frontend") return javascript({ jsx: true });
  if (category === "algorithm") return cpp();
  return null; // quiz / system-design → plain text
}

const EDITOR_LANG_LABEL: Record<Category, string> = {
  frontend: "javascript",
  algorithm: "c++",
  "system-design": "plaintext",
  quiz: "plaintext",
};

// ── Code diff helpers ─────────────────────────────────────────────────────────

function normalizeCode(code: string): string {
  return code
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, "  ")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function DiffView({ reference, submitted }: { reference: string; submitted: string }) {
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const parts = diffLines(normalizeCode(reference), normalizeCode(submitted));
    const out: Array<{ kind: "added" | "removed" | "equal"; line: string }> = [];
    for (const part of parts) {
      const lines = part.value.split("\n");
      if (lines[lines.length - 1] === "") lines.pop();
      const kind = part.added ? "added" : part.removed ? "removed" : "equal";
      for (const line of lines) out.push({ kind, line });
    }
    return out;
  }, [reference, submitted]);

  const changeCount = rows.filter((r) => r.kind !== "equal").length;

  return (
    <div className="border-t border-[var(--c-border)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2 flex items-center justify-between text-xs tracking-widest text-[var(--c-fg3)] hover:text-[var(--c-fg2)] bg-[var(--c-bg)] transition-colors"
      >
        <span className="flex items-center gap-3">
          <span>// DIFF</span>
          <span className="text-[var(--c-fg4)]">reference ↔ submitted</span>
          {changeCount === 0 ? (
            <span className="text-[var(--c-green)]">✓ identical</span>
          ) : (
            <span className="text-[var(--c-amber)]">{changeCount} line{changeCount !== 1 ? "s" : ""} differ</span>
          )}
        </span>
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && (
        <div className="overflow-auto max-h-[40vh] border-t border-[var(--c-border)] bg-[var(--c-code)]">
          <pre className="text-xs font-mono leading-relaxed">
            {rows.map(({ kind, line }, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 flex gap-2",
                  kind === "added"   && "bg-[var(--c-green-dim)] text-[var(--c-green)]",
                  kind === "removed" && "bg-[rgba(255,51,88,0.08)] text-[var(--c-red)]",
                  kind === "equal"   && "text-[var(--c-fg4)]",
                )}
              >
                <span className="select-none shrink-0 w-3 text-center">
                  {kind === "added" ? "+" : kind === "removed" ? "-" : " "}
                </span>
                <span className="whitespace-pre">{line || " "}</span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Keyboard spark effect ─────────────────────────────────────────────────────

const SPARK_COLORS_DARK = [
  "rgba(0,255,65,0.9)",     // hacker green
  "rgba(125,255,125,0.85)", // soft green
  "rgba(0,212,255,0.85)",   // cyan
  "rgba(255,255,255,0.9)",  // white
];

const SPARK_COLORS_LIGHT = [
  "rgba(0,122,30,0.92)",   // dark green  (--c-green)
  "rgba(42,110,42,0.88)",  // forest green (--c-green-s)
  "rgba(0,80,168,0.88)",   // deep blue    (--c-cyan)
  "rgba(180,100,0,0.88)",  // warm amber
];

function getSparkColors() {
  const theme = document.documentElement.dataset.theme;
  const isLight =
    theme === "light" ||
    (!theme && window.matchMedia("(prefers-color-scheme: light)").matches);
  return isLight ? SPARK_COLORS_LIGHT : SPARK_COLORS_DARK;
}

function spawnSparks(x: number, y: number) {
  const colors = getSparkColors();
  const count = 2 + Math.floor(Math.random() * 2); // 2–3
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "kbd-spark";
    const angle = Math.random() * Math.PI * 2;
    const dist = 14 + Math.random() * 14; // 14–28px
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 3;
    const size = 2 + Math.random() * 3.5; // 2–5.5px
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--dy", `${dy}px`);
    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--color", color);
    el.style.setProperty("--glow", `${size * 2}px`);
    el.style.animationDuration = `${240 + Math.random() * 100}ms`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 400);
  }
}

// ── Celebrations ──────────────────────────────────────────────────────────────

// PASS rating → wave of sparks fanning out from a screen point.
function spawnPassWave(originX: number, originY: number) {
  const colors = getSparkColors();
  const count = 28;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "kbd-spark";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const dist = 60 + Math.random() * 90;
    const size = 2 + Math.random() * 4;
    el.style.setProperty("--sx", `${originX}px`);
    el.style.setProperty("--sy", `${originY}px`);
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    el.style.setProperty("--glow", `${size * 2}px`);
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
  lineWrapping = true,
}: {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  label?: string;
  category?: Category;
  fontSize?: string;
  lineWrapping?: boolean;
}) {
  const { settings } = useSettings();
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {label && (
        <div className="px-3 py-1.5 border-b border-[var(--c-border)] bg-[var(--c-bg)] text-[var(--c-fg3)] text-xs tracking-widest shrink-0">
          // {label}
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={value}
          onChange={readOnly ? undefined : onChange}
          extensions={[
            ...(langExtension(category) ? [langExtension(category)!] : []),
            ...(lineWrapping ? [EditorView.lineWrapping] : []),
            ...(readOnly || !settings.sparksEnabled ? [] : [sparkExtension]),
          ]}
          theme={[hackerTheme, syntaxHighlighting(hackerHighlight)]}

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
  const [reshuffling, setReshuffling] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const [rankUp, setRankUp] = useState<{ from: Rank; to: Rank } | null>(null);

  const setReviewCtx = useSetReviewCtx();
  const today = todayStr();

  useEffect(() => {
    const cur = questions[current];
    if (cur) setHintDraft(cur.answer_hint ?? "");
    setNotesOpen(false);   // 切题时自动收起 NOTES
  }, [current, questions]);

  useEffect(() => {
    const q = questions[current];
    if (!q) { setReviewCtx(null); return; }
    const qs = qStates[q.id] ?? BLANK;
    setReviewCtx({
      mode: "DAILY_REVIEW",
      questionTitle: q.title,
      questionContent: q.content || "",
      category: q.category,
      difficulty: q.difficulty,
      phase: qs.phase,
      code: qs.code,
      codeLanguage: EDITOR_LANG_LABEL[q.category],
    });
    return () => setReviewCtx(null);
  }, [questions, current, qStates, setReviewCtx]);

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
    return <div className="text-[var(--c-fg2)] text-xs py-12 text-center tracking-widest">LOADING...</div>;
  }

  if (!schedule) {
    return (
      <div className="text-center py-12 space-y-2">
        <p className="text-[var(--c-fg2)] text-xs tracking-widest">NO_SESSION_TODAY</p>
        <p className="text-[var(--c-fg3)] text-xs">
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

  async function handleReshuffle() {
    setReshuffling(true);
    try {
      const { questions: qs, reviews: rs, replaced, exhausted: ex } = await reshuffleSchedule(today);
      if (replaced === 0) {
        if (ex) setExhausted(true);
        return;
      }
      setQuestions(qs);
      setReviews(rs);
      setQStates((prev) => {
        const next: Record<string, QState> = {};
        for (const q of qs) {
          const done = rs.some((r) => r.question_id === q.id);
          next[q.id] = prev[q.id] ?? {
            ...BLANK,
            phase: done ? "done" : q.category === "quiz" ? "submitted" : "coding",
          };
        }
        return next;
      });
      const firstPending = qs.findIndex((q) => !rs.some((r) => r.question_id === q.id));
      if (firstPending !== -1) setCurrent(firstPending);
    } finally {
      setReshuffling(false);
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
          <p className="text-[var(--c-fg3)] text-xs tracking-widest">// DAILY_REVIEW</p>
          <p className="text-[var(--c-fg2)] text-xs tabular-nums mt-0.5">
            {today}
            <span className="mx-2 text-[var(--c-fg4)]">|</span>
            <span className="text-[var(--c-green)]">{doneCount}</span>
            <span className="text-[var(--c-fg3)]">/{questions.length} completed</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {doneCount < questions.length && questions.length > 0 && (
            <button
              onClick={handleReshuffle}
              disabled={reshuffling}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)] disabled:opacity-30 tracking-wider transition-colors"
            >
              {reshuffling ? "···" : "RESHUFFLE ↺"}
            </button>
          )}
          {doneCount === questions.length && questions.length > 0 && (
            exhausted ? (
              <span className="text-[var(--c-fg2)] text-xs tracking-widest">// BANK_EXHAUSTED</span>
            ) : (
              <button
                onClick={handleExtend}
                disabled={extending}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)] hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors", !extending && "shadow-[0_0_8px_rgba(0,255,65,0.4)]")}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {extending ? "FETCHING..." : "PICK_NEXT_BATCH ▶"}
              </button>
            )
          )}
          <div className="w-28 h-1.5 bg-[var(--c-bg)] border border-[var(--c-border)] overflow-hidden">
            <div className="h-full bg-[var(--c-green)] transition-all duration-500"
              style={{ width: `${pct}%`, boxShadow: pct > 0 ? "0 0 6px var(--c-green)" : "none" }} />
          </div>
          <span className="text-[var(--c-green)] text-xs tabular-nums">{pct}%</span>
        </div>
      </div>

      {/* Question tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 min-w-0 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-[var(--c-fg4)]">
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
                    ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : rv
                    ? "border-[var(--c-border)] text-[var(--c-fg3)] bg-[var(--c-bg)]"
                    : "border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)]",
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
          className="flex flex-col border border-[var(--c-border)] overflow-hidden h-[calc(100dvh-14rem)] min-h-[480px]"
        >
          <div className="px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg)] text-[var(--c-fg3)] text-xs tracking-widest shrink-0 flex items-center justify-between">
            <span>// QUIZ_CONTENT</span>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[q.difficulty])}>
                [{difficultyLabel[q.difficulty].toUpperCase()}]
              </span>
              {q.tags.map((t) => (
                <span key={t} className="text-xs text-[var(--c-fg3)] bg-[var(--c-code)] border border-[var(--c-border)] px-1.5 py-0.5">
                  {t}
                </span>
              ))}
              {editingQuizId === q.id ? (
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={handleSaveQuizContent}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[var(--c-green)] text-[var(--c-green)] px-2 py-0.5 hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    {savingQuiz ? "···" : "SAVE"}
                  </button>
                  <button
                    onClick={() => setEditingQuizId(null)}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg2)] px-2 py-0.5 hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <X className="w-3 h-3" />
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingQuizId(q.id); setQuizDraft(q.content); }}
                  className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg3)] px-2 py-0.5 hover:border-[var(--c-border2)] hover:text-[var(--c-fg2)] tracking-wider transition-colors ml-2"
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
          <div className="flex-1 overflow-auto p-6 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{q.title}</h2>
            <div>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={plainMdComponents}>
                {q.content}
              </ReactMarkdown>
            </div>
          </div>
          )}

          {/* Nav + rating bar */}
          <div className="px-4 py-2.5 border-t border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrent((i) => Math.max(0, i - 1))} disabled={current === 0}
                className="flex items-center gap-1 text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 transition-colors tracking-wider">
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>
              <span className="text-[var(--c-fg4)] text-xs tabular-nums">{current + 1}/{questions.length}</span>
              <button onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))} disabled={current === questions.length - 1}
                className="flex items-center gap-1 text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 transition-colors tracking-wider">
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--c-fg3)] text-xs tracking-widest">SELF_RATE:</span>
              {review ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-wider" style={{
                    color: review.self_rating === "mastered" ? "var(--c-green)" : review.self_rating === "fuzzy" ? "var(--c-amber)" : "var(--c-red)"
                  }}>
                    STATUS: {ratingLabel[review.self_rating]}
                  </span>
                  <button
                    onClick={handleReset}
                    disabled={resetting}
                    className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg3)] px-2 py-1 hover:border-[var(--c-red)] hover:text-[var(--c-red)] hover:bg-[var(--c-red-bg)] disabled:opacity-30 tracking-wider transition-colors"
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
          className="flex flex-col md:flex-row border border-[var(--c-border)] overflow-hidden h-[calc(100dvh-14rem)] min-h-[480px]"
        >

          {/* LEFT — question description */}
          <div className="flex flex-col overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[var(--c-border)] h-52 md:h-auto md:w-[38%] xl:w-[32%]">
            <div className="px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg)] text-[var(--c-fg3)] text-xs tracking-widest shrink-0 flex items-center justify-between">
              <span>// PROBLEM</span>
              {editingQuizId === q.id ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSaveQuizContent}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[var(--c-green)] text-[var(--c-green)] px-2 py-0.5 hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    {savingQuiz ? "···" : "SAVE"}
                  </button>
                  <button
                    onClick={() => setEditingQuizId(null)}
                    disabled={savingQuiz}
                    className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg2)] px-2 py-0.5 hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)] disabled:opacity-30 tracking-wider transition-colors"
                  >
                    <X className="w-3 h-3" />
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingQuizId(q.id); setQuizDraft(q.content ?? ""); }}
                  className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg3)] px-2 py-0.5 hover:border-[var(--c-border2)] hover:text-[var(--c-fg2)] tracking-wider transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  EDIT
                </button>
              )}
            </div>
            {editingQuizId === q.id ? (
              <div className="flex-1 overflow-hidden min-h-0">
                <CodeEditor
                  value={quizDraft}
                  onChange={(v) => setQuizDraft(v)}
                  category="system-design"
                  label="MARKDOWN_SOURCE"
                  fontSize="0.75rem"
                />
              </div>
            ) : (
            <div className="flex-1 overflow-auto p-4 space-y-3 min-h-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[q.difficulty])}>
                  [{difficultyLabel[q.difficulty].toUpperCase()}]
                </span>
                <span className="text-xs text-[var(--c-fg2)] tracking-wider">{categoryLabel[q.category]}</span>
              </div>
              <h2 className="text-sm text-[var(--c-fg1)] leading-snug">{q.title}</h2>
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
                    <span key={t} className="text-xs text-[var(--c-fg3)] bg-[var(--c-code)] border border-[var(--c-border)] px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* NOTES — editable answer_hint, saveable anytime */}
            <div
              className="flex flex-col border-t border-[var(--c-border)] shrink-0"
              style={notesOpen ? { height: "40%", minHeight: 160 } : undefined}
            >
              <div className={`px-4 py-1.5 bg-[var(--c-bg)] text-xs tracking-widest shrink-0 flex items-center justify-between${notesOpen ? " border-b border-[var(--c-border)]" : ""}`}>
                <button
                  onClick={() => setNotesOpen((o) => !o)}
                  className="flex items-center gap-1 text-[var(--c-fg3)] hover:text-[var(--c-fg2)] tracking-widest transition-colors"
                >
                  {notesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  // NOTES{hintDirty && <span className="text-[var(--c-amber)] ml-1.5">*</span>}
                </button>
                {notesOpen && (
                  <button
                    onClick={handleSaveHint}
                    disabled={savingHint || !hintDirty}
                    className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg3)] px-2 py-0.5 hover:border-[var(--c-green)] hover:text-[var(--c-green)] disabled:opacity-30 disabled:hover:border-[var(--c-border)] disabled:hover:text-[var(--c-fg3)] tracking-wider transition-colors"
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
                    lineWrapping={false}
                  />
                </div>
              )}
            </div>

            {/* Prev / Next nav */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--c-border)] bg-[var(--c-bg)] shrink-0">
              <button onClick={() => setCurrent((i) => Math.max(0, i - 1))} disabled={current === 0}
                className="flex items-center gap-1 text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 transition-colors tracking-wider">
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>
              <span className="text-[var(--c-fg3)] text-xs tabular-nums">{current + 1} / {questions.length}</span>
              <button onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))} disabled={current === questions.length - 1}
                className="flex items-center gap-1 text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 transition-colors tracking-wider">
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* RIGHT — editor / review / done */}
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">

            {(qs.phase === "coding" || qs.loadingAI || qs.reviewMode !== "ai") ? (
              /* ── CODING / AI loading / manual done ── */
              <>
                <div className="px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg)] text-[var(--c-fg3)] text-xs tracking-widest flex items-center justify-between shrink-0">
                  <span>// EDITOR</span>
                  <span className="text-[var(--c-fg4)]">{EDITOR_LANG_LABEL[q.category]}</span>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <CodeEditor value={qs.code} onChange={(v) => patch(q.id, { code: v })} readOnly={qs.phase !== "coding" || qs.loadingAI} category={q.category} />
                  {qs.loadingAI && (
                    <div className="absolute inset-0 bg-[var(--c-code)]/60 flex items-center justify-center pointer-events-none">
                      <p className="text-[var(--c-cyan)] text-xs tracking-widest animate-pulse pointer-events-none">ANALYZING CODE...</p>
                    </div>
                  )}
                </div>
                {!qs.loadingAI && (
                <div className="px-4 py-2.5 border-t border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-between gap-2 shrink-0">
                  <span className="text-[var(--c-fg3)] text-xs tabular-nums">
                    {qs.code.trim() ? `${qs.code.split("\n").length} ln` : "empty"}
                  </span>
                  {qs.phase === "coding" ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          patch(q.id, { phase: "submitted" });
                          setTimeout(() => handleAIReview(), 0);
                        }}
                        disabled={!qs.code.trim()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-cyan)] text-[var(--c-cyan)] hover:bg-[var(--c-cyan-bg)] disabled:opacity-30 disabled:cursor-not-allowed tracking-wider transition-colors shadow-[0_0_6px_rgba(0,212,255,0.25)]"
                      >
                        <Sparkles className="w-3 h-3" /> AI_REVIEW
                      </button>
                      <span className="text-[var(--c-fg4)] text-xs tracking-widest select-none">// or</span>
                      <div className="flex items-center gap-1.5">
                        {RATINGS.map(({ value, label, cls }) => (
                          <button
                            key={value}
                            onClick={(e) => { patch(q.id, { phase: "submitted", reviewMode: "manual" }); handleRate(value, e); }}
                            disabled={submitting !== null || !qs.code.trim()}
                            className={`px-3 py-1.5 text-xs border tracking-wider disabled:opacity-30 transition-colors ${cls}`}
                          >
                            {submitting === value ? "···" : label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : submitting !== null ? (
                    <span className="text-[var(--c-fg2)] text-xs tracking-widest animate-pulse">SAVING...</span>
                  ) : review ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs tracking-wider" style={{
                        color: review.self_rating === "mastered" ? "var(--c-green)" : review.self_rating === "fuzzy" ? "var(--c-amber)" : "var(--c-red)"
                      }}>
                        STATUS: {ratingLabel[review.self_rating]}
                      </span>
                      <button
                        onClick={handleReset}
                        disabled={resetting}
                        className="flex items-center gap-1 text-xs border border-[var(--c-border)] text-[var(--c-fg3)] px-2 py-1 hover:border-[var(--c-red)] hover:text-[var(--c-red)] hover:bg-[var(--c-red-bg)] disabled:opacity-30 tracking-wider transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        {resetting ? "···" : "RESET"}
                      </button>
                    </div>
                  ) : null}
                </div>
                )}
              </>

            ) : (
              /* ── SUBMITTED: AI review 全屏，header 内联评分按钮 ── */
              <>
                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Header: // AI_REVIEW + inline 评分按钮 */}
                  <div className="px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg)] text-xs tracking-widest flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-2 text-[var(--c-cyan)]">
                      <Sparkles className="w-3 h-3" /> // AI_REVIEW
                    </div>
                    <div className="flex items-center gap-0 divide-x divide-[var(--c-border)]">
                      {!review && (
                        <button
                          onClick={() => patch(q.id, { phase: "coding", reviewMode: null, aiFeedback: null, aiVerdict: null })}
                          className="text-[var(--c-fg3)] hover:text-[var(--c-fg2)] tracking-wider transition-colors px-3 py-1"
                        >
                          ← EDIT
                        </button>
                      )}
                      {review && (
                        <>
                          <span className="px-3 py-1 tracking-wider" style={{
                            color: review.self_rating === "mastered" ? "var(--c-green)" : review.self_rating === "fuzzy" ? "var(--c-amber)" : "var(--c-red)"
                          }}>
                            {ratingLabel[review.self_rating]}
                          </span>
                          <button
                            onClick={handleReset}
                            disabled={resetting}
                            className="flex items-center gap-1 text-[var(--c-fg3)] hover:text-[var(--c-red)] disabled:opacity-30 tracking-wider transition-colors px-3 py-1"
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
                      <p className="text-[var(--c-fg2)] text-xs tracking-widest animate-pulse p-4">ANALYZING CODE...</p>
                    ) : (
                      <>
                        {/* Verdict banner */}
                        {qs.aiVerdict && (() => {
                          const r = RATINGS.find((x) => x.value === qs.aiVerdict);
                          if (!r) return null;
                          const colorVar = r.value === "mastered" ? "var(--c-green)" : r.value === "fuzzy" ? "var(--c-amber)" : "var(--c-red)";
                          const glowVar  = r.value === "mastered" ? "var(--c-green-glow)" : r.value === "fuzzy" ? "var(--c-amber-glow)" : "var(--c-red-glow)";
                          const bgCls    = r.value === "mastered" ? "bg-[var(--c-green-dim)]" : r.value === "fuzzy" ? "bg-[var(--c-amber-bg)]" : "bg-[var(--c-red-bg)]";
                          return (
                            <div
                              className={`border-b border-[var(--c-border)] py-5 flex flex-col items-center justify-center gap-2 ${bgCls}`}
                            >
                              <p className="text-[var(--c-fg3)] text-xs tracking-[0.4em]">// VERDICT</p>
                              <p
                                className="text-3xl sm:text-4xl font-bold tracking-[0.2em] tabular-nums"
                                style={{ color: colorVar, textShadow: `0 0 12px ${glowVar}` }}
                              >
                                {r.label}
                              </p>
                              {!review && (
                                <button
                                  onClick={(e) => handleRate(qs.aiVerdict!, e)}
                                  disabled={submitting !== null}
                                  className="mt-1 px-3 py-1 text-xs border tracking-wider disabled:opacity-30 transition-colors"
                                  style={{ borderColor: colorVar, color: colorVar }}
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
                        {q.answer_hint && (
                          <DiffView reference={q.answer_hint} submitted={qs.code} />
                        )}
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
