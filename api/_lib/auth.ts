import * as crypto from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TTL_MS = 2 * 24 * 60 * 60 * 1000; // 2 days

function getSecret(): string {
  // AUTH_SECRET is what makes tokens unforgeable. Fall back only in local dev.
  return process.env.AUTH_SECRET || "dev-secret-do-not-use-in-prod";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function issueToken(): { token: string; expiresAt: number } {
  const exp = Date.now() + TTL_MS;
  const payload = String(exp);
  const sig = sign(payload);
  return { token: `${payload}.${sig}`, expiresAt: exp };
}

export function verifyToken(token: string): boolean {
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  // Constant-time signature compare
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp)) return false;
  return exp > Date.now();
}

/**
 * Gate an API handler. Returns true if request is authed (or auth not configured).
 * If false, a 401 response has already been sent — caller should `return` immediately.
 */
export function requireAuth(req: VercelRequest, res: VercelResponse): boolean {
  // If no credentials configured (local dev convenience), skip auth entirely.
  if (!process.env.AUTH_USERNAME || !process.env.AUTH_PASSWORD) return true;

  // Accept token from Authorization header (normal requests) or ?token= query param (SSE/EventSource)
  const header = req.headers.authorization;
  const headerToken = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const queryRaw = req.query?.token;
  const queryToken = Array.isArray(queryRaw) ? queryRaw[0] : queryRaw;
  const token = headerToken ?? queryToken ?? null;

  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.AUTH_USERNAME;
  const p = process.env.AUTH_PASSWORD;
  if (!u || !p) return false;
  // Timing-safe comparison
  if (username.length !== u.length || password.length !== p.length) return false;
  return (
    crypto.timingSafeEqual(Buffer.from(username), Buffer.from(u)) &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(p))
  );
}
