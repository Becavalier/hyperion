import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { Config, QuoteContext, SubType, TradeSessions, Period, AdjustType } from "longport";
import { setCors, handleOptions } from "../_lib/cors";
import { requireAuth } from "../_lib/auth";
import { findQuestionById, updateQuestionAnswerHint } from "../_lib/repo";
import {
  listQuestions, createQuestion, updateQuestionFields,
  createEnglishWord, searchEnglishEntries, updateEnglishWordFields,
} from "../_lib/repo";
import type { Question } from "../_lib/db";
import { getAnswerHint, aiProvider, chatCompletion } from "../_lib/ai";

// ── Chat (DeepSeek) ───────────────────────────────────────────────────────────

// DeepSeek requires `"type":"object"` on every tool schema.
// The @ai-sdk/openai provider strips it, so we patch it back at the fetch level.
async function deepseekFetch(url: string | URL | Request, init?: RequestInit): Promise<Response> {
  if (init?.body && typeof init.body === "string") {
    try {
      const body = JSON.parse(init.body);
      if (Array.isArray(body.tools)) {
        for (const t of body.tools) {
          if (t.function?.parameters && !t.function.parameters.type) {
            t.function.parameters.type = "object";
          }
        }
        init = { ...init, body: JSON.stringify(body) };
      }
    } catch { /* not JSON, leave as-is */ }
  }
  return fetch(url, init);
}

const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/v1",
  fetch: deepseekFetch,
});

const CHAT_SYSTEM = `You are a study assistant embedded in PREP.SYS — an interview prep and vocabulary learning app.
You can search, insert, and update questions and English vocabulary entries via tools.
Rules:
- Plain text only, no emojis.
- When a CURRENT CONTEXT block is present, always use it to answer questions about what the user is doing, their current question, or their code — even if the editor is empty.
- IMPORTANT: Before calling any create or update tool, always show the user the exact data you plan to write (formatted as a clear list), then ask for explicit confirmation. Only call the tool after the user says yes/ok/confirm.
- After a successful insert or update, summarize what was written.`;

// ── Stock stream (Longbridge) ─────────────────────────────────────────────────

