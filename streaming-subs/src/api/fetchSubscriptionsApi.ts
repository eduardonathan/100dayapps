import type { Subscription } from "../types/Subscription";
import { API_URL } from "./config";

export async function fetchSubscriptions(): Promise<Subscription[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to fetch subscriptions");
  }

  return res.json();
}
