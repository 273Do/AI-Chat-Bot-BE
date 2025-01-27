import Anthropic from "@anthropic-ai/sdk";

import * as dotenv from "dotenv";

// .envファイルの読み込み
dotenv.config();

// Claudeの初期化
const anthropic = new Anthropic({
  apiKey: String(process.env.ANTHROPIC_API_KEY),
});

// モデルの指定
const model = String(process.env.CLAUDE_MODEL);

// Claudeのレスポンスを取得する関数
export const fetchClaudeResponse = async (input: string, prompt: string) => {
  const request =
    "こちらの指示に従って回答してください。：" + prompt + "\n入力：" + input;

  // プロンプトとチャットの入力を用いてAIのレスポンスを取得
  const response = await anthropic.messages.create({
    model,
    max_tokens: 1024,
    messages: [{ role: "user", content: request }],
  });

  // レスポンス結果を取得
  const result =
    response.content[0].type === "text" ? response.content[0].text : "";

  return String(result);
};
