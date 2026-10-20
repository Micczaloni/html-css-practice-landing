import { createAuthClient } from "better-auth/react";

// Talks to Express /api/auth/* via the Vite proxy (same origin in dev)
export const authClient = createAuthClient({
  baseURL: window.location.origin,
});

export const { signIn, signUp, signOut, useSession } = authClient;
