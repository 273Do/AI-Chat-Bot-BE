import * as dotenv from "dotenv";
import { JSDOM } from "jsdom";

// .envファイルの読み込み
dotenv.config();

// Google DocsのURL
const docUrl = String(process.env.GOOGLE_DOCS_LINK);

// Google Docsからプロンプトを取得する関数
export const GoogleDocsPublicContent = async (room_prompt: string) => {
  let prompt: string | null = "";

  const response = await fetch(docUrl);
  const html = await response.text();

  // jsdomを使用してHTMLをパース
  const dom = new JSDOM(html);

  // ドキュメントの内容を取得
  const doc = dom.window.document;
  prompt = doc.querySelector(".doc-content")?.textContent || null;
  if (prompt === null) {
    return null;
  }

  if (room_prompt !== "") {
    prompt = prompt + "\n追加プロンプト：" + room_prompt;
  }
  return prompt;
};

export default GoogleDocsPublicContent;
