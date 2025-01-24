import * as functions from "firebase-functions";
const express = require("express");

const app = express();

app.get("/hello", (req: any, res: any) => {
  res.send("Hello Express!");
});

const api = functions.https.onRequest(app);
module.exports = { api };
