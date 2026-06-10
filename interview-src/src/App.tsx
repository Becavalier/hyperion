import { useEffect, useRef, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Calendar, Database, BookMarked, Languages, LogOut, Settings as SettingsIcon, Bot } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Today from "@/pages/Today";
import Plan from "@/pages/Plan";
import Questions from "@/pages/Questions";
import English from "@/pages/English";
import EnglishTrain from "@/pages/EnglishTrain";
import { cn } from "@/lib/utils";
import { AuthGate } from "@/components/AuthGate";
import { SettingsPanel } from "@/components/SettingsPanel";
import { logout, getToken } from "@/lib/auth";
import { SettingsContext, loadSettings, saveSettings, useSettings, type Settings } from "@/lib/settings";
import { ChatPanel } from "@/components/ChatPanel";
import { ReviewContextProvider } from "@/lib/reviewContext";
import { SpeedInsights } from "@vercel/speed-insights/react";

function Sparkline({ points, color }: { points: [number, number][]; color: string }) {
  if (points.length < 2) return null;
  const W = 64, H = 18, pad = 1;
  // handle both [ts, price] tuples and legacy number[] format
  const isTuple = Array.isArray(points[0]);
  const prices = isTuple ? (points as [number, number][]).map(([, p]) => p) : (points as unknown as number[]);
  const ts = isTuple ? (points as [number, number][]).map(([t]) => t) : prices.map((_, i) => i);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const minT = Math.min(...ts), maxT = Math.max(...ts);
  const rangeP = maxP - minP || 1;
  const rangeT = maxT - minT || 1;
  const xs = ts.map(t => pad + ((t - minT) / rangeT) * (W - pad * 2));
  const ys = prices.map(p => H - pad - ((p - minP) / rangeP) * (H - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} className="opacity-80 shrink-0">
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function StockTicker() {
  const { settings } = useSettings();
  const [quote, setQuote] = useState<{ price: number; change: number; changePercent: number; prevClose: number; lines: [number, number][] } | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!settings.stockSymbol) { setQuote(null); setErr(false); return; }

    const token = getToken();
    const params = new URLSearchParams({ symbol: settings.stockSymbol });
    if (token) params.set("token", token);
    const es = new EventSource(`/api/ai?action=stock&${params}`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "snapshot") {
          setQuote({ price: data.price, change: data.change, changePercent: data.changePercent, prevClose: data.prevClose, lines: data.lines });
          setErr(false);
        } else if (data.type === "quote") {
          setQuote((prev) => {
            if (!prev) return prev;
            const cutoff = Date.now() - 24 * 60 * 60 * 1000;
            const lines: [number, number][] = [...prev.lines.filter(([t]) => t >= cutoff), [data.ts, data.price]];
            return { ...prev, price: data.price, change: data.change, changePercent: data.changePercent, lines };
          });
        }
      } catch {}
    };
    es.onerror = () => setErr(true);

    return () => es.close();
  }, [settings.stockSymbol]);

  if (!settings.stockSymbol) return null;

  const ticker = settings.stockSymbol.split(".")[0];

  if (err || !quote) return (
    <div className="flex items-center gap-1 text-xs tabular-nums text-[var(--c-fg3)]">
      <span className="text-[var(--c-fg4)]">|</span>
      <span>{ticker}</span>
      <span>···</span>
    </div>
  );

  const up = quote.change >= 0;
  const clr = up ? "#4d9e5e" : "#a63347";

  return (
    <div className="flex items-center gap-1.5 text-xs tabular-nums">
      <span className="text-[var(--c-fg4)]">|</span>
      {quote.lines.length >= 2 && <Sparkline points={quote.lines} color={clr} />}
      <span className="text-[var(--c-fg2)]">{ticker}</span>
      <span style={{ color: clr }}>{up ? "▲" : "▼"} {quote.price.toFixed(2)}</span>
      <span style={{ color: clr }}>({up ? "+" : ""}{quote.changePercent.toFixed(2)}%)</span>
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().slice(0, 8);
  return (
    <div className="ml-auto text-xs tabular-nums hidden sm:flex items-center gap-1.5">
      <span className="text-[var(--c-fg3)]">{date}</span>
      <span className="text-[var(--c-fg4)]">|</span>
      <span className="text-[var(--c-fg2)]">{time}</span>
    </div>
  );
}

