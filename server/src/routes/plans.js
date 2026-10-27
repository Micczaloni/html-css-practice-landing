import { Router } from "express";
import { db } from "../db/index.js";
import { plans } from "../db/schema.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    res.json(await db.select().from(plans));
  } catch (error) {
    next(error);
  }
});

export default router;
