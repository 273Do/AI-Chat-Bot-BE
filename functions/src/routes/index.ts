import express, { Request, Response } from "express";

const router = express.Router();

router
  .get("/hello", (req: Request, res: Response) => {
    res.send("Hello Express!!");
  })
  .get("/goodbye", (req: Request, res: Response) => {
    res.send("Goodbye Express!");
  });

export default router;
