import { useNavigate, useLocation } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="font-mono">
        <div className="text-6xl font-bold text-[var(--c-green)] tracking-widest mb-2">404</div>
        <div className="text-[var(--c-fg3)] text-xs tracking-[0.3em] uppercase mb-1">Route Not Found</div>
        <div className="text-[var(--c-fg4)] text-xs font-mono mt-3">
          <span className="text-[var(--c-fg3)]">$</span> cd{" "}
          <span className="text-[var(--c-red)]">{location.pathname}</span>
          <span className="text-[var(--c-fg4)]"> — no such path</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 text-xs tracking-widest border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] transition-colors font-mono uppercase"
      >
        ← Back to Overview
      </button>
    </div>
  );
}
