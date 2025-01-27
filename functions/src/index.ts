import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

// CORS設定
const corsOptions = {
  origin: String(process.env.FRONTEND_URL),
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options(String(process.env.FRONTEND_URL), cors(corsOptions));

// ルーティング
app.use("/", router);

// Firebase Functionsとしてエクスポート
export const api = functions.https.onRequest(app);
