import * as functions from "firebase-functions";
import express from "express";
import router from "./routes";

const app = express();

app.use("/", router);

const api = functions.https.onRequest(app);
module.exports = { api };
