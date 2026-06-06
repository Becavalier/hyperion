import { useState, type ReactNode, type FormEvent } from "react";
import { Lock, LogIn } from "lucide-react";
import { isAuthed, login } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function AuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isAuthed);

  if (authed) return <>{children}</>;
  return <LoginScreen onSuccess={() => setAuthed(true)} />;
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--c-bg)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[var(--c-surface)] border border-[var(--c-border)] p-6 space-y-5 shadow-[0_0_20px_rgba(0,255,65,0.15)]"
      >
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[var(--c-green)]" />
          <p className="text-[var(--c-fg3)] text-xs tracking-[0.3em]">// ACCESS_GATE</p>
        </div>

        <div>
          <p className="text-xl text-[var(--c-green)] font-bold tracking-wider cursor-blink">
            AUTHENTICATE
          </p>
          <p className="text-[var(--c-fg2)] text-xs mt-1.5 tracking-wider">
            session token valid 2d after login
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--c-fg2)] mb-1.5 tracking-widest">USERNAME</label>
            <input
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-fg1)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--c-green)] placeholder:text-[var(--c-fg3)] transition-colors"
              placeholder="user"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--c-fg2)] mb-1.5 tracking-widest">PASSWORD</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-fg1)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--c-green)] placeholder:text-[var(--c-fg3)] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="border border-[var(--c-red)]/50 bg-[var(--c-red-bg)] px-3 py-2 text-xs text-[var(--c-red)] tracking-wider">
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={cn("w-full flex items-center justify-center gap-2 px-4 py-2 text-xs border border-[var(--c-green)] text-[var(--c-green)] hover:bg-[var(--c-green-bg)] disabled:opacity-30 tracking-wider transition-colors", !submitting && "shadow-[0_0_8px_rgba(0,255,65,0.3)]")}
        >
          <LogIn className="w-3.5 h-3.5" />
          {submitting ? "AUTHENTICATING..." : "ENTER ▶"}
        </button>
      </form>
    </div>
  );
}
