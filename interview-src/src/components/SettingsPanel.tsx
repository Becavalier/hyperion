import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSettings, type Lang, type Theme, type Settings } from "@/lib/settings";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: "zh",   label: "中文" },
  { value: "en",   label: "English" },
  { value: "ja",   label: "日本語" },
  { value: "auto", label: "Auto (跟随题目)" },
];

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "dark",   label: "夜晚" },
  { value: "light",  label: "白天" },
  { value: "system", label: "跟随系统" },
];

export function SettingsPanel({ open, onClose }: Props) {
  const { settings, setSettings } = useSettings();
  const [draft, setDraft] = useState<Settings>(settings);

  useEffect(() => { if (open) setDraft(settings); }, [open, settings]);

  if (!open) return null;

  function save() {
    setSettings(draft);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[9100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--c-surface)] border border-[var(--c-border)] p-6 space-y-5 shadow-[0_0_30px_rgba(0,255,65,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-[var(--c-fg3)] text-xs tracking-[0.3em]">// SETTINGS</p>
          <button onClick={onClose} className="text-[var(--c-fg3)] hover:text-[var(--c-red)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Language */}
        <div className="space-y-2">
          <label className="block text-xs text-[var(--c-fg2)] tracking-widest">AI_REVIEW_LANGUAGE</label>
          <div className="grid grid-cols-2 gap-2">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDraft({ ...draft, aiLanguage: opt.value })}
                className={
                  "px-3 py-1.5 text-xs border tracking-wider transition-colors " +
                  (draft.aiLanguage === opt.value
                    ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : "border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)]")
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom System Prompt */}
        <div className="space-y-2">
          <label className="block text-xs text-[var(--c-fg2)] tracking-widest">CUSTOM_SYSTEM_PROMPT</label>
          <textarea
            rows={4}
            value={draft.systemPrompt}
            onChange={(e) => setDraft({ ...draft, systemPrompt: e.target.value })}
            placeholder="e.g. focus on perf optimization / use senior-level critique tone..."
            className="w-full bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-fg1)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--c-green)] placeholder:text-[var(--c-fg3)] transition-colors resize-none"
          />
          <p className="text-[var(--c-fg4)] text-xs">附加到每次 AI review 的 prompt 末尾</p>
        </div>

        {/* Stock Ticker */}
        <div className="space-y-2">
          <label className="block text-xs text-[var(--c-fg2)] tracking-widest">STOCK_TICKER</label>
          <input
            type="text"
            value={draft.stockSymbol}
            onChange={(e) => setDraft({ ...draft, stockSymbol: e.target.value.toUpperCase() })}
            placeholder="e.g. AAPL.US · 700.HK · 09660.HK"
            className="w-full bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-fg1)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--c-green)] placeholder:text-[var(--c-fg3)] transition-colors"
          />
          <p className="text-[var(--c-fg4)] text-xs">留空则不显示 · 数据来源 Longbridge</p>
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <label className="block text-xs text-[var(--c-fg2)] tracking-widest">THEME</label>
          <div className="grid grid-cols-3 gap-2">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDraft({ ...draft, theme: opt.value })}
                className={
                  "px-3 py-1.5 text-xs border tracking-wider transition-colors " +
                  (draft.theme === opt.value
                    ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : "border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-border2)] hover:text-[var(--c-fg1)]")
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sparks toggle */}
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs text-[var(--c-fg2)] tracking-widest">EDITOR_SPARKS</span>
            <input
              type="checkbox"
              checked={draft.sparksEnabled}
              onChange={(e) => setDraft({ ...draft, sparksEnabled: e.target.checked })}
              className="accent-[var(--c-green)]"
            />
          </label>
          <p className="text-[var(--c-fg4)] text-xs">键盘按键时编辑器的火花特效</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs border border-[var(--c-border)] text-[var(--c-fg2)] hover:border-[var(--c-fg1)] hover:text-[var(--c-fg1)] tracking-wider transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={save}
            className="px-4 py-1.5 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] tracking-wider transition-colors"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
