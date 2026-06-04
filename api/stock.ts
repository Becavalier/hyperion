import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Config, QuoteContext, TradeSessions, Period, AdjustType } from "longport";
import { setCors, handleOptions } from "./_lib/cors";
import { requireAuth } from "./_lib/auth";

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
    return res.status(503).json({ error: "Longbridge credentials not configured" });
  }

  process.env.LONGPORT_APP_KEY = appKey;
  process.env.LONGPORT_APP_SECRET = appSecret;
  process.env.LONGPORT_ACCESS_TOKEN = accessToken;
  process.env.LONGPORT_ENABLE_OVERNIGHT = "true";

  let ctx: QuoteContext;
  try {
    ctx = await QuoteContext.new(Config.fromEnv());
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(502).json({ error: `Failed to connect to Longbridge: ${msg}` });
  }

  try {
    const [quotes, candles] = await Promise.all([
      ctx.quote([symbol]),
      ctx.historyCandlesticksByOffset(
        symbol, Period.Min_5, AdjustType.NoAdjust,
        false, null, 300, TradeSessions.All
      ).catch(() => []),
    ]);

    if (!quotes.length) return res.status(404).json({ error: "No quote data" });
    const q = quotes[0];

    // Pick the most recent price across all sessions
    const candidates = [
      { price: q.lastDone.toNumber(),                          ts: q.timestamp.getTime() },
      q.preMarketQuote  ? { price: q.preMarketQuote.lastDone.toNumber(),  ts: q.preMarketQuote.timestamp.getTime()  } : null,
      q.postMarketQuote ? { price: q.postMarketQuote.lastDone.toNumber(), ts: q.postMarketQuote.timestamp.getTime() } : null,
      q.overnightQuote  ? { price: q.overnightQuote.lastDone.toNumber(),  ts: q.overnightQuote.timestamp.getTime()  } : null,
    ].filter(Boolean) as { price: number; ts: number }[];

    const current = candidates.reduce((best, c) => c.ts > best.ts ? c : best);
    const prevClose = q.prevClose.toNumber();
    const change = current.price - prevClose;
    const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;

    // Filter candles to last 24 hours, return [timestamp_ms, close] pairs
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const lines = candles
      .filter((c) => c.timestamp.getTime() >= cutoff)
      .map((c) => [c.timestamp.getTime(), c.close.toNumber()] as [number, number]);

    return res.json({
      symbol: q.symbol,
      price: parseFloat(current.price.toFixed(4)),
      change: parseFloat(change.toFixed(4)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      prevClose,
      lines, // [[ts_ms, price], ...]
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(502).json({ error: `Longbridge API error: ${msg}` });
  }
}
