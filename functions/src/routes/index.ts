import express, { Request, Response } from "express";

import { getPromptMiddleware } from "../middleware";

import { fetchOpenAIResponse } from "../fetchAIResponse/fetchOpenAIResponse";
import { fetchGeminiResponse } from "../fetchAIResponse/fetchGeminiResponse";
import { fetchClaudeResponse } from "../fetchAIResponse/fetchClaudeResponse";
import { fetchDeepSeekResponse } from "../fetchAIResponse/fetchDeepSeekResponse";

const router = express.Router();

router
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
  })
  .get("/claude", getPromptMiddleware, async (req: Request, res: Response) => {
    // Claudeのレスポンスを取得
    try {
      // リクエストボディからプロンプトとチャットの入力を取得
      const processedPrompt = req.body.processedPrompt;
      const input = String(req.body.input);

      // レスポンスを取得
      const ai_res = await fetchClaudeResponse(input, processedPrompt);
      res.status(200).json({
        input: input,
        message: ai_res,
        prompt: processedPrompt,
      });
    } catch (error: any) {
      res.status(500).json({
        error: "Claudeからのレスポンス取得に失敗しました。",
        details: error.message,
      });
    }
  })
  .get(
    "/deepseek",
    getPromptMiddleware,
    async (req: Request, res: Response) => {
      // DeepSeekのレスポンスを取得
      try {
        // リクエストボディからプロンプトとチャットの入力を取得
        const processedPrompt = req.body.processedPrompt;
        const input = String(req.body.input);

        // レスポンスを取得
        const ai_res = await fetchDeepSeekResponse(input, processedPrompt);
        res.status(200).json({
          input: input,
          message: ai_res,
          prompt: processedPrompt,
        });
      } catch (error: any) {
        res.status(500).json({
          error: "DeepSeekからのレスポンス取得に失敗しました。",
          details: error.message,
        });
      }
    }
  );

export default router;