const questionsSubmenu = [
  { to: "/today",     label: "Daily",         icon: BookOpen  },
  { to: "/plan",      label: "Schedule",      icon: Calendar  },
  { to: "/questions", label: "Library",       icon: BookMarked },
];

function QuestionsNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isActive = ["/today", "/plan", "/questions"].some(p =>
    location.pathname === p || location.pathname.startsWith(p + "/")
  );

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider transition-all border",
          isActive
            ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
            : "border-transparent text-[var(--c-fg2)] hover:text-[var(--c-fg1)] hover:border-[var(--c-border)]"
        )}
      >
        <Database className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Questions</span>
        <span className={cn(
          "absolute bottom-0 left-2 right-2 h-px transition-opacity duration-150",
          open ? "bg-[var(--c-green)] opacity-60" : "opacity-0"
        )} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-0.5 bg-[var(--c-bg)] border border-[var(--c-border)] whitespace-nowrap z-50 py-1">
          {questionsSubmenu.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-2 text-xs tracking-wider transition-colors w-full",
                  isActive
                    ? "text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : "text-[var(--c-fg2)] hover:text-[var(--c-fg1)] hover:bg-[var(--c-hover)]"
                )
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [settings, setSettingsState] = useState<Settings>(() => loadSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault();
        setChatOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    const theme = settings.theme ?? "system";
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
      meta?.setAttribute("content", "#f5faf5");
    } else if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      meta?.setAttribute("content", "#080c08");
    } else {
      html.removeAttribute("data-theme");
      const isLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      meta?.setAttribute("content", isLight ? "#f5faf5" : "#080c08");
    }
  }, [settings.theme]);

  const setSettings = (s: Settings) => {
    setSettingsState(s);
    saveSettings(s);
  };

  return (
    <ReviewContextProvider>
    <SettingsContext.Provider value={{ settings, setSettings }}>
    <AuthGate>
      <div className="min-h-screen bg-[var(--c-bg)]">
        <header className="border-b border-[var(--c-border)] sticky top-0 z-10 bg-[var(--c-bg)]">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-12 flex items-center gap-1">
            <span className="text-[var(--c-green)] font-bold mr-6 text-sm tracking-[0.15em] cursor-blink select-none">
              PREP.SYS
            </span>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider transition-all border",
                  isActive
                    ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : "border-transparent text-[var(--c-fg2)] hover:text-[var(--c-fg1)] hover:border-[var(--c-border)]"
                )
              }
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Overview</span>
            </NavLink>
            <QuestionsNav />
            <NavLink
              to="/english"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider transition-all border",
                  isActive
                    ? "border-[var(--c-green)] text-[var(--c-green)] bg-[var(--c-green-bg)]"
                    : "border-transparent text-[var(--c-fg2)] hover:text-[var(--c-fg1)] hover:border-[var(--c-border)]"
                )
              }
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">English</span>
            </NavLink>
            <div className="ml-auto flex items-center gap-0.5">
              <Clock />
              <StockTicker />
              <div className="w-px h-4 bg-[var(--c-fg4)] mx-2" />
              <button
                onClick={() => setChatOpen((o) => !o)}
                title="AI Assistant"
                className={cn("p-1.5 transition-colors", chatOpen ? "text-[var(--c-green)]" : "text-[var(--c-fg3)] hover:text-[var(--c-green)] hover:bg-[var(--c-green-bg)]")}
              >
                <Bot className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                title="Settings"
                className="p-1.5 text-[var(--c-fg3)] hover:text-[var(--c-green)] hover:bg-[var(--c-green-bg)] transition-colors"
              >
                <SettingsIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-[var(--c-fg3)] hover:text-[var(--c-red)] hover:bg-[var(--c-red-bg)] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/english" element={<English />} />
            <Route path="/english/train" element={<EnglishTrain />} />
          </Routes>
        </main>

        <footer className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-4 mt-4 border-t border-[var(--c-border3)]">
          <p className="text-[var(--c-fg4)] text-xs tracking-widest text-center">
            POWERED BY{" "}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--c-fg3)] transition-colors"
            >
              CLAUDE CODE
            </a>
          </p>
        </footer>

        <SpeedInsights />
        <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </AuthGate>
    </SettingsContext.Provider>
    </ReviewContextProvider>
  );
}
