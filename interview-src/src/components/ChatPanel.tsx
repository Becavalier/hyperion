import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X, Send, Bot, ChevronDown, ChevronRight, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { getToken } from "@/lib/auth";

const transport = new DefaultChatTransport({
  api: "/api/chat",
  headers: () => ({ Authorization: `Bearer ${getToken() ?? ""}` }),
});

function ToolPart({ part }: { part: { type: string; toolCallId: string; state: string; input?: unknown; output?: unknown } }) {
  const [open, setOpen] = useState(false);
  const toolName = part.type.replace(/^tool-/, "");
  const isDone = part.state === "output-available";
  return (
    <div className="border border-[#1e321e] text-xs font-mono mt-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2 py-1 text-[#2a402a] hover:text-[#4d7a4d] transition-colors text-left"
      >
        {open ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
        {!isDone && <Loader className="w-3 h-3 animate-spin shrink-0" />}
        <span className="text-[#1e4a1e]">tool:</span> {toolName}
      </button>
      {open && isDone && (
        <pre className="px-3 py-2 text-[#2a402a] border-t border-[#1e321e] overflow-x-auto whitespace-pre-wrap break-all text-[10px]">
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

  const { messages, sendMessage, status, error } = useChat({ transport });
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
      {/* Overlay — desktop: gradient from left; mobile: simple dark */}
      <div
        className={cn("fixed z-40 transition-opacity duration-300", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "top-0 left-0 bottom-0 sm:block hidden")}
        style={{ right: "480px", background: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.52) 40%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.22) 80%, rgba(0,0,0,0.06) 92%, rgba(0,0,0,0) 100%)" }}
        onClick={onClose}
      />
      <div
        className={cn("fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 sm:hidden", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        onClick={onClose}
      />

      {/* Panel — desktop: slides from right; mobile: slides up from bottom */}
      <div className={cn(
        "fixed z-50 flex flex-col bg-[#060a06] transition-transform duration-300",
        // desktop
        "sm:top-0 sm:right-0 sm:h-full sm:w-[480px] sm:border-l sm:border-[#1e321e]",
        open ? "sm:translate-x-0" : "sm:translate-x-full",
        // mobile
        "max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:h-[80vh] max-sm:border-t max-sm:border-[#1e321e] max-sm:rounded-t-sm",
        open ? "max-sm:translate-y-0" : "max-sm:translate-y-full",
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e321e] shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#00ff41]" />
            <span className="text-[#4d7a4d] text-xs tracking-widest">// PREP_AI</span>
            <span className="text-[#1e321e] text-xs">deepseek-v4-pro</span>
          </div>
          <button onClick={onClose} className="p-1 text-[#2a402a] hover:text-[#4d7a4d] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.length === 0 && (
            <p className="text-[#1e321e] text-xs text-center pt-8 tracking-widest">
              // ASK ANYTHING ABOUT YOUR STUDY DATA
            </p>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={cn("space-y-1", msg.role === "user" ? "items-end flex flex-col" : "")}>
              {msg.role === "user" ? (
                <div className="bg-[#0c120c] border border-[#1e321e] px-3 py-2 text-xs text-[#b8f5b8] font-mono max-w-[85%] whitespace-pre-wrap">
                  {msg.parts.filter((p) => p.type === "text").map((p) => (p as { type: "text"; text: string }).text).join("")}
                </div>
              ) : (
                <div className="space-y-1 max-w-[95%]">
                  {msg.parts.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <div key={i} className="text-xs text-[#4d7a4d] leading-relaxed">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              code: ({ children }) => <code className="text-[#b8f5b8] font-mono bg-[#0c120c] px-1">{children}</code>,
                              pre: ({ children }) => <pre className="bg-[#0c120c] border border-[#1e321e] p-2 overflow-x-auto my-1 text-[#4d7a4d]">{children}</pre>,
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mb-2">{children}</ol>,
                              strong: ({ children }) => <strong className="text-[#b8f5b8]">{children}</strong>,
                              hr: () => <hr className="border-[#1e321e] my-3" />,
                              table: ({ children }) => <div className="overflow-x-auto my-2"><table className="text-xs border-collapse w-full">{children}</table></div>,
                              thead: ({ children }) => <thead className="border-b border-[#1e321e]">{children}</thead>,
                              th: ({ children }) => <th className="text-left px-3 py-1.5 text-[#b8f5b8] font-mono tracking-wider whitespace-nowrap">{children}</th>,
                              td: ({ children }) => <td className="px-3 py-1 border-b border-[#0e1a0e] text-[#4d7a4d]">{children}</td>,
                              tr: ({ children }) => <tr className="hover:bg-[#0a120a]">{children}</tr>,
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
            <div className="flex items-center gap-2 text-[#1e321e] text-xs font-mono">
              <Loader className="w-3 h-3 animate-spin" /> thinking...
            </div>
          )}

          {error && <p className="text-[#ff3358] text-xs font-mono">// ERROR: {error.message}</p>}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#1e321e] px-3 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#2a402a] text-xs font-mono shrink-0">&gt;</span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="ask about your study data..."
              className="flex-1 bg-transparent text-xs text-[#b8f5b8] font-mono resize-none outline-none placeholder:text-[#1e321e] leading-relaxed"
              style={{ maxHeight: "120px", overflowY: "auto" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
            />
            <button
              onClick={submit}
              disabled={isLoading || !input.trim()}
              className="pb-1.5 text-[#2a402a] hover:text-[#00ff41] disabled:opacity-20 transition-colors shrink-0"
            >
              {isLoading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
