import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { listQuestions, createQuestion, createEnglishWord } from "./_lib/repo";
import { setCors, handleOptions } from "./_lib/cors";
import { requireAuth } from "./_lib/auth";

// DeepSeek requires `"type":"object"` on every tool schema.
// The @ai-sdk/openai provider strips it, so we patch it back at the fetch level.
async function deepseekFetch(url: RequestInfo | URL, init?: RequestInit): Promise<Response> {
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
  return fetch(url as RequestInfo, init);
}

const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/v1",
  fetch: deepseekFetch,
});

const SYSTEM = `You are a study assistant embedded in PREP.SYS — an interview prep and vocabulary learning app.
You can search questions, add new questions, and add English vocabulary entries via tools.
Be concise, plain text, no emojis. Always confirm what you inserted after creation.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  const today = new Date().toISOString().split("T")[0];

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(messages);
  } catch (e) {
    console.error("convertToModelMessages failed:", e);
    return res.status(400).json({ error: String(e) });
  }

  const result = streamText({
    model: deepseek.chat("deepseek-v4-pro"),
    system: SYSTEM,
    messages: modelMessages,
    stopWhen: stepCountIs(4),
    tools: {
      search_questions: tool({
        description: "Fuzzy search questions by title or content. Returns title, category, difficulty, proficiency.",
        parameters: z.object({
          search: z.string().describe("Keyword to search in title or content"),
          category: z.string().optional().describe("frontend | algorithm | system-design | quiz"),
          limit: z.number().int().min(1).max(20).default(10),
        }),
        execute: async ({ search, category, limit }) =>
          listQuestions({ search, category, today, limit }),
      }),

      create_question: tool({
        description: "Insert a new question into the question bank.",
        parameters: z.object({
          title:       z.string().describe("Question title / name"),
          content:     z.string().optional().describe("Detailed description or prompt"),
          category:    z.enum(["frontend", "algorithm", "system-design", "quiz"]),
          difficulty:  z.enum(["easy", "medium", "hard"]),
          answer_hint: z.string().optional().describe("Reference answer or hint"),
          tags:        z.array(z.string()).optional().describe("Tag list"),
        }),
        execute: async (data) => createQuestion(data),
      }),

      create_english_entry: tool({
        description: "Insert a new English vocabulary entry.",
        parameters: z.object({
          content:  z.string().describe("The word or phrase (can be multi-line with \\n)"),
          phonetic: z.string().optional().describe("Phonetic notation"),
          notes:    z.string().optional().describe("Chinese meaning or notes (line-by-line matching content)"),
        }),
        execute: async ({ content, phonetic, notes }) =>
          createEnglishWord({ content, phonetic: phonetic ?? null, notes: notes ?? null }),
      }),
    },
  });

  result.pipeUIMessageStreamToResponse(res as never);
  result.text.catch((e) => console.error("[chat] streamText error:", e));
}
