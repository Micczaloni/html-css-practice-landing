# PULSO — fitness studio (course project)

Week 1 was plain HTML/CSS. Week 2 moved the same landing into **Vite + React + Tailwind**.  
Week 3 adds a small backend: **Express + Neon (Postgres) + Drizzle + Better Auth**.

Live-ish setup (when deployed):

- **Frontend** → Vercel (`pulso-app/`)
- **API** → Railway (`server/`)
- **Database** → Neon (Postgres in the cloud)

Locally the frontend proxies `/api` to Express (see `pulso-app/vite.config.js`).  
On Vercel the same idea is in `pulso-app/vercel.json` (rewrite `/api` → Railway).

## Folders

| Path | What |
|------|------|
| `pulso-app/` | React UI — schedule, trainers, memberships, login |
| `server/` | Express API, Drizzle schema, seed, Better Auth |

## Run locally

You need **two terminals**.

**1. API**

```bash
cd server
cp .env.example .env   # once — paste Neon URL + auth secret
npm install
npm run db:push        # sync tables to Neon
npm run db:seed        # fill classes table
npm run dev            # http://localhost:3000
```

**2. Frontend**

```bash
cd pulso-app
npm install
npm run dev            # http://localhost:5173
```

Quick checks:

- `http://localhost:3000/api/health`
- `http://localhost:3000/api/classes`
- site at `:5173` should load the schedule from the API

## How the pieces talk

```
Browser (Vite :5173)
  → fetch("/api/classes") / Better Auth
  → Vite proxy → Express (:3000)
  → Drizzle → Neon Postgres
```

Auth: React uses `src/lib/auth-client.js`; Express mounts Better Auth on `/api/auth/*`  
(must stay **before** `express.json()` — see `server/src/index.js`).

Classes list used to live in `pulso-app/src/data/classes.js`.  
Now the rows come from Neon; that file only keeps the day tabs (`DAYS`).

## Useful scripts (`server/`)

| Script | Does |
|--------|------|
| `npm run dev` | API with `--watch` |
| `npm run db:push` | push schema to Neon |
| `npm run db:seed` | wipe + insert classes |
| `npm run db:studio` | open Drizzle Studio |

## Deploy notes (short)

- Railway runs `server/` (`railway.json` → `npm start`). Set env vars there (`DATABASE_URL`, `BETTER_AUTH_*`, `CLIENT_URL` with `https://`).
- Vercel builds `pulso-app/`. Point the `/api` rewrite in `vercel.json` at your Railway URL.
- `BETTER_AUTH_URL` = Railway API URL. `CLIENT_URL` = Vercel site URL. Both need `https://`.

## Not in scope

No real payment, no admin panel, contact form is a front-end thank-you only.
