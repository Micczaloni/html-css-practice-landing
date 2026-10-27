export async function startCheckout(planId, quantity = 1) {
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ planId, quantity }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Checkout could not start.");
  window.location.href = data.url;
}
