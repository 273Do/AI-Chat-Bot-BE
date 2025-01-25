import OpenAI from "openai";

// MEMO: DeepSeek APIはOpenAIと互換性のあるAPI形式を採用している．
// DeepSeekの初期化
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: String(process.env.DEEPSEEK_API_KEY),
});

// モデルの指定
const model = String(process.env.DEEPSEEK_MODEL);

// DeepSeekのレスポンスを取得する関数
export const fetchDeepSeekResponse = async (input: string, prompt: string) => {
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
