import { useEffect, useState, useRef } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion, resetQuestionProficiency } from "@/lib/api";
import { cn, categoryLabel, difficultyLabel, difficultyColor } from "@/lib/utils";
import type { Question, Category, Difficulty } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CATEGORIES: Category[] = ["frontend", "algorithm", "system-design", "quiz"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

interface FormData {
  title: string;
  content: string;
  category: Category;
  difficulty: Difficulty;
  tags: string;
  answer_hint: string;
}

const EMPTY_FORM: FormData = {
  title: "",
  content: "",
  category: "frontend",
  difficulty: "medium",
  tags: "",
  answer_hint: "",
};

const inputCls = "w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] placeholder:text-[#2a402a] transition-colors resize-none";
const selectCls = "w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] transition-colors";

interface QuestionFormProps {
  initial?: FormData;
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

function QuestionForm({ initial = EMPTY_FORM, onSave, onCancel }: QuestionFormProps) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  }

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <form onSubmit={handleSubmit} className="bg-[#0c120c] border border-[#00ff41] p-4 space-y-3">
      <p className="text-[#2a402a] text-xs tracking-widest">// QUESTION_EDITOR</p>
      <div>
        <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">TITLE *</label>
        <input
          required
          placeholder="e.g. Explain the JavaScript event loop"
          className={inputCls}
          {...field("title")}
        />
      </div>
      <div>
        <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">DESCRIPTION</label>
        <textarea
          rows={3}
          placeholder="Optional — add context or constraints..."
          className={inputCls}
          {...field("content")}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">CATEGORY</label>
          <select className={selectCls} {...field("category")}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel[c]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">DIFFICULTY</label>
          <select className={selectCls} {...field("difficulty")}>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{difficultyLabel[d]}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">TAGS (comma separated)</label>
        <input
          placeholder="e.g. closure, prototype"
          className={inputCls}
          {...field("tags")}
        />
      </div>
      <div>
        <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">HINT (optional)</label>
        <textarea
          rows={3}
          placeholder="Leave blank to generate via AI during review..."
          className={inputCls}
          {...field("answer_hint")}
        />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-xs border border-[#1e321e] text-[#4d7a4d] hover:border-[#b8f5b8] hover:text-[#b8f5b8] tracking-wider transition-colors"
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-1.5 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors"
        >
          {saving ? "SAVING..." : "SAVE"}
        </button>
      </div>
    </form>
  );
}

