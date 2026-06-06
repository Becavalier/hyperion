import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import {
  listQuestions, createQuestion, updateQuestionFields,
  createEnglishWord, searchEnglishEntries, updateEnglishWordFields,
} from "./_lib/repo";
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
You can search, insert, and update questions and English vocabulary entries via tools.
Rules:
- Plain text only, no emojis.
- When a CURRENT CONTEXT block is present, always use it to answer questions about what the user is doing, their current question, or their code — even if the editor is empty.
- IMPORTANT: Before calling any create or update tool, always show the user the exact data you plan to write (formatted as a clear list), then ask for explicit confirmation. Only call the tool after the user says yes/ok/confirm.
- After a successful insert or update, summarize what was written.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (handleOptions(req, res)) return;
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

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

  let system = SYSTEM;
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
      // ── Questions ───────────────────────────────────────────────────────────
      search_questions: tool({
        description: "Fuzzy search questions by title or content. Returns id, title, category, difficulty, proficiency.",
        parameters: z.object({
          search:   z.string().describe("Keyword to search in title or content"),
          category: z.string().optional().describe("frontend | algorithm | system-design | quiz"),
          limit:    z.number().int().min(1).max(20).default(10),
        }),
        execute: async ({ search, category, limit }) =>
          listQuestions({ search, category, today, limit }),
      }),

      create_question: tool({
        description: "Insert a new question into the question bank. Always confirm with user before calling.",
        parameters: z.object({
          title:       z.string().describe("Question title"),
          content:     z.string().optional().describe("Detailed description or code prompt"),
          category:    z.enum(["frontend", "algorithm", "system-design", "quiz"]),
          difficulty:  z.enum(["easy", "medium", "hard"]),
          answer_hint: z.string().optional().describe("Reference answer or hint"),
          tags:        z.array(z.string()).optional(),
        }),
        execute: async (data) => createQuestion(data),
      }),

      update_question: tool({
        description: "Update an existing question by its id. Use search_questions first to find the id. Always confirm with user before calling.",
        parameters: z.object({
          id:          z.string().describe("Question UUID from search_questions"),
          title:       z.string().optional(),
          content:     z.string().optional(),
          category:    z.enum(["frontend", "algorithm", "system-design", "quiz"]).optional(),
          difficulty:  z.enum(["easy", "medium", "hard"]).optional(),
          answer_hint: z.string().optional(),
        }),
        execute: async ({ id, title, content, category, difficulty, answer_hint }) =>
          updateQuestionFields(id, { title, content, category, difficulty, answerHint: answer_hint }),
      }),

      // ── English ─────────────────────────────────────────────────────────────
      search_english: tool({
        description: "Search English vocabulary entries by word or meaning. Returns id, word, phonetic, meaning, proficiency.",
        parameters: z.object({
          search: z.string().describe("English word or Chinese meaning to search"),
          limit:  z.number().int().min(1).max(20).default(10),
        }),
        execute: async ({ search, limit }) => searchEnglishEntries(search, limit),
      }),

      create_english_entry: tool({
        description: "Insert a new English vocabulary entry. Always confirm with user before calling. Field mapping: word=English word, meaning=Chinese translation.",
        parameters: z.object({
          word:     z.string().describe("The English word or phrase. Use \\n to separate multiple words (each on its own line)."),
          phonetic: z.string().optional().describe("Phonetic notation, e.g. /wɜːrd/"),
          meaning:  z.string().optional().describe("Chinese translation or meaning. Use \\n to match lines in word field."),
        }),
        execute: async ({ word, phonetic, meaning }) =>
          createEnglishWord({ content: word, phonetic: phonetic ?? null, notes: meaning ?? null }),
      }),

      update_english_entry: tool({
        description: "Update an existing English vocabulary entry by its id. Use search_english first to find the id. Always confirm with user before calling.",
        parameters: z.object({
          id:       z.string().describe("Entry UUID from search_english"),
          word:     z.string().optional().describe("New English word or phrase"),
          phonetic: z.string().optional().describe("New phonetic notation"),
          meaning:  z.string().optional().describe("New Chinese meaning"),
        }),
        execute: async ({ id, word, phonetic, meaning }) =>
          updateEnglishWordFields(id, { word, phonetic, meaning }),
      }),
    },
  });

  result.pipeUIMessageStreamToResponse(res as never);
  result.text.catch((e) => console.error("[chat] streamText error:", e));
}
