import { createContext, useContext } from "react";

export type Lang = "zh" | "en" | "ja" | "auto";

export interface Settings {
  aiLanguage: Lang;
  systemPrompt: string;
  sparksEnabled: boolean;
  stockSymbol: string;
}

export const DEFAULT_SETTINGS: Settings = {
  aiLanguage: "zh",
  systemPrompt: "",
  sparksEnabled: true,
  stockSymbol: "",
};

const STORAGE_KEY = "prep.settings";

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface Ctx {
  settings: Settings;
  setSettings: (s: Settings) => void;
}

export const SettingsContext = createContext<Ctx>({
  settings: DEFAULT_SETTINGS,
  setSettings: () => {},
});

export function useSettings() {
  return useContext(SettingsContext);
}
