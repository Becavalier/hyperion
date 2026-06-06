import { createContext, useContext, useState, type ReactNode } from "react";

export interface ReviewCtx {
  mode: "DAILY_REVIEW";
  questionTitle: string;
  questionContent: string;
  category: string;
  difficulty: string;
  phase: "coding" | "submitted" | "done";
  code: string;
  codeLanguage: string;
}

interface Value {
  ctx: ReviewCtx | null;
  setCtx: (ctx: ReviewCtx | null) => void;
}

const Ctx = createContext<Value>({ ctx: null, setCtx: () => {} });

export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<ReviewCtx | null>(null);
  return <Ctx.Provider value={{ ctx, setCtx }}>{children}</Ctx.Provider>;
}

export const useReviewCtx = () => useContext(Ctx).ctx;
export const useSetReviewCtx = () => useContext(Ctx).setCtx;
