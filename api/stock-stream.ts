import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Config, QuoteContext, SubType, TradeSessions, Period, AdjustType } from "longport";
import { setCors, handleOptions } from "./_lib/cors";
import { requireAuth } from "./_lib/auth";

function setupLongportEnv() {
  process.env.LONGPORT_APP_KEY          = process.env.LONGBRIDGE_APP_KEY;
  process.env.LONGPORT_APP_SECRET       = process.env.LONGBRIDGE_APP_SECRET;
  process.env.LONGPORT_ACCESS_TOKEN     = process.env.LONGBRIDGE_ACCESS_TOKEN;
  process.env.LONGPORT_ENABLE_OVERNIGHT = "true";
  if (!process.env.LONGPORT_APP_KEY || !process.env.LONGPORT_ACCESS_TOKEN) {
    throw new Error("Longbridge credentials not configured");
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const symbol = (req.query.symbol as string | undefined)?.toUpperCase();
  if (!symbol) return res.status(400).json({ error: "symbol required" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.status(200);

  const send = (data: object) => {
    try { res.write(`data: ${JSON.stringify(data)}\n\n`); } catch {}
  };

  try {
    setupLongportEnv();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    send({ type: "error", message: `Auth error: ${msg}` });
    res.end();
    return;
  }

  let ctx: QuoteContext;
  try {
    ctx = await QuoteContext.new(Config.fromEnv());
  } catch (err) {
    send({ type: "error", message: "Failed to connect to Longbridge" });
    res.end();
    return;
  }

  // Send initial snapshot (price + 24h sparkline)
  let prevClose = 0;
  try {
    const [quotes, candles] = await Promise.all([
      ctx.quote([symbol]),
      ctx.historyCandlesticksByOffset(
        symbol, Period.Min_5, AdjustType.NoAdjust, false, null, 300, TradeSessions.All
      ).catch(() => []),
    ]);

    if (quotes.length) {
      const q = quotes[0];
      const candidates = [
        { price: q.lastDone.toNumber(), ts: q.timestamp.getTime() },
        q.preMarketQuote  ? { price: q.preMarketQuote.lastDone.toNumber(),  ts: q.preMarketQuote.timestamp.getTime()  } : null,
        q.postMarketQuote ? { price: q.postMarketQuote.lastDone.toNumber(), ts: q.postMarketQuote.timestamp.getTime() } : null,
        q.overnightQuote  ? { price: q.overnightQuote.lastDone.toNumber(),  ts: q.overnightQuote.timestamp.getTime()  } : null,
      ].filter(Boolean) as { price: number; ts: number }[];

      const current = candidates.reduce((b, c) => c.ts > b.ts ? c : b);

      // Always use lastDone (regular session closing price) as the reference for change calculation
      prevClose = q.lastDone.toNumber();

      const change = current.price - prevClose;
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      const lines = candles
        .filter((c) => c.timestamp.getTime() >= cutoff)
        .map((c) => [c.timestamp.getTime(), c.close.toNumber()] as [number, number]);

      send({
        type: "snapshot",
        symbol: q.symbol,
        price: parseFloat(current.price.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat((prevClose > 0 ? change / prevClose * 100 : 0).toFixed(2)),
        prevClose,
        lines,
      });
    }
  } catch { /* non-fatal — proceed to subscribe */ }

  // Subscribe to real-time quote pushes
  ctx.setOnQuote((err, event) => {
    if (err) return;
    const price = parseFloat(event.data.lastDone.toNumber().toFixed(4));
    const change = parseFloat((price - prevClose).toFixed(4));
    send({
      type: "quote",
      symbol: event.symbol,
      price,
      change,
      changePercent: parseFloat((prevClose > 0 ? change / prevClose * 100 : 0).toFixed(2)),
      ts: event.data.timestamp.getTime(),
    });
  });

  try { await ctx.subscribe([symbol], [SubType.Quote], true); } catch { /* best-effort */ }

  // Heartbeat to keep the connection alive through proxies
  const heartbeat = setInterval(() => {
    try { res.write(": heartbeat\n\n"); } catch {}
  }, 15_000);

  const cleanup = () => {
    clearInterval(heartbeat);
    try { ctx.unsubscribe([symbol], [SubType.Quote]); } catch {}
  };

  req.on("close", cleanup);
  req.on("error", cleanup);
}
