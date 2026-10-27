import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function checkOrder() {
      if (!orderId) {
        setError("No order was supplied.");
        setLoading(false);
        return;
      }

      for (let attempt = 0; attempt < 5; attempt += 1) {
        const response = await fetch(`/api/stripe/orders/${orderId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (!cancelled) setOrder(data);
          if (data.status === "paid") break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (!cancelled) setLoading(false);
    }

    checkOrder().catch(() => {
      if (!cancelled) {
        setError("We could not load the order.");
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [orderId]);

  return (
    <div className="mx-auto max-w-[640px] px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Payment result</p>
      <h1 className="mt-2 text-3xl font-bold">{loading ? "Confirming your payment…" : "Thank you!"}</h1>

      {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>}
      {!error && !loading && order?.status === "paid" && (
        <div className="mt-5 rounded-lg border border-[#c6d947] bg-[#c6d947]/20 px-4 py-5">
          <p className="font-semibold">Your order is paid.</p>
          <p className="mt-1 text-sm text-gray-700">Order ID: {order.id}</p>
          <p className="mt-1 text-sm text-gray-700">Total: {(order.totalCents / 100).toFixed(2)} €</p>
        </div>
      )}
      {!error && !loading && order?.status !== "paid" && (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
          Payment was received by Checkout, but the webhook is still processing. Please refresh in a moment.
        </p>
      )}
      <Link to="/#classes" className="mt-8 inline-block font-semibold underline">Back to classes</Link>
    </div>
  );
}
