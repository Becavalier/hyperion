import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setCors, handleOptions } from "../_lib/cors";
import { checkCredentials, issueToken } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body ?? {};
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "username and password required" });
  }

  if (!checkCredentials(username, password)) {
    // Small delay to discourage credential stuffing brute force.
    await new Promise((r) => setTimeout(r, 250));
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const { token, expiresAt } = issueToken();
  return res.json({ token, expires_at: expiresAt });
}
