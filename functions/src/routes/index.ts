import express, { Request, Response } from "express";

import { getPromptMiddleware } from "../middleware";

import { fetchOpenAIResponse } from "../fetchAIResponse/fetchOpenAIResponse";
import { fetchGeminiResponse } from "../fetchAIResponse/fetchGeminiResponse";
import { fetchClaudeResponse } from "../fetchAIResponse/fetchClaudeResponse";
import { fetchDeepSeekResponse } from "../fetchAIResponse/fetchDeepSeekResponse";

const router = express.Router();

// 共通処理関数
async function handleAIRequest(
  fetchResponse: (input: string, prompt: string) => Promise<string>,
  req: Request,
  res: Response
) {
  try {
    const processedPrompt = req.body.processedPrompt;
    const input = String(req.body.input);

    const ai_res = await fetchResponse(input, processedPrompt);
    res.status(200).json({
      input,
      message: ai_res,
      prompt: processedPrompt,
    });
  } catch (error: any) {
    res.status(500).json({
      error: `${fetchResponse.name}からのレスポンス取得に失敗しました。`,
      details: error.message,
    });
  }
}

// ルーティング
router.post("/openai", getPromptMiddleware, (req, res) =>
  handleAIRequest(fetchOpenAIResponse, req, res)
);

router.post("/gemini", getPromptMiddleware, (req, res) =>
  handleAIRequest(fetchGeminiResponse, req, res)
);

router.post("/claude", getPromptMiddleware, (req, res) =>
  handleAIRequest(fetchClaudeResponse, req, res)
);

router.post("/deepseek", getPromptMiddleware, (req, res) =>
  handleAIRequest(fetchDeepSeekResponse, req, res)
);

export default router;
