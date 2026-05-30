import { useState, type ReactNode, type FormEvent } from "react";
import { Lock, LogIn } from "lucide-react";
import { isAuthed, login } from "@/lib/auth";

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#080c08]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0c120c] border border-[#1e321e] p-6 space-y-5 shadow-[0_0_20px_rgba(0,255,65,0.15)]"
      >
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#00ff41]" />
          <p className="text-[#2a402a] text-xs tracking-[0.3em]">// ACCESS_GATE</p>
        </div>

        <div>
          <p className="text-xl text-[#00ff41] font-bold tracking-wider cursor-blink">
            AUTHENTICATE
          </p>
          <p className="text-[#4d7a4d] text-xs mt-1.5 tracking-wider">
            session token valid 2d after login
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">USERNAME</label>
            <input
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] placeholder:text-[#2a402a] transition-colors"
              placeholder="user"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-[#4d7a4d] mb-1.5 tracking-widest">PASSWORD</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#080c08] border border-[#1e321e] text-[#b8f5b8] px-3 py-2 text-xs focus:outline-none focus:border-[#00ff41] placeholder:text-[#2a402a] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="border border-[#ff3358]/50 bg-[#120004] px-3 py-2 text-xs text-[#ff3358] tracking-wider">
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs border border-[#00ff41] text-[#00ff41] hover:bg-[#001a00] disabled:opacity-30 tracking-wider transition-colors"
          style={{ boxShadow: submitting ? "none" : "0 0 8px rgba(0,255,65,0.3)" }}
        >
          <LogIn className="w-3.5 h-3.5" />
          {submitting ? "AUTHENTICATING..." : "ENTER ▶"}
        </button>
      </form>
    </div>
  );
}
