import type { RepairOrder } from "../types/RepairOrder";
import { API_URL } from "./config";

export async function fetchRepairOrders(): Promise<RepairOrder[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to fetch repair orders");
  }

  return res.json();
}
