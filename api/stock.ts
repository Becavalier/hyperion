import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac } from "crypto";
import { setCors, handleOptions } from "./_lib/cors";
import { requireAuth } from "./_lib/auth";

// Longbridge OpenAPI signing
// payload = "METHOD|path|sorted_query||timestamp"  (double pipe = empty body)
function sign(appSecret: string, method: string, path: string, query: string, timestamp: string): string {
  const payload = `${method}|${path}|${query}||${timestamp}`;
  return createHmac("sha256", appSecret).update(payload).digest("hex");
}

interface LongbridgeQuote {
  symbol: string;
  last_done: string;
  prev_close: string;
  open: string;
  high: string;
  low: string;
  timestamp: number;
  volume: string;
  turnover: string;
  trade_status: number;
}

interface IntradayLine {
  price: string;
  timestamp: number;
}

function lbFetch(appKey: string, accessToken: string, appSecret: string, path: string, query: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = sign(appSecret, "GET", path, query, timestamp);
  return fetch(`https://openapi.longportapp.com${path}?${query}`, {
    headers: {
      "X-Api-Key": appKey,
      "Authorization": `Bearer ${accessToken}`,
      "X-Timestamp": timestamp,
      "X-Sign": signature,
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const symbol = (req.query.symbol as string | undefined)?.toUpperCase();
  if (!symbol) return res.status(400).json({ error: "symbol required" });

  const appKey = process.env.LONGBRIDGE_APP_KEY;
  const appSecret = process.env.LONGBRIDGE_APP_SECRET;
  const accessToken = process.env.LONGBRIDGE_ACCESS_TOKEN;

  if (!appKey || !appSecret || !accessToken) {
    return res.status(503).json({ error: "Longbridge credentials not configured (set LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN)" });
  }

  // 并行请求 quote + intraday
  let quoteRes: Response, intradayRes: Response;
  try {
    [quoteRes, intradayRes] = await Promise.all([
      lbFetch(appKey, accessToken, appSecret, "/v1/quote/quote", `symbols=${symbol}`),
      lbFetch(appKey, accessToken, appSecret, "/v1/quote/intraday", `symbol=${symbol}`),
    ]);
  } catch {
    return res.status(502).json({ error: "Failed to reach Longbridge API" });
  }

  if (!quoteRes.ok) {
    return res.status(502).json({ error: `Longbridge ${quoteRes.status}: ${await quoteRes.text()}` });
  }

  const quoteBody = await quoteRes.json() as {
    code: number;
    message?: string;
    data?: { list?: LongbridgeQuote[] };
  };

  if (quoteBody.code !== 0 || !quoteBody.data?.list?.length) {
    return res.status(502).json({ error: quoteBody.message ?? "No quote data" });
  }

  const q = quoteBody.data.list[0];
  const price = parseFloat(q.last_done);
  const prevClose = parseFloat(q.prev_close);
  const change = price - prevClose;
  const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;

  // intraday 失败不影响主报价
  let lines: number[] = [];
  if (intradayRes.ok) {
    const intradayBody = await intradayRes.json() as {
      code: number;
      data?: { symbol: string; lines?: IntradayLine[] };
    };
    if (intradayBody.code === 0 && intradayBody.data?.lines?.length) {
      const raw = intradayBody.data.lines.map(l => parseFloat(l.price));
      // 最多保留 120 个点（约 2 小时精度），前端 sparkline 够用
      const step = Math.max(1, Math.floor(raw.length / 120));
      lines = raw.filter((_, i) => i % step === 0);
      if (lines[lines.length - 1] !== raw[raw.length - 1]) lines.push(raw[raw.length - 1]);
    }
  }

  return res.json({
    symbol: q.symbol,
    price: parseFloat(price.toFixed(4)),
    change: parseFloat(change.toFixed(4)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    lines,
  });
}
