import type { Subscription } from "../types/Subscription";
import { API_URL } from "./config";

export async function updateSubscription(
  id: string,
  plan: string,
  price: number,
): Promise<Subscription> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, price }),
  });

  if (!res.ok) {
    throw new Error("Error to update subscription");
  }

  return res.json();
}
