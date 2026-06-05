import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Search } from "lucide-react";
import { getEnglishEntries, createEnglishEntry, updateEnglishEntry, deleteEnglishEntry } from "@/lib/api";
import type { EnglishEntry } from "@/lib/api";

const LIMIT = 40;

interface FormState { content: string; phonetic: string; notes: string; }
const BLANK_FORM: FormState = { content: "", phonetic: "", notes: "" };

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
  const [form, setForm] = useState<FormState>({ content: entry.content, phonetic: entry.phonetic ?? "", notes: entry.notes ?? "" });
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
  const notesLines = (entry.notes ?? "").split("\n");

  if (editing) {
    return (
      <div className="border border-[#00ff41]/30 bg-[#050905] p-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <textarea
            ref={ref}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={Math.max(2, contentLines.length)}
            placeholder={"内容（多行用换行分隔）"}
            className="w-full bg-transparent text-[#b8f5b8] text-sm font-mono resize-none outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
          />
          <input
            value={form.phonetic}
            onChange={(e) => setForm((f) => ({ ...f, phonetic: e.target.value }))}
            placeholder="音标"
            className="bg-transparent text-[#4d7a4d] text-xs font-mono outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={Math.max(2, contentLines.length)}
            placeholder={"备注（逐行对应内容）"}
            className="w-full bg-transparent text-[#4d7a4d] text-xs font-mono resize-none outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-xs text-[#2a402a] hover:text-[#4d7a4d] tracking-wider transition-colors px-2 py-1">
            <X className="w-3 h-3" /> CANCEL
          </button>
          <button onClick={handleSave} disabled={saving || !form.content.trim()} className="flex items-center gap-1 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors px-2 py-1">
            <Check className="w-3 h-3" /> {saving ? "···" : "SAVE"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group border-b border-[#1e321e] hover:bg-[#080c08] transition-colors py-1.5">
      {contentLines.map((line, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 px-4 py-0.5 items-baseline">
          <p className="text-xs text-[#b8f5b8] font-mono break-words">{line}</p>
          <p className="text-xs text-[#4d7a4d] font-mono">
            {i === 0 && entry.phonetic ? entry.phonetic : ""}
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-[#4d7a4d] leading-relaxed break-words flex-1">
              {notesLines[i] ?? ""}
            </p>
            {i === contentLines.length - 1 && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => setEditing(true)} className="p-1.5 text-[#2a402a] hover:text-[#4d7a4d] transition-colors">
                  <Pencil className="w-3 h-3" />
                </button>
                <button onClick={handleDelete} disabled={deleting} className="p-1.5 text-[#2a402a] hover:text-[#ff3358] disabled:opacity-30 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Column header row
function ListHeader() {
  return (
    <div className="hidden sm:grid grid-cols-3 gap-x-4 px-4 py-1.5 border-b border-[#1e321e] bg-[#080c08]">
      <span className="text-[#2a402a] text-xs tracking-widest">// CONTENT</span>
      <span className="text-[#2a402a] text-xs tracking-widest">// PHONETIC</span>
      <span className="text-[#2a402a] text-xs tracking-widest">// NOTES</span>
    </div>
  );
}

export default function English() {
  const [entries, setEntries] = useState<EnglishEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState<FormState>(BLANK_FORM);
  const [saving, setSaving] = useState(false);
  const newRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (adding) newRef.current?.focus(); }, [adding]);

  useEffect(() => {
    setLoading(true);
    getEnglishEntries({ search: search || undefined, page, limit: LIMIT })
      .then(({ entries: e, total: t }) => { setEntries(e); setTotal(t); })
      .finally(() => setLoading(false));
  }, [search, page]);

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
          <p className="text-[#2a402a] text-xs tracking-widest">// ENGLISH_BANK</p>
          <p className="text-[#4d7a4d] text-xs mt-0.5 tabular-nums">
            <span className="text-[#00ff41]">{total}</span>
            <span className="text-[#2a402a]"> entries</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center gap-2 border border-[#1e321e] px-2 py-1 bg-[#050905]">
            <Search className="w-3 h-3 text-[#2a402a] shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setSearch(searchInput); setPage(1); } }}
              placeholder="search..."
              className="bg-transparent text-xs text-[#b8f5b8] font-mono outline-none w-36 placeholder:text-[#1e321e]"
            />
            {searchInput && (
              <button onClick={() => { setSearchInput(""); setSearch(""); setPage(1); }}>
                <X className="w-3 h-3 text-[#2a402a] hover:text-[#4d7a4d]" />
              </button>
            )}
          </div>
          <button
            onClick={() => { setAdding(true); setNewForm(BLANK_FORM); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] tracking-wider transition-colors"
            style={{ boxShadow: "0 0 6px rgba(0,255,65,0.2)" }}
          >
            <Plus className="w-3 h-3" /> ADD
          </button>
        </div>
      </div>

      {/* Add form */}
      {adding && (
        <div className="border border-[#00ff41]/30 bg-[#050905] p-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <textarea
              ref={newRef}
              value={newForm.content}
              onChange={(e) => setNewForm((f) => ({ ...f, content: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCreate(); }}
              rows={2}
              placeholder="内容"
              className="w-full bg-transparent text-[#b8f5b8] text-sm font-mono resize-none outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
            />
            <input
              value={newForm.phonetic}
              onChange={(e) => setNewForm((f) => ({ ...f, phonetic: e.target.value }))}
              placeholder="音标"
              className="bg-transparent text-[#4d7a4d] text-xs font-mono outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
            />
            <textarea
              value={newForm.notes}
              onChange={(e) => setNewForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder={"备注（逐行对应内容）"}
              className="w-full bg-transparent text-[#4d7a4d] text-xs font-mono resize-none outline-none border border-[#1e321e] px-2 py-1.5 focus:border-[#00ff41]/50 placeholder:text-[#1e321e]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="flex items-center gap-1 text-xs text-[#2a402a] hover:text-[#4d7a4d] tracking-wider transition-colors px-2 py-1">
              <X className="w-3 h-3" /> CANCEL
            </button>
            <button onClick={handleCreate} disabled={saving || !newForm.content.trim()} className="flex items-center gap-1 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors px-2 py-1">
              <Plus className="w-3 h-3" /> {saving ? "···" : "ADD"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-[#2a402a] text-xs tracking-widest animate-pulse">LOADING...</p>
      ) : entries.length === 0 ? (
        <p className="text-[#1e321e] text-xs tracking-widest py-8 text-center">
          {search ? "// NO_RESULTS" : "// EMPTY — ADD YOUR FIRST ENTRY"}
        </p>
      ) : (
        <div className="border-t border-[#1e321e]">
          <ListHeader />
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onSave={handleSave} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 tracking-wider transition-colors">
            ← PREV
          </button>
          <span className="text-[#2a402a] text-xs tabular-nums">{page} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="text-xs text-[#4d7a4d] hover:text-[#b8f5b8] disabled:opacity-20 tracking-wider transition-colors">
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
