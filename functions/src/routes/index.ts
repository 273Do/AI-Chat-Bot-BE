import express, { Request, Response } from "express";

import { getPromptMiddleware } from "../middleware";

import { fetchOpenAIResponse } from "../fetchAIResponse/fetchOpenAIResponse";
import { fetchGeminiResponse } from "../fetchAIResponse/fetchGeminiResponse";

const router = express.Router();

router
  .get("/", getPromptMiddleware, async (req: Request, res: Response) => {
    const processedPrompt = req.body.processedPrompt;
    res.send(processedPrompt);
  })
  .get("/openai", getPromptMiddleware, async (req: Request, res: Response) => {
    // OpenAIのレスポンスを取得
    try {
      // リクエストボディからプロンプトとチャットの入力を取得
      const processedPrompt = req.body.processedPrompt;
      const input = String(req.body.input);

      // レスポンスを取得
      const ai_res = await fetchOpenAIResponse(input, processedPrompt);
      res.status(200).json({
        input: input,
        message: ai_res,
        prompt: processedPrompt,
      });
    } catch (error: any) {
      res.status(500).json({
        error: "OpenAIからのレスポンス取得に失敗しました。",
        details: error.message,
      });
    }
  })
  .get("/gemini", getPromptMiddleware, async (req: Request, res: Response) => {
    // Geminiのレスポンスを取得
    try {
      // リクエストボディからプロンプトとチャットの入力を取得
      const processedPrompt = req.body.processedPrompt;
      const input = String(req.body.input);

      // レスポンスを取得
      const ai_res = await fetchGeminiResponse(input, processedPrompt);
      res.status(200).json({
        input: input,
        message: ai_res,
        prompt: processedPrompt,
      });
    } catch (error: any) {
      res.status(500).json({
        error: "Geminiからのレスポンス取得に失敗しました。",
        details: error.message,
      });
    }
  });

export default router;
