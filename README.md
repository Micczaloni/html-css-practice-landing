# PULSO — fitness studio (course project)

Week 1 was plain HTML/CSS. Week 2 moved the same landing into **Vite + React + Tailwind**.  
Week 3 adds a small backend: **Express + Neon (Postgres) + Drizzle + Better Auth**.

Live-ish setup (when deployed):

- **Frontend** → Vercel (`pulso-app/`)
- **API** → Railway (`server/`)
- **Database** → Neon (Postgres in the cloud)

Locally the frontend proxies `/api` to Express (see `pulso-app/vite.config.js`).  
On Vercel the same idea is in `pulso-app/vercel.json` (rewrite `/api` → Railway).

## Start here: work locally and verify the real deployment

### Local development

Use three PowerShell terminals from the project root.

**Terminal 1 — API:**

```powershell
cd C:\Users\leagu\OneDrive\Desktop\mayrfield\server
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

**Terminal 2 — Stripe webhook listener:**

```powershell
cd C:\Users\leagu\OneDrive\Desktop\mayrfield
stripe login
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_...` printed by this command into `server/.env` as
`STRIPE_WEBHOOK_SECRET`. Keep this terminal open while testing locally.

**Terminal 3 — frontend:**

```powershell
cd C:\Users\leagu\OneDrive\Desktop\mayrfield\pulso-app
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The local test flow is: create an account → sign in → choose Basic, Pro or
Premium → pay with `4242 4242 4242 4242` → use any future date and any CVC.

### Work on the public domain

The public application is:

```text
https://html-css-practice-landing.vercel.app/
```

You do not run the frontend or backend terminals for the public version. Push
your changes to GitHub and let the connected services deploy them:

```powershell
cd C:\Users\leagu\OneDrive\Desktop\mayrfield
git status
git add -A
git commit -m "describe the change"
git push origin main
```

Then check **Deployments** in both Railway and Vercel. Railway deploys the
Express API from `server/`; Vercel deploys the React frontend from
`pulso-app/`. The deployed API should respond at:

```text
https://html-css-practice-landing-production.up.railway.app/api/health
https://html-css-practice-landing-production.up.railway.app/api/plans
```

For production payments, Stripe Dashboard must send the webhook directly to:

```text
https://html-css-practice-landing-production.up.railway.app/api/stripe/webhook
```

Do not use the local `stripe listen` secret for the production Railway
variable. The Dashboard webhook has its own signing secret.

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

## Stripe test payments (Assignment 4)

The membership buttons now create a real Stripe Checkout Session in test mode.
The server reads the plan price from Neon, creates a `pending` order, and sends
the browser to Stripe. Only the signed webhook can change that order to `paid`.

### One-time setup

1. Create a Stripe account and make sure the dashboard is in **Test mode**.
2. Copy the **Secret key** from Developers → API keys into `server/.env`:

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

3. Push the schema (already done for the current Neon database when developing locally):

```bash
cd server
npm run db:push
```

4. Install and log in to the Stripe CLI, then run this while the API is running:

```bash
stripe login
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_...` printed by `stripe listen` into `STRIPE_WEBHOOK_SECRET` and restart the API.

### Test the complete flow

Run the API and frontend in separate terminals. Create an account, sign in,
choose a membership plan, and pay in Stripe Checkout with `4242 4242 4242 4242`, any
future expiry date, and any CVC. Stripe CLI should show the webhook request;
the success page then reads the order and displays `paid`.

The important tables are:

- `orders`: one row per purchase, linked to the authenticated `user`.
- `order_items`: the plan, quantity, and price snapshot bought in that order.

`stripeSessionId` and `orderId` connect the Checkout Session to the database order.

### Production on Railway + Vercel

Local `stripe listen` only forwards events to localhost. For production, add these
variables to the Railway service running `server/`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
BETTER_AUTH_URL=https://html-css-practice-landing-production.up.railway.app
CLIENT_URL=https://html-css-practice-landing.vercel.app
```

In Stripe Dashboard → Developers → Webhooks, create a test-mode endpoint:

```text
https://html-css-practice-landing-production.up.railway.app/api/stripe/webhook
```

Subscribe it to `checkout.session.completed` and copy its signing secret into
Railway as `STRIPE_WEBHOOK_SECRET`. Vercel already rewrites `/api/*` to Railway;
after deploying the latest commits, the same checkout flow works on the public URL.
