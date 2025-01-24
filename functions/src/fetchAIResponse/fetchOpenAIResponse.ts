import OpenAI from "openai";

import * as dotenv from "dotenv";

// .envファイルの読み込み
dotenv.config();

// OpenAIの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// モデルの指定
const model = String(process.env.OPENAI_MODEL);

// OpenAIのレスポンスを取得する関数
export const fetchOpenAIResponse = async (input: string, prompt: string) => {
  // プロンプトとチャットの入力を用いてAIのレスポンスを取得
  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: input },
    ],
  });

  // レスポンス結果を取得
  const result = response.choices[0].message.content;

  return String(result);
};
