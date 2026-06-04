import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Calendar, Database, TriangleAlert, LogOut, Settings as SettingsIcon } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Today from "@/pages/Today";
import Plan from "@/pages/Plan";
import Questions from "@/pages/Questions";
import { getSchedule } from "@/lib/api";
import { cn, todayStr } from "@/lib/utils";
import { AuthGate } from "@/components/AuthGate";
import { SettingsPanel } from "@/components/SettingsPanel";
import { logout } from "@/lib/auth";
import { SettingsContext, loadSettings, saveSettings, useSettings, type Settings } from "@/lib/settings";
import { getStockQuote } from "@/lib/api";
import { SpeedInsights } from "@vercel/speed-insights/react";

function Sparkline({ points, color }: { points: number[]; color: string }) {
  if (points.length < 2) return null;
  const W = 64, H = 18, pad = 1;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (W - pad * 2));
  const ys = points.map(p => H - pad - ((p - min) / range) * (H - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} className="opacity-80 shrink-0">
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function StockTicker() {
  const { settings } = useSettings();
  const [quote, setQuote] = useState<{ price: number; change: number; changePercent: number; lines: number[] } | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!settings.stockSymbol) { setQuote(null); setErr(false); return; }
    let alive = true;
    const load = () =>
      getStockQuote(settings.stockSymbol)
        .then(q => { if (alive) { setQuote(q); setErr(false); } })
        .catch(() => { if (alive) setErr(true); });
    load();
    const id = setInterval(load, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, [settings.stockSymbol]);

  if (!settings.stockSymbol) return null;

  const ticker = settings.stockSymbol.split(".")[0];

  if (err || !quote) return (
    <div className="flex items-center gap-1 text-xs tabular-nums text-[#2a402a]">
      <span className="text-[#1e321e]">|</span>
      <span>{ticker}</span>
      <span>···</span>
    </div>
  );

  const up = quote.change >= 0;
  const clr = up ? "#00ff41" : "#ff3358";

  return (
    <div className="flex items-center gap-1.5 text-xs tabular-nums">
      <span className="text-[#1e321e]">|</span>
      {quote.lines.length >= 2 && <Sparkline points={quote.lines} color={clr} />}
      <span className="text-[#4d7a4d]">{ticker}</span>
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
    <div className="ml-auto text-xs tabular-nums flex items-center gap-1.5">
      <span className="text-[#2a402a]">{date}</span>
      <span className="text-[#1e321e]">|</span>
      <span className="text-[#4d7a4d]">{time}</span>
    </div>
  );
}

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/today", label: "Daily", icon: BookOpen, end: false },
  { to: "/plan", label: "Schedule", icon: Calendar, end: false },
  { to: "/questions", label: "Questions", icon: Database, end: false },
];

function PendingTab() {
  const location = useLocation();
  const [pending, setPending] = useState<number | null>(null);

  useEffect(() => {
    const refetch = () => {
      getSchedule(todayStr())
        .then(({ schedule, questions, reviews }) => {
          if (schedule && !schedule.completed) {
            setPending(questions.length - reviews.length);
          } else {
            setPending(0);
          }
        })
        .catch(() => setPending(0));
    };
    refetch();
    // 切路由 + 业务侧自定义事件都触发刷新
    const onReviewsChanged = () => refetch();
    window.addEventListener("prep:reviews-changed", onReviewsChanged);
    return () => window.removeEventListener("prep:reviews-changed", onReviewsChanged);
  }, [location.pathname]);

  if (!pending || location.pathname === "/today") return null;

  return (
    <>
      {/* Full-viewport amber border ring */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 5px #ffb300, inset 0 0 24px rgba(255,179,0,0.06)" }}
      />

      {/* Side tab */}
      <Link
        to="/today"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 bg-[#120d00] border-l-[5px] border-t-[5px] border-b-[3px] border-[#ffb300] px-3 py-5 hover:bg-[#1a1100] transition-colors group"
        style={{ boxShadow: "-2px 0 16px rgba(255,179,0,0.08)" }}
      >
        <TriangleAlert className="w-4 h-4 text-[#ffb300] shrink-0" />
        <span
          className="text-[#ffb300] text-xs tracking-[0.18em] font-medium leading-none"
          style={{ writingMode: "vertical-rl" }}
        >
          UNFINISHED
        </span>
        <span
          className="text-[#7a5a00] text-xs tabular-nums leading-none group-hover:text-[#ffb300] transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          {pending} LEFT
        </span>
      </Link>
    </>
  );
}

export default function App() {
  const [settings, setSettingsState] = useState<Settings>(() => loadSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);

  const setSettings = (s: Settings) => {
    setSettingsState(s);
    saveSettings(s);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
    <AuthGate>
      <div className="min-h-screen bg-[#080c08]">
        <header className="border-b border-[#1e321e] sticky top-0 z-10 bg-[#080c08]">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-12 flex items-center gap-1">
            <span className="text-[#00ff41] font-bold mr-6 text-sm tracking-[0.15em] cursor-blink select-none">
              PREP.SYS
            </span>
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider transition-all border",
                    isActive
                      ? "border-[#00ff41] text-[#00ff41] bg-[#001a00]"
                      : "border-transparent text-[#4d7a4d] hover:text-[#b8f5b8] hover:border-[#1e321e]"
                  )
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
            <Clock />
            <StockTicker />
            <button
              onClick={() => setSettingsOpen(true)}
              title="Settings"
              className="ml-2 p-1.5 text-[#2a402a] hover:text-[#00ff41] hover:bg-[#001a00] transition-colors"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-[#2a402a] hover:text-[#ff3358] hover:bg-[#120004] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
        </main>

        <PendingTab />
        <SpeedInsights />
        <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </AuthGate>
    </SettingsContext.Provider>
  );
}
