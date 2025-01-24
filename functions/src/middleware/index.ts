import { Request, Response, NextFunction } from "express";
import GoogleDocsPublicContent from "../fetchAIResponse/fetchPrompt";

// 共通ミドルウェア: プロンプトを取得する
export const getPromptMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const room_prompt = req.body.room_prompt ?? "";
  const prompt = await GoogleDocsPublicContent(room_prompt);

  if (!prompt) {
    res.status(500).json({ error: "プロンプトの取得に失敗しました。" });
    return;
  }

  req.body.processedPrompt = prompt;
  return next(); // 次のルートハンドラに進む
};
