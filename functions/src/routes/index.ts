import express, { Request, Response } from "express";
import { fetchOpenAIResponse } from "../fetchAIResponse/fetchOpenAIResponse";

import { getPromptMiddleware } from "../middleware";

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
  .get("/goodbye", (req: Request, res: Response) => {
    res.send("Goodbye Express!");
  });

export default router;
