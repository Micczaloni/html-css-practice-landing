# PULSO Stripe Checkout — presentation cheat sheet

## One-sentence explanation

The signed-in user chooses a membership plan, the server reads its real price
from Neon, creates a pending order and a Stripe Checkout Session, and only the
verified Stripe webhook can mark that order as paid.

## Database tables

| Table | Purpose |
|---|---|
| `user` | One row for each registered PULSO user. |
| `account` | How the user authenticates, for example with a password. It is not the same as `user`. |
| `session` | Active login sessions connecting a browser to a user. |
| `verification` | Temporary verification or password-reset records. |
| `classes` | Fitness schedule: day, time, coach, level and capacity. Classes are not products. |
| `plans` | Products for sale: Basic, Pro and Premium, with price and features. |
| `orders` | One row per checkout attempt/purchase. Starts as `pending`, then becomes `paid`. |
| `order_items` | What the order contained: plan, quantity and price snapshot. |

Prices are integers in cents: `7900` means €79.00.

## Exact payment flow

### 1. Authentication

Better Auth creates a `user` and a `session`. The browser sends the session
cookie with API requests. `require-auth.js` blocks checkout with HTTP `401` if
there is no valid session.

### 2. Selecting a plan

The frontend loads plans from:

```text
GET /api/plans
```

The browser sends only the selected `planId`, never the price.

### 3. Creating the order and Checkout Session

The frontend calls:

```text
POST /api/stripe/checkout
```

Example body:

```json
{
  "planId": 2,
  "quantity": 1
}
```

The server looks up plan `2` in the `plans` table, calculates the total, and
creates an order with `status = pending`. It also creates an `order_items` row
with the plan name and price snapshot.

Then the server calls `stripe.checkout.sessions.create(...)` with:

- the database price in `unit_amount`,
- `metadata.orderId`,
- a success URL,
- a cancel URL.

Stripe returns a hosted Checkout URL. The frontend redirects the browser to
that URL. Card details are entered on Stripe's page, not stored by PULSO.

### 4. Completing the test payment

Use:

```text
Card: 4242 4242 4242 4242
Expiry: any future date
CVC: any three digits
```

This is a real Stripe test-mode Checkout Session, but no real money moves.

### 5. Receiving and verifying the webhook

Stripe sends `checkout.session.completed` to:

```text
POST /api/stripe/webhook
```

Locally, Stripe CLI forwards the event to localhost. In production, the Stripe
Dashboard sends it directly to Railway.

The route receives the raw request body and verifies the `stripe-signature`
header using `STRIPE_WEBHOOK_SECRET`. An invalid signature is rejected.

Only after verification does the route read `orderId` from Stripe metadata and
update:

```text
orders.status = paid
orders.paidAt = current time
```

The checkout route never marks an order as paid. A redirect alone is not proof
of payment; the verified webhook is the source of truth.

### 6. Success page

Stripe redirects to:

```text
/success?order_id=...
```

The success page calls:

```text
GET /api/stripe/orders/:id
```

It retries several times because the redirect can happen slightly before the
webhook finishes. When the API returns `status: "paid"`, it displays the order
ID and total.

## What to show at assessment

1. Sign in.
2. Choose Basic, Pro or Premium.
3. Complete Stripe Checkout with the test card.
4. Show `Your order is paid` on the success page.
5. Open Neon and show the matching `orders` row with `status = paid`.
6. Show the matching `order_items` row with the plan and price.
7. Explain that the webhook, not the success page, changed the order status.

## Short English explanation

> “The browser sends only the plan ID. The server reads the real price from the
> database, creates a pending order and starts a Stripe Checkout Session.”

> “After payment, Stripe sends a signed checkout.session.completed webhook. The
> server verifies the signature and this webhook is the only place allowed to
> change the order from pending to paid.”

> “The success page then looks up the order through our API and displays the
> confirmed database status.”
