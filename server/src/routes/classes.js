import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { classes } from "../db/schema.js";

const router = Router();

// GET /api/classes — all fitness classes from Neon
router.get("/", async (_req, res) => {
  const rows = await db.select().from(classes);
  res.json(rows);
});

// GET /api/classes/:id — one class by id (BrewHaus uses :slug; we use serial id)
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const [row] = await db
    .select()
    .from(classes)
    .where(eq(classes.id, id))
    .limit(1);

  if (!row) {
    return res.status(404).json({ error: "No such class" });
  }

  res.json(row);
});

export default router;
