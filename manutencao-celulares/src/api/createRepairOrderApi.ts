import type { RepairOrder } from "../types/RepairOrder";
import { API_URL } from "./config";

export async function createRepairOrder(
  customerName: string,
  deviceModel: string,
  issue: string,
  cost: number,
  status: string,
): Promise<RepairOrder> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerName, deviceModel, issue, cost, status }),
  });

  if (!res.ok) {
    throw new Error("Error to create a repair order");
  }

  return res.json();
}
