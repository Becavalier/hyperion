import type { VercelRequest, VercelResponse } from "@vercel/node";

export function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Prep-Language, X-Prep-System-Prompt");
}

export function handleOptions(req: VercelRequest, res: VercelResponse): boolean {
  if (req.method === "OPTIONS") {
    setCors(res);
    res.status(204).end();
    return true;
  }
  return false;
}
