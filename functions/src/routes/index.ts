import express, { Request, Response } from "express";
import { fetchOpenAIResponse } from "../fetchAIResponse/fetchOpenAIResponse";

const router = express.Router();

router
  .get("/openai", async (req: Request, res: Response) => {
    // OpenAIのレスポンスを取得
    try {
      const ai_res = await fetchOpenAIResponse(
        "マークダウンで回答して",
        "あなたの機能について簡単に教えて"
      );
      res.status(200).json({
        message: ai_res,
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
