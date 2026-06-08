import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X, Send, Bot, ChevronDown, ChevronRight, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { getToken } from "@/lib/auth";
import { useReviewCtx } from "@/lib/reviewContext";

const STORAGE_KEY = "chat-panel-width";
const DEFAULT_WIDTH = 480;
const MIN_WIDTH = 320;
const MAX_WIDTH = 900;

function ToolPart({ part }: { part: { type: string; toolCallId: string; state: string; input?: unknown; output?: unknown } }) {
  const [open, setOpen] = useState(false);
  const toolName = part.type.replace(/^tool-/, "");
  const isDone = part.state === "output-available";
  return (
    <div className="border border-[var(--c-border)] text-xs font-mono mt-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2 py-1 text-[var(--c-fg3)] hover:text-[var(--c-fg2)] transition-colors text-left"
      >
        {open ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
        {!isDone && <Loader className="w-3 h-3 animate-spin shrink-0" />}
        <span className="text-[var(--c-fg4)]">tool:</span> {toolName}
      </button>
      {open && isDone && (
        <pre className="px-3 py-2 text-[var(--c-fg3)] border-t border-[var(--c-border)] overflow-x-auto whitespace-pre-wrap break-all text-[10px]">
          {JSON.stringify(part.output, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const reviewCtx = useReviewCtx();
  const reviewCtxRef = useRef(reviewCtx);
  useEffect(() => { reviewCtxRef.current = reviewCtx; }, [reviewCtx]);

  const transport = useMemo(() => new DefaultChatTransport({
    api: "/api/chat",
    headers: () => ({ Authorization: `Bearer ${getToken() ?? ""}` }),
    body: () => reviewCtxRef.current ? { reviewContext: reviewCtxRef.current } : {},
  }), []);

  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(saved))) : DEFAULT_WIDTH;
  });
  const dragging = useRef(false);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, window.innerWidth - ev.clientX));
      setWidth(newWidth);
    };
    const onUp = (ev: MouseEvent) => {
      dragging.current = false;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, window.innerWidth - ev.clientX));
      localStorage.setItem(STORAGE_KEY, String(newWidth));
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  const { messages, sendMessage, status, error } = useChat({ transport });
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.dataset.chatOpen = "1";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      delete document.body.dataset.chatOpen;
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      delete document.body.dataset.chatOpen;
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submit() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  }

  return (
    <>
      {/* Overlay — full screen, gradient left→right fades to 0 at chatbox edge */}
      <div
        className={cn("fixed inset-0 z-40 transition-opacity duration-300", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        style={{ background: `linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.52) 30%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.12) 75%, rgba(0,0,0,0) calc(100% - ${width}px))` }}
        onClick={onClose}
      />

      {/* Panel — desktop: slides from right; mobile: slides up from bottom */}
      <div
        className={cn(
          "fixed z-50 flex flex-col bg-[var(--c-panel)] transition-transform duration-300",
          // desktop
          "sm:top-0 sm:right-0 sm:h-full sm:border-l sm:border-[var(--c-border)]",
          open ? "sm:translate-x-0" : "sm:translate-x-full",
          // mobile
          "max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:h-[80vh] max-sm:border-t max-sm:border-[var(--c-border)] max-sm:rounded-t-sm",
          open ? "max-sm:translate-y-0" : "max-sm:translate-y-full",
        )}
        style={{ width: `${width}px` }}
      >
        {/* Drag handle — left edge, desktop only */}
        <div
          onMouseDown={onDragStart}
          className="absolute left-0 top-0 h-full w-1 cursor-col-resize hidden sm:block group"
        >
          <div className="h-full w-px bg-[var(--c-fg4)] group-hover:bg-[var(--c-green)]/40 transition-colors" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--c-border)] shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[var(--c-green)]" />
            <span className="text-[var(--c-fg2)] text-xs tracking-widest">// PREP_AI</span>
            <span className="text-[var(--c-fg4)] text-xs">deepseek-v4-pro</span>
          </div>
          <button onClick={onClose} className="p-1 text-[var(--c-fg3)] hover:text-[var(--c-fg2)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Review context badge */}
        {reviewCtx && (
          <div className="px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-code)] flex items-start gap-3 shrink-0">
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="text-[var(--c-fg3)] text-[10px] tracking-widest">// CTX: DAILY_REVIEW</p>
              <p className="text-[var(--c-fg2)] text-xs truncate font-mono">{reviewCtx.questionTitle}</p>
              <p className="text-[var(--c-fg4)] text-[10px] tabular-nums">
                {reviewCtx.category} · {reviewCtx.codeLanguage}
                {reviewCtx.code.trim() ? ` · ${reviewCtx.code.split("\n").length} ln` : " · empty"}
              </p>
            </div>
            <span className={cn(
              "text-[10px] tracking-widest px-1.5 py-0.5 border shrink-0 mt-0.5 font-mono",
              reviewCtx.phase === "coding"    ? "text-[var(--c-cyan)]/70 border-[var(--c-cyan)]/25" :
              reviewCtx.phase === "submitted" ? "text-[var(--c-amber)]/70 border-[var(--c-amber)]/25" :
                                               "text-[var(--c-green)]/70 border-[var(--c-green)]/25",
            )}>
              {reviewCtx.phase.toUpperCase()}
            </span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.length === 0 && (
            <p className="text-[var(--c-fg4)] text-xs text-center pt-8 tracking-widest">
              // ASK ANYTHING ABOUT YOUR STUDY DATA
            </p>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={cn("space-y-1", msg.role === "user" ? "items-end flex flex-col" : "")}>
              {msg.role === "user" ? (
                <div className="bg-[var(--c-surface)] border border-[var(--c-border)] px-3 py-2 text-xs text-[var(--c-fg1)] font-mono max-w-[85%] whitespace-pre-wrap">
                  {msg.parts.filter((p) => p.type === "text").map((p) => (p as { type: "text"; text: string }).text).join("")}
                </div>
              ) : (
                <div className="space-y-1 max-w-[95%]">
                  {msg.parts.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <div key={i} className="text-xs text-[var(--c-fg2)] leading-relaxed">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              code: ({ children }) => <code className="text-[var(--c-fg1)] font-mono bg-[var(--c-surface)] px-1">{children}</code>,
                              pre: ({ children }) => <pre className="bg-[var(--c-surface)] border border-[var(--c-border)] p-2 overflow-x-auto my-1 text-[var(--c-fg2)]">{children}</pre>,
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mb-2">{children}</ol>,
                              strong: ({ children }) => <strong className="text-[var(--c-fg1)]">{children}</strong>,
                              hr: () => <hr className="border-[var(--c-border)] my-3" />,
                              table: ({ children }) => <div className="overflow-x-auto my-2"><table className="text-xs border-collapse w-full">{children}</table></div>,
                              thead: ({ children }) => <thead className="border-b border-[var(--c-border)]">{children}</thead>,
                              th: ({ children }) => <th className="text-left px-3 py-1.5 text-[var(--c-fg1)] font-mono tracking-wider whitespace-nowrap">{children}</th>,
                              td: ({ children }) => <td className="px-3 py-1 border-b border-[var(--c-border3)] text-[var(--c-fg2)]">{children}</td>,
                              tr: ({ children }) => <tr className="hover:bg-[var(--c-hover)]">{children}</tr>,
                            }}
                          >
                            {(part as { type: "text"; text: string }).text}
                          </ReactMarkdown>
                        </div>
                      );
                    }
                    if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
                      return <ToolPart key={i} part={part as never} />;
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex items-center gap-2 text-[var(--c-fg4)] text-xs font-mono">
              <Loader className="w-3 h-3 animate-spin" /> thinking...
            </div>
          )}

          {error && <p className="text-[var(--c-red)] text-xs font-mono">// ERROR: {error.message}</p>}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--c-border)] px-3 pt-3 pb-2 shrink-0 space-y-2">
          <div className="flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="ask about your study data..."
              className="flex-1 bg-transparent text-xs text-[var(--c-fg1)] font-mono resize-none outline-none placeholder:text-[var(--c-fg4)] leading-relaxed min-h-14 max-h-[120px] overflow-y-auto"
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={submit}
              disabled={isLoading || !input.trim()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs border border-[var(--c-green)]/40 text-[var(--c-green)]/70 hover:border-[var(--c-green)]/70 hover:text-[var(--c-green)] hover:bg-[var(--c-green-bg)] disabled:opacity-20 disabled:cursor-not-allowed tracking-wider transition-colors"
            >
              {isLoading ? <Loader className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
              {isLoading ? "···" : "SEND"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
