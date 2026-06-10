import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, X, Check, Search, Zap } from "lucide-react";
import { getEnglishEntries, createEnglishEntry, updateEnglishEntry, deleteEnglishEntry } from "@/lib/api";
import type { EnglishEntry } from "@/lib/api";

const LIMIT = 40;

interface FormState { content: string; phonetic: string; notes: string; proficiency: number; }
const BLANK_FORM: FormState = { content: "", phonetic: "", notes: "", proficiency: 0 };

function ProficiencyBar({ value }: { value: number | undefined }) {
  const v = value ?? 0;
  const pct = (v / 10) * 100;
  const color = v >= 8 ? "#00ff41" : v >= 4 ? "#ffb300" : "#4d7a4d";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1 bg-[var(--c-fg4)] overflow-hidden">
        <div style={{ width: `${pct}%`, background: color, height: "100%" }} />
      </div>
      <span className="text-xs tabular-nums text-[var(--c-fg2)]">{v}</span>
    </div>
  );
}

function EntryRow({
  entry,
  onSave,
  onDelete,
}: {
  entry: EnglishEntry;
  onSave: (id: string, body: Partial<FormState>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState>({
    content: entry.content,
    phonetic: entry.phonetic ?? "",
    notes: entry.notes ?? "",
    proficiency: entry.proficiency,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  async function handleSave() {
    if (!form.content.trim()) return;
    setSaving(true);
    try { await onSave(entry.id, form); setEditing(false); } finally { setSaving(false); }
  }

  async function handleDelete() {
    setDeleting(true);
    try { await onDelete(entry.id); } finally { setDeleting(false); }
  }

  const contentLines = entry.content.split("\n");
  const phoneticLines = (entry.phonetic ?? "").split("\n");
  const notesLines = (entry.notes ?? "").split("\n");

  if (editing) {
    return (
      <div className="border border-[var(--c-green)]/30 bg-[var(--c-code)] p-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <textarea
            ref={ref}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={Math.max(2, contentLines.length)}
            placeholder={"内容（多行用换行分隔）"}
            className="w-full bg-transparent text-[var(--c-fg1)] text-sm font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
          />
          <textarea
            value={form.phonetic}
            onChange={(e) => setForm((f) => ({ ...f, phonetic: e.target.value }))}
            rows={Math.max(2, contentLines.length)}
            placeholder={"音标（逐行对应内容）"}
            className="w-full bg-transparent text-[var(--c-fg2)] text-xs font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={Math.max(2, contentLines.length)}
            placeholder={"备注（逐行对应内容）"}
            className="w-full bg-transparent text-[var(--c-fg2)] text-xs font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
          />
          <div className="flex flex-col gap-1 justify-center">
            <span className="text-[var(--c-fg3)] text-xs tracking-widest">PROFICIENCY</span>
            <input
              type="number"
              min={0}
              max={10}
              value={form.proficiency}
              onChange={(e) => setForm((f) => ({ ...f, proficiency: Math.min(10, Math.max(0, parseInt(e.target.value) || 0)) }))}
              className="w-16 bg-transparent text-[var(--c-amber)] text-xs font-mono outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-amber)]/50 tabular-nums"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-xs text-[var(--c-fg3)] hover:text-[var(--c-fg2)] tracking-wider transition-colors px-2 py-1">
            <X className="w-3 h-3" /> CANCEL
          </button>
          <button onClick={handleSave} disabled={saving || !form.content.trim()} className="flex items-center gap-1 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors px-2 py-1">
            <Check className="w-3 h-3" /> {saving ? "···" : "SAVE"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-[var(--c-border)] hover:bg-[var(--c-bg)] transition-colors py-1.5">
      {contentLines.map((line, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_120px_84px] gap-x-4 px-4 py-0.5 items-center">
          <p className="text-xs text-[var(--c-fg1)] font-mono break-words">{line}</p>
          <p className="text-xs text-[var(--c-fg2)] font-mono">
            {phoneticLines[i] ?? ""}
          </p>
          <p className="text-xs text-[var(--c-fg2)] leading-relaxed break-words">
            {notesLines[i] ?? ""}
          </p>
          <div className="hidden sm:block">{i === 0 && <ProficiencyBar value={entry.proficiency} />}</div>
          <div className="hidden sm:flex gap-1">
            {i === 0 && (
              <>
                <button onClick={() => setEditing(true)} className="p-1.5 text-[var(--c-fg3)] hover:text-[var(--c-fg2)] transition-colors">
                  <Pencil className="w-3 h-3" />
                </button>
                <button onClick={handleDelete} disabled={deleting} className="p-1.5 text-[var(--c-fg3)] hover:text-[var(--c-red)] disabled:opacity-30 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListHeader() {
  return (
    <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_120px_100px] gap-x-4 px-4 py-1.5 border-b border-[var(--c-border)] bg-[var(--c-bg)]">
      <span className="text-[var(--c-fg3)] text-xs tracking-widest">// CONTENT</span>
      <span className="text-[var(--c-fg3)] text-xs tracking-widest">// PHONETIC</span>
      <span className="text-[var(--c-fg3)] text-xs tracking-widest">// NOTES</span>
      <span className="text-[var(--c-fg3)] text-xs tracking-widest">// PROF</span>
      <span className="text-[var(--c-fg3)] text-xs tracking-widest">// ACTIONS</span>
    </div>
  );
}

export default function English() {
  const [entries, setEntries] = useState<EnglishEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState<FormState>(BLANK_FORM);
  const [saving, setSaving] = useState(false);
  const newRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { if (adding) newRef.current?.focus(); }, [adding]);

  useEffect(() => {
    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setLoading(true);
      getEnglishEntries({ search: searchInput || undefined, page, limit: LIMIT }, ctrl.signal)
        .then(({ entries: e, total: t }) => { setEntries(e); setTotal(t); })
        .catch((err) => { if (err.name === "AbortError") return; })
        .finally(() => { if (!ctrl.signal.aborted) setLoading(false); });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, page]);

  async function handleCreate() {
    if (!newForm.content.trim()) return;
    setSaving(true);
    try {
      const { entry } = await createEnglishEntry({ content: newForm.content.trim(), phonetic: newForm.phonetic.trim() || undefined, notes: newForm.notes.trim() || undefined });
      setEntries((prev) => [entry, ...prev]);
      setTotal((t) => t + 1);
      setNewForm(BLANK_FORM);
      setAdding(false);
    } finally { setSaving(false); }
  }

  async function handleSave(id: string, body: Partial<FormState>) {
    const { entry } = await updateEnglishEntry(id, body);
    setEntries((prev) => prev.map((e) => e.id === id ? entry : e));
  }

  async function handleDelete(id: string) {
    await deleteEnglishEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setTotal((t) => t - 1);
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[var(--c-fg3)] text-xs tracking-widest">// ENGLISH_BANK</p>
          <p className="text-[var(--c-fg2)] text-xs mt-0.5 tabular-nums">
            <span className="text-[var(--c-green)]">{total}</span>
            <span className="text-[var(--c-fg3)]"> entries</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/english/train"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-cyan)]/30 text-[var(--c-cyan)]/60 hover:bg-[var(--c-cyan-bg)] hover:border-[var(--c-cyan)]/50 tracking-wider transition-colors"
          >
            <Zap className="w-3 h-3" /> TRAIN
          </Link>
          <div className="flex items-center gap-2 border border-[var(--c-border)] px-2 py-1 bg-[var(--c-code)]">
            <Search className="w-3 h-3 text-[var(--c-fg3)] shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
              placeholder="search..."
              className="bg-transparent text-xs text-[var(--c-fg1)] font-mono outline-none w-36 placeholder:text-[var(--c-fg4)]"
            />
            {searchInput && (
              <button onClick={() => { setSearchInput(""); setPage(1); }}>
                <X className="w-3 h-3 text-[var(--c-fg3)] hover:text-[var(--c-fg2)]" />
              </button>
            )}
          </div>
          <button
            onClick={() => { setAdding(true); setNewForm(BLANK_FORM); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] tracking-wider transition-colors shadow-[0_0_6px_rgba(0,255,65,0.2)]"
          >
            <Plus className="w-3 h-3" /> ADD
          </button>
        </div>
      </div>

      {/* Add form */}
      {adding && (
        <div className="border border-[var(--c-green)]/30 bg-[var(--c-code)] p-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <textarea
              ref={newRef}
              value={newForm.content}
              onChange={(e) => setNewForm((f) => ({ ...f, content: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCreate(); }}
              rows={2}
              placeholder="内容"
              className="w-full bg-transparent text-[var(--c-fg1)] text-sm font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
            />
            <textarea
              value={newForm.phonetic}
              onChange={(e) => setNewForm((f) => ({ ...f, phonetic: e.target.value }))}
              rows={Math.max(2, newForm.content.split("\n").length)}
              placeholder={"音标（逐行对应内容）"}
              className="w-full bg-transparent text-[var(--c-fg2)] text-xs font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
            />
            <textarea
              value={newForm.notes}
              onChange={(e) => setNewForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder={"备注（逐行对应内容）"}
              className="w-full bg-transparent text-[var(--c-fg2)] text-xs font-mono resize-none outline-none border border-[var(--c-border)] px-2 py-1.5 focus:border-[var(--c-green)]/50 placeholder:text-[var(--c-fg4)]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="flex items-center gap-1 text-xs text-[var(--c-fg3)] hover:text-[var(--c-fg2)] tracking-wider transition-colors px-2 py-1">
              <X className="w-3 h-3" /> CANCEL
            </button>
            <button onClick={handleCreate} disabled={saving || !newForm.content.trim()} className="flex items-center gap-1 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors px-2 py-1">
              <Plus className="w-3 h-3" /> {saving ? "···" : "ADD"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-[var(--c-fg3)] text-xs tracking-widest animate-pulse">LOADING...</p>
      ) : entries.length === 0 ? (
        <p className="text-[var(--c-fg4)] text-xs tracking-widest py-8 text-center">
          {searchInput ? "// NO_RESULTS" : "// EMPTY — ADD YOUR FIRST ENTRY"}
        </p>
      ) : (
        <div className="border-t border-[var(--c-border)] mx-4">
          <ListHeader />
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onSave={handleSave} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-2 flex-wrap">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 tracking-wider transition-colors px-2">
            ←
          </button>

          {(() => {
            const pages: (number | "…")[] = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              if (page > 3) pages.push("…");
              for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
              if (page < totalPages - 2) pages.push("…");
              pages.push(totalPages);
            }
            return pages.map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="text-[var(--c-fg4)] text-xs px-1">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`text-xs tabular-nums px-2 py-0.5 transition-colors ${
                    p === page
                      ? "text-[var(--c-green)] border border-[var(--c-green)]/30 bg-[var(--c-green-bg)]"
                      : "text-[var(--c-fg3)] hover:text-[var(--c-fg2)]"
                  }`}
                >
                  {p}
                </button>
              )
            );
          })()}

          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="text-xs text-[var(--c-fg2)] hover:text-[var(--c-fg1)] disabled:opacity-20 tracking-wider transition-colors px-2">
            →
          </button>
        </div>
      )}
    </div>
  );
}
