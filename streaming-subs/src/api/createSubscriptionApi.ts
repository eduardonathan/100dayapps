import type { Subscription } from "../types/Subscription";
import { API_URL } from "./config";

export async function createSubscription(
  serviceName: string,
  plan: string,
  price: number,
  renewDate: string,
): Promise<Subscription> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceName, plan, price, renewDate }),
  });

  if (!res.ok) {
    throw new Error("Error to create subscription");
  }

  return res.json();
}
