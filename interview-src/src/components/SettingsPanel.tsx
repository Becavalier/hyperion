import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSettings, type Lang, type Settings } from "@/lib/settings";

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
        className="w-full max-w-md bg-[#0c120c] border border-[#1e321e] p-6 space-y-5 shadow-[0_0_30px_rgba(0,255,65,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-[#2a402a] text-xs tracking-[0.3em]">// SETTINGS</p>
          <button onClick={onClose} className="text-[#2a402a] hover:text-[#ff3358] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Language */}
        <div className="space-y-2">
          <label className="block text-xs text-[#4d7a4d] tracking-widest">AI_REVIEW_LANGUAGE</label>
          <div className="grid grid-cols-2 gap-2">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDraft({ ...draft, aiLanguage: opt.value })}
                className={
                  "px-3 py-1.5 text-xs border tracking-wider transition-colors " +
                  (draft.aiLanguage === opt.value
                    ? "border-[#00ff41] text-[#00ff41] bg-[#001a00]"
                    : "border-[#1e321e] text-[#4d7a4d] hover:border-[#2a402a] hover:text-[#b8f5b8]")
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom System Prompt */}
        <div className="space-y-2">
          <label className="block text-xs text-[#4d7a4d] tracking-widest">CUSTOM_SYSTEM_PROMPT</label>
          <textarea
            rows={4}
            value={draft.systemPrompt}
            onChange={(e) => setDraft({ ...draft, systemPrompt: e.target.value })}
            placeholder="e.g. focus on perf optimization / use senior-level critique tone..."
            className="w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] placeholder:text-[#2a402a] transition-colors resize-none"
          />
          <p className="text-[#1e321e] text-xs">附加到每次 AI review 的 prompt 末尾</p>
        </div>

        {/* Sparks toggle */}
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs text-[#4d7a4d] tracking-widest">EDITOR_SPARKS</span>
            <input
              type="checkbox"
              checked={draft.sparksEnabled}
              onChange={(e) => setDraft({ ...draft, sparksEnabled: e.target.checked })}
              className="accent-[#00ff41]"
            />
          </label>
          <p className="text-[#1e321e] text-xs">键盘按键时编辑器的火花特效</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs border border-[#1e321e] text-[#4d7a4d] hover:border-[#b8f5b8] hover:text-[#b8f5b8] tracking-wider transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={save}
            className="px-4 py-1.5 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] tracking-wider transition-colors"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
