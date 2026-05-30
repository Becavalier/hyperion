// Single-user auth client. Stores HMAC token + expiry in localStorage.
// The token is opaque — server signs it; client just attaches it on every request.

const TOKEN_KEY = "auth.token";
const EXPIRES_KEY = "auth.expires_at";

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expRaw = localStorage.getItem(EXPIRES_KEY);
  if (!token || !expRaw) return null;
  if (Date.now() >= Number(expRaw)) {
    clearToken();
    return null;
  }
  return token;
}

export function setToken(token: string, expiresAt: number) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function isAuthed(): boolean {
  return getToken() !== null;
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Login failed");
  }
  const { token, expires_at } = await res.json();
  setToken(token, expires_at);
}

export function logout() {
  clearToken();
  window.location.reload();
}
