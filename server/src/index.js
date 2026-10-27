import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import classesRouter from "./routes/classes.js";
import plansRouter from "./routes/plans.js";
import stripeRouter from "./routes/stripe.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// allow the Vite/Vercel frontend to call us with cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);

// better-auth needs the raw body — mount BEFORE express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));
// Webhooks must receive the untouched request bytes for signature verification.
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use("/api/classes", classesRouter);
app.use("/api/plans", plansRouter);
app.use("/api/stripe", stripeRouter);

// tiny ping so we can check the deploy is alive
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// anything else under /api → clean 404 JSON
app.use("/api/*splat", (_req, res) => {
  res.status(404).json({ error: "No such endpoint" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something broke on our side." });
});

app.listen(PORT, () => {
  console.log(`PULSO API listening on http://localhost:${PORT}`);
});
