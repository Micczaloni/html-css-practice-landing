import { Router } from "express";
import Stripe from "stripe";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { db } from "../db/index.js";
import { classes, orders, orderItems } from "../db/schema.js";
import { requireAuth } from "../middleware/require-auth.js";

const router = Router();
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// POST /api/checkout — prices come from the database, never from the browser.
router.post("/checkout", requireAuth, async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: "Stripe is not configured yet." });
    }

    const classId = Number(req.body.classId);
    const quantity = Number(req.body.quantity ?? 1);

    if (!Number.isInteger(classId) || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: "Invalid class or quantity." });
    }

    const [classItem] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, classId))
      .limit(1);

    if (!classItem) return res.status(404).json({ error: "Class not found." });
    if (quantity > classItem.spots) {
      return res.status(400).json({ error: "That quantity is not available." });
    }

    const orderId = randomUUID();
    const totalCents = classItem.priceCents * quantity;

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        userId: req.user.id,
        totalCents,
        status: "pending",
      });
      await tx.insert(orderItems).values({
        orderId,
        classId: classItem.id,
        className: classItem.name,
        quantity,
        unitPriceCents: classItem.priceCents,
      });
    });

    const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `${classItem.name} class` },
            unit_amount: classItem.priceCents,
          },
          quantity,
        },
      ],
      customer_email: req.user.email,
      metadata: { orderId },
      success_url: `${clientUrl}/success?order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/classes/${classItem.id}`,
    });

    await db
      .update(orders)
      .set({ stripeSessionId: session.id })
      .where(eq(orders.id, orderId));

    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

// This endpoint is protected by the logged-in user's session.
router.get("/orders/:id", requireAuth, async (req, res, next) => {
  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, req.params.id), eq(orders.userId, req.user.id)))
      .limit(1);

    if (!order) return res.status(404).json({ error: "Order not found." });
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));
    res.json({ ...order, items });
  } catch (error) {
    next(error);
  }
});

// Stripe calls this after payment. It is the only place that changes pending -> paid.
router.post("/webhook", async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).send("Stripe webhook is not configured yet.");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error.message);
    return res.status(400).send("Invalid webhook signature.");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid" && session.metadata?.orderId) {
      await db
        .update(orders)
        .set({ status: "paid", paidAt: new Date() })
        .where(eq(orders.id, session.metadata.orderId));
    }
  }

  res.json({ received: true });
});

export default router;
