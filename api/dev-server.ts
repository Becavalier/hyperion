import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "./_lib/auth.js";
import { setCors, handleOptions } from "./_lib/cors.js";

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

function adapt(handler: Handler) {
  return (req: Request, res: Response) => handler(req as unknown as VercelRequest, res as unknown as VercelResponse);
}

/**
 * Global auth middleware (defense-in-depth on top of per-handler requireAuth).
 * Skips public paths (auth/login, OPTIONS preflight).
 */
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  setCors(res as unknown as VercelResponse);
  if (handleOptions(req as unknown as VercelRequest, res as unknown as VercelResponse)) return;
  // 公开端点放行
  if (req.path === "/api/auth/login") return next();
  if (!req.path.startsWith("/api/")) return next();
  if (requireAuth(req as unknown as VercelRequest, res as unknown as VercelResponse)) return next();
  // requireAuth 已经写了 401 响应
}

// Express defines req.query as a prototype getter — plain assignment silently fails.
// Use Object.defineProperty to shadow it with an own property that includes route params.
function withParams(req: Request, params: Record<string, string>) {
  const merged = { ...req.query, ...params };
  Object.defineProperty(req, "query", { value: merged, writable: true, configurable: true });
}

async function main() {
  const app = express();
  app.use(express.json());
  app.use(authMiddleware);   // 全局鉴权中间件

  const [
    questions,
    questionById,
    questionReset,
    plan,
    schedule,
    review,
    stats,
    aiAnswer,
    aiReview,
    authLogin,
    stock,
    stockStream,
  ] = await Promise.all([
    import("./questions/index.js"),
    import("./questions/[id].js"),
    import("./questions/reset/[id].js"),
    import("./plan/index.js"),
    import("./schedule/[date].js"),
    import("./review/index.js"),
    import("./stats/index.js"),
    import("./ai/answer.js"),
    import("./ai/review.js"),
    import("./auth/login.js"),
    import("./stock.js"),
    import("./stock-stream.js"),
  ]);

  app.all("/api/questions", adapt(questions.default));
  app.all("/api/questions/reset/:id", (req, res) => {
    withParams(req, { id: req.params.id });
    adapt(questionReset.default)(req, res);
  });
  app.all("/api/questions/:id", (req, res) => {
    withParams(req, { id: req.params.id });
    adapt(questionById.default)(req, res);
  });
  app.all("/api/plan/generate", adapt(plan.default));
  app.all("/api/plan/adjust", adapt(plan.default));
  app.all("/api/plan", adapt(plan.default));
  app.all("/api/schedule/:date", (req, res) => {
    withParams(req, { date: req.params.date });
    adapt(schedule.default)(req, res);
  });
  app.all("/api/review", adapt(review.default));
  app.all("/api/stats", adapt(stats.default));
  app.all("/api/ai/answer", adapt(aiAnswer.default));
  app.all("/api/ai/review", adapt(aiReview.default));
  app.all("/api/auth/login", adapt(authLogin.default));
  app.all("/api/stock", adapt(stock.default));
  app.all("/api/stock-stream", adapt(stockStream.default));

  const port = parseInt(process.env.API_PORT ?? "3002");
  app.listen(port, () => console.log(`API dev server running at http://localhost:${port}`));
}

main().catch(console.error);