function setupLongportEnv() {
  process.env.LONGPORT_APP_KEY          = process.env.LONGBRIDGE_APP_KEY;
  process.env.LONGPORT_APP_SECRET       = process.env.LONGBRIDGE_APP_SECRET;
  process.env.LONGPORT_ACCESS_TOKEN     = process.env.LONGBRIDGE_ACCESS_TOKEN;
  process.env.LONGPORT_ENABLE_OVERNIGHT = "true";
  if (!process.env.LONGPORT_APP_KEY || !process.env.LONGPORT_ACCESS_TOKEN) {
    throw new Error("Longbridge credentials not configured");
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;

  const action = req.query.action as string | undefined;

  // ── GET ?action=stock — SSE stock stream ────────────────────────────────────
  if (req.method === "GET" || action === "stock") {
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
    } catch {
      send({ type: "error", message: "Failed to connect to Longbridge" });
      res.end();
      return;
    }

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
        prevClose = q.lastDone.toNumber();
        const change = current.price - prevClose;
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;
        const lines = candles
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((c: any) => c.timestamp.getTime() >= cutoff)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((c: any) => [c.timestamp.getTime(), c.close.toNumber()] as [number, number]);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx.setOnQuote((err: any, event: any) => {
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

    const heartbeat = setInterval(() => {
      try { res.write(": heartbeat\n\n"); } catch {}
    }, 15_000);

    const cleanup = () => {
      clearInterval(heartbeat);
      try { ctx.unsubscribe([symbol], [SubType.Quote]); } catch {}
    };

    req.on("close", cleanup);
    req.on("error", cleanup);
    return;
  }

  // ── POST only from here ─────────────────────────────────────────────────────
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── POST ?action=chat — streaming chat ──────────────────────────────────────
  if (action === "chat") {
    const { messages, reviewContext } = req.body as {
      messages: Parameters<typeof convertToModelMessages>[0];
      reviewContext?: {
        questionTitle: string;
        questionContent: string;
        category: string;
        difficulty: string;
        phase: string;
        code: string;
        codeLanguage: string;
      };
    };
    const today = new Date().toISOString().split("T")[0];

    let modelMessages;
    try {
      modelMessages = await convertToModelMessages(messages);
    } catch (e) {
      console.error("convertToModelMessages failed:", e);
      return res.status(400).json({ error: String(e) });
    }

    let system = CHAT_SYSTEM;
    if (reviewContext) {
      const { questionTitle, questionContent, category, difficulty, phase, code, codeLanguage } = reviewContext;
      system += `\n\n--- CURRENT CONTEXT ---
The user is in DAILY_REVIEW mode. They are actively working on the following practice question. Reference this when they ask what they are doing, ask for hints, or ask about their code.

Question: ${questionTitle}
Category: ${category} | Difficulty: ${difficulty}
Phase: ${phase === "coding" ? "CODING (user is writing their solution)" : phase === "submitted" ? "SUBMITTED (solution submitted, reviewing feedback)" : "DONE (question completed)"}
${questionContent ? `\nProblem description:\n${questionContent}\n` : ""}
Editor (${codeLanguage}): ${code?.trim() ? `\n\`\`\`${codeLanguage}\n${code}\n\`\`\`` : "empty — the user has not written any code yet."}
--- END CONTEXT ---`;
    }

    const result = streamText({
      model: deepseek.chat("deepseek-v4-pro"),
      system,
      messages: modelMessages,
      stopWhen: stepCountIs(6),
      tools: {
        search_questions: tool({
          description: "Fuzzy search questions by title or content. Returns id, title, category, difficulty, proficiency.",
          inputSchema: z.object({
            search:   z.string().describe("Keyword to search in title or content"),
            category: z.string().optional().describe("frontend | algorithm | system-design | quiz"),
            limit:    z.number().int().min(1).max(20).default(10),
          }),
          execute: async ({ search, category, limit }: { search: string; category?: string; limit: number }) =>
            listQuestions({ search, category, today, limit }),
        }),

        create_question: tool({
          description: "Insert a new question into the question bank. Always confirm with user before calling.",
          inputSchema: z.object({
            title:       z.string().describe("Question title"),
            content:     z.string().optional().describe("Detailed description or code prompt"),
            category:    z.enum(["frontend", "algorithm", "system-design", "quiz"]),
            difficulty:  z.enum(["easy", "medium", "hard"]),
            answer_hint: z.string().optional().describe("Reference answer or hint"),
            tags:        z.array(z.string()).optional(),
          }),
          execute: async (data: { title: string; content?: string; category: "frontend"|"algorithm"|"system-design"|"quiz"; difficulty: "easy"|"medium"|"hard"; answer_hint?: string; tags?: string[] }) =>
            createQuestion(data),
        }),

        update_question: tool({
          description: "Update an existing question by its id. Use search_questions first to find the id. Always confirm with user before calling.",
          inputSchema: z.object({
            id:          z.string().describe("Question UUID from search_questions"),
            title:       z.string().optional(),
            content:     z.string().optional(),
            category:    z.enum(["frontend", "algorithm", "system-design", "quiz"]).optional(),
            difficulty:  z.enum(["easy", "medium", "hard"]).optional(),
            answer_hint: z.string().optional(),
          }),
          execute: async ({ id, title, content, category, difficulty, answer_hint }: { id: string; title?: string; content?: string; category?: "frontend"|"algorithm"|"system-design"|"quiz"; difficulty?: "easy"|"medium"|"hard"; answer_hint?: string }) =>
            updateQuestionFields(id, { title, content, category, difficulty, answerHint: answer_hint }),
        }),

        search_english: tool({
          description: "Search English vocabulary entries by word or meaning. Returns id, word, phonetic, meaning, proficiency.",
          inputSchema: z.object({
            search: z.string().describe("English word or Chinese meaning to search"),
            limit:  z.number().int().min(1).max(20).default(10),
          }),
          execute: async ({ search, limit }: { search: string; limit: number }) =>
            searchEnglishEntries(search, limit),
        }),

        create_english_entry: tool({
          description: "Insert a new English vocabulary entry. Always confirm with user before calling. Field mapping: word=English word, meaning=Chinese translation.",
          inputSchema: z.object({
            word:     z.string().describe("The English word or phrase. Use \\n to separate multiple words (each on its own line)."),
            phonetic: z.string().optional().describe("Phonetic notation, e.g. /wɜːrd/"),
            meaning:  z.string().optional().describe("Chinese translation or meaning. Use \\n to match lines in word field."),
          }),
          execute: async ({ word, phonetic, meaning }: { word: string; phonetic?: string; meaning?: string }) =>
            createEnglishWord({ content: word, phonetic: phonetic ?? null, notes: meaning ?? null }),
        }),

        update_english_entry: tool({
          description: "Update an existing English vocabulary entry by its id. Use search_english first to find the id. Always confirm with user before calling.",
          inputSchema: z.object({
            id:       z.string().describe("Entry UUID from search_english"),
            word:     z.string().optional().describe("New English word or phrase"),
            phonetic: z.string().optional().describe("New phonetic notation"),
            meaning:  z.string().optional().describe("New Chinese meaning"),
          }),
          execute: async ({ id, word, phonetic, meaning }: { id: string; word?: string; phonetic?: string; meaning?: string }) =>
            updateEnglishWordFields(id, { word, phonetic, meaning }),
        }),
      },
    });

    result.pipeUIMessageStreamToResponse(res as never);
    result.text.then(undefined, (e: unknown) => console.error("[chat] streamText error:", e));
    return;
  }

  // ── POST ?action=answer ─────────────────────────────────────────────────────
  if (action === "answer") {
    const { question_id } = req.body;
    if (!question_id) return res.status(400).json({ error: "question_id 为必填项" });

    const row = await findQuestionById(question_id);
    if (!row) return res.status(404).json({ error: "题目不存在" });

    const question: Question = {
      id: row.id,
      title: row.title,
      content: row.content ?? "",
      category: row.category as Question["category"],
      difficulty: row.difficulty as Question["difficulty"],
      tags: [],
      answer_hint: row.answerHint ?? null,
      cluster_id: row.clusterId ?? null,
      created_at: row.createdAt?.toISOString() ?? "",
      proficiency: row.proficiency ?? 0,
      next_review_date: row.nextReviewDate ?? null,
      last_reviewed_at: row.lastReviewedAt?.toISOString() ?? null,
    };

    const answer = await getAnswerHint(question);

    if (!question.answer_hint) {
      await updateQuestionAnswerHint(question_id, answer);
    }

    return res.json({ answer });
  }

  // ── POST ?action=review ─────────────────────────────────────────────────────
  if (action === "review") {
    const { question_id, code } = req.body;
    if (!question_id) return res.status(400).json({ error: "question_id required" });

    const question = await findQuestionById(question_id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    if (!aiProvider()) {
      return res.json({
        feedback: "No AI provider configured — set ANTHROPIC_API_KEY or DEEPSEEK_API_KEY.\nSwitch to Manual Review to compare with the reference answer.",
        verdict: null,
      });
    }

    const language = (req.headers["x-prep-language"] as string) || "zh";
    const customSystemPrompt = req.headers["x-prep-system-prompt"]
      ? decodeURIComponent(req.headers["x-prep-system-prompt"] as string)
      : "";
    const langInstruction = language === "en"
      ? "Respond in English."
      : language === "ja"
      ? "日本語で回答してください。"
      : language === "auto"
      ? "Detect the language of the question and respond in the same language."
      : "用中文回答。";

    const prompt = `You are a JavaScript / coding review assistant. Evaluate the user's submission **by overall correctness and direction**, not exact wording.

Question: ${question.title}
${question.content ? `\nDescription:\n${question.content}` : ""}

User's submission (this could be code, or analysis/explanation text for review-type tasks):
\`\`\`
${code?.trim() || "(empty — user submitted nothing)"}
\`\`\`

${question.answerHint ? `Reference / hint:\n${question.answerHint}` : ""}

${customSystemPrompt ? `Additional instructions: ${customSystemPrompt}\n` : ""}

${langInstruction}

Provide your review in this structure (use markdown):

### ⚠️ What's missing or wrong
Specific gaps. If empty submission, say so.

### 💡 Recommended answer
Provide a clean, idiomatic recommended answer (code or analysis depending on task type). For code: full working snippet with brief comments. For review tasks: a structured bug list with fixes.

When choosing the verdict below, be lenient on phrasing / variable names / minor stylistic differences — focus on whether the user grasped the core idea, not whether wording matches the reference.

═══════════════════════════════════════════════════════════════
MANDATORY FINAL LINE — this rule is NOT optional:

The very last line of your response MUST be exactly one of:
  VERDICT: PASS
  VERDICT: PARTIAL
  VERDICT: FAIL

Selection rubric (lenient):
- PASS    — overall direction is correct, key points covered; minor wording / style / edge-case gaps are OK.
- PARTIAL — right general idea but missing important pieces or has real bugs.
- FAIL    — empty, fundamentally wrong, or misses the core concept.

Do not output the pipe \`|\`, do not list all three, do not add explanation after VERDICT. The line must stand alone.`;

    const raw = await chatCompletion(prompt, { tier: "fast", maxTokens: 2048 });

    const verdictMatch = raw.match(/VERDICT:\s*(PASS|PARTIAL|FAIL)/i);
    const verdictMap: Record<string, "mastered" | "fuzzy" | "unknown"> = {
      PASS: "mastered",
      PARTIAL: "fuzzy",
      FAIL: "unknown",
    };
    const verdict = verdictMatch ? verdictMap[verdictMatch[1].toUpperCase()] : null;
    const feedback = raw.replace(/\n*VERDICT:\s*(PASS|PARTIAL|FAIL).*$/i, "").trim();

    return res.json({ feedback, verdict });
  }

  return res.status(400).json({ error: "action must be 'answer', 'review', 'chat', or 'stock'" });
}
