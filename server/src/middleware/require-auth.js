import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session?.user) {
    return res.status(401).json({ error: "You must be signed in to checkout." });
  }

  req.user = session.user;
  next();
}
