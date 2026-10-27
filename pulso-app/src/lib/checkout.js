export async function startCheckout(classId, quantity) {
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ classId, quantity }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Checkout could not start.");
  window.location.href = data.url;
}
