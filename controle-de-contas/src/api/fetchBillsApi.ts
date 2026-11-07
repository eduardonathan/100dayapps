import type { Bill } from "../types/Bill";
import { API_URL } from "./config";

export async function fetchBills(): Promise<Bill[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to load your bills");
  }

  return res.json();
}