const PAGE_SIZE = 15;

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Category | "">("");
  const [filterDiff, setFilterDiff] = useState<Difficulty | "">("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [resetTarget, setResetTarget] = useState<Question | null>(null);
  const [resetting, setResetting] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  // cancellation token for in-flight requests
  const cancelRef = useRef(0);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [filterCat, filterDiff, search]);

  // Fetch whenever page or filters change
  useEffect(() => {
    const token = ++cancelRef.current;
    setLoading(true);
    getQuestions({
      ...(filterCat ? { category: filterCat } : {}),
      ...(filterDiff ? { difficulty: filterDiff } : {}),
      ...(search ? { search } : {}),
      page,
      limit: PAGE_SIZE,
    }).then((res) => {
      if (token !== cancelRef.current) return;
      setQuestions(res.questions);
      setTotal(res.total ?? res.questions.length);
    }).finally(() => {
      if (token === cancelRef.current) setLoading(false);
    });
  }, [filterCat, filterDiff, search, page]);

  function reload(p = page) {
    setPage(p);
    // Force re-run by bumping token; effect fires because page may change
    // If page didn't change, nudge it (go to p explicitly triggers setState no-op, so bump cancel)
    cancelRef.current++; // causes current in-flight to be ignored
    setLoading(true);
    getQuestions({
      ...(filterCat ? { category: filterCat } : {}),
      ...(filterDiff ? { difficulty: filterDiff } : {}),
      ...(search ? { search } : {}),
      page: p,
      limit: PAGE_SIZE,
    }).then((res) => {
      setQuestions(res.questions);
      setTotal(res.total ?? res.questions.length);
    }).finally(() => setLoading(false));
  }

  async function handleCreate(form: FormData) {
    await createQuestion({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      answer_hint: form.answer_hint || null,
      content: form.content,
    });
    setShowForm(false);
    reload(page);
  }

  async function handleUpdate(id: string, form: FormData) {
    await updateQuestion(id, {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      answer_hint: form.answer_hint || null,
    });
    setEditingId(null);
    reload(page);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this question?")) return;
    await deleteQuestion(id);
    const newPage = questions.length === 1 && page > 1 ? page - 1 : page;
    reload(newPage);
  }

  function requestReset(q: Question) {
    setResetTarget(q);
  }

  async function confirmReset() {
    if (!resetTarget) return;
    setResetting(true);
    try {
      await resetQuestionProficiency(resetTarget.id);
      setResetTarget(null);
      reload(page);
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="xl:grid xl:grid-cols-[220px_1fr] xl:gap-6 space-y-4 xl:space-y-0">

      {/* Sidebar / filter panel */}
      <div className="xl:sticky xl:top-16 xl:self-start space-y-3">
        <div className="flex items-center justify-between xl:block xl:space-y-3">
          <p className="text-[#2a402a] text-xs tracking-widest">// QUESTION_BANK</p>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#00ff41] text-[#00ff41] text-xs tracking-wider hover:bg-[#001a00] transition-colors xl:w-full xl:justify-center"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD_QUESTION
          </button>
        </div>

        {/* Filters — horizontal on mobile/tablet, vertical on xl */}
        <div className="flex gap-2 flex-wrap xl:flex-col xl:gap-2">
          <div className="relative flex-1 min-w-48 xl:min-w-0">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#2a402a]" />
            <input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] placeholder:text-[#2a402a] transition-colors"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as Category | "")}
            className="bg-[#080c08] border border-[#1e321e] text-[#4d7a4d] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] transition-colors xl:w-full"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel[c]}</option>)}
        </select>
          <select
            value={filterDiff}
            onChange={(e) => setFilterDiff(e.target.value as Difficulty | "")}
            className="bg-[#080c08] border border-[#1e321e] text-[#4d7a4d] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] transition-colors xl:w-full"
          >
            <option value="">All Levels</option>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{difficultyLabel[d]}</option>)}
          </select>

          {/* Active filter badges */}
          {(filterCat || filterDiff || search) && (
            <button
              onClick={() => { setFilterCat(""); setFilterDiff(""); setSearch(""); }}
              className="text-xs text-[#ff3358] border border-[#ff3358] px-2 py-1 hover:bg-[#120004] transition-colors tracking-wider xl:w-full"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Record count + page info */}
        <div className="hidden xl:block space-y-1">
          <p className="text-[#2a402a] text-xs tabular-nums tracking-widest">{total} record(s)</p>
          {totalPages > 1 && (
            <p className="text-[#1e321e] text-xs tabular-nums">
              pg {page}/{totalPages}
            </p>
          )}
        </div>
      </div>

      {/* Main content column */}
      <div className="space-y-3 min-w-0">
        {showForm && (
          <QuestionForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
        )}

        <p className="text-[#2a402a] text-xs tabular-nums tracking-widest xl:hidden">
          {total} record(s) found
        </p>

        {loading ? (
          <div className="text-center py-8 text-[#4d7a4d] text-xs tracking-widest">LOADING...</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 text-[#2a402a] text-xs tracking-widest">
            NO_RECORDS — Click ADD_QUESTION to begin
          </div>
        ) : (
          <div className="space-y-1.5">
            {questions.map((q) =>
              editingId === q.id ? (
                <QuestionForm
                  key={q.id}
                  initial={{
                    title: q.title,
                    content: q.content,
                    category: q.category,
                    difficulty: q.difficulty,
                    tags: q.tags.join(", "),
                    answer_hint: q.answer_hint ?? "",
                  }}
                  onSave={(form) => handleUpdate(q.id, form)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div key={q.id}
                  className="bg-[#0c120c] border border-[#1e321e] px-4 py-3 flex items-start justify-between gap-3 hover:border-[#2a402a] transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("text-xs px-2 py-0.5 font-medium tracking-wider", difficultyColor[q.difficulty])}>
                        [{difficultyLabel[q.difficulty].toUpperCase()}]
                      </span>
                      <span className="text-xs text-[#4d7a4d] tracking-wider">{categoryLabel[q.category]}</span>
                      {q.tags.map((t) => (
                        <span key={t} className="text-xs text-[#2a402a] bg-[#080c08] border border-[#1e321e] px-1.5 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[#b8f5b8] truncate">{q.title}</p>
                    {q.content && (
                      <p className="text-xs text-[#4d7a4d] line-clamp-2 xl:line-clamp-1">{q.content}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs tabular-nums tracking-wider"
                      style={{ color: q.proficiency > 10 ? "#00ff41" : q.proficiency > 0 ? "#4d7a4d" : "#2a402a" }}
                      title={
                        q.proficiency > 10
                          ? "Graduated"
                          : q.proficiency > 0
                          ? `Proficiency ${q.proficiency} · next ${q.next_review_date ?? "—"}`
                          : "Not yet reviewed"
                      }
                    >
                      L{q.proficiency > 10 ? "★" : q.proficiency}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => requestReset(q)}
                        title="Reset proficiency to 0"
                        className="p-1.5 text-[#2a402a] hover:text-[#ffb300] hover:bg-[#120d00] transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingId(q.id)}
                        className="p-1.5 text-[#2a402a] hover:text-[#00ff41] hover:bg-[#001a00] transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(q.id)}
                        className="p-1.5 text-[#2a402a] hover:text-[#ff3358] hover:bg-[#120004] transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 border-t border-[#1e321e]">
            <span className="text-[#2a402a] text-xs tabular-nums tracking-widest">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-2 py-1.5 text-xs border border-[#1e321e] text-[#4d7a4d] hover:border-[#2a402a] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider"
              >
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>

              {/* Page number buttons — show up to 5 around current page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "…")[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-[#2a402a] text-xs">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={cn(
                        "min-w-[2rem] px-2 py-1.5 text-xs border tracking-wider transition-colors",
                        p === page
                          ? "border-[#00ff41] text-[#00ff41] bg-[#001a00]"
                          : "border-[#1e321e] text-[#4d7a4d] hover:border-[#2a402a] hover:text-[#b8f5b8]"
                      )}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-2 py-1.5 text-xs border border-[#1e321e] text-[#4d7a4d] hover:border-[#2a402a] hover:text-[#b8f5b8] disabled:opacity-20 transition-colors tracking-wider"
              >
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset proficiency confirmation */}
      <AlertDialog open={resetTarget !== null} onOpenChange={(o) => !o && setResetTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className="text-[#2a402a] text-xs tracking-[0.3em]">// CONFIRM_RESET</p>
            <AlertDialogTitle>RESET_PROFICIENCY</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  This will wipe the spaced-repetition state for one question. Existing review
                  history in past dailies is kept.
                </p>
                {resetTarget && (
                  <div className="bg-[#080c08] border border-[#1e321e] p-3 space-y-1.5">
                    <p className="text-[#b8f5b8] truncate">{resetTarget.title}</p>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
                      <span className="text-[#2a402a] tracking-widest">PROFICIENCY</span>
                      <span className="text-[#ffb300] tabular-nums">
                        {resetTarget.proficiency}
                        <span className="text-[#2a402a] mx-1.5">→</span>
                        <span className="text-[#4d7a4d]">0</span>
                      </span>
                      <span className="text-[#2a402a] tracking-widest">NEXT_REVIEW</span>
                      <span className="text-[#4d7a4d] tabular-nums">
                        {resetTarget.next_review_date ?? "—"}
                        <span className="text-[#2a402a] mx-1.5">→</span>
                        <span className="text-[#4d7a4d]">cleared</span>
                      </span>
                      <span className="text-[#2a402a] tracking-widest">LAST_REVIEWED</span>
                      <span className="text-[#4d7a4d] tabular-nums">
                        {resetTarget.last_reviewed_at ? resetTarget.last_reviewed_at.slice(0, 10) : "—"}
                        <span className="text-[#2a402a] mx-1.5">→</span>
                        <span className="text-[#4d7a4d]">cleared</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={resetting}>CANCEL</AlertDialogCancel>
            <AlertDialogAction
              disabled={resetting}
              onClick={(e) => { e.preventDefault(); confirmReset(); }}
            >
              {resetting ? "RESETTING..." : "CONFIRM_RESET ▶"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
