import type { RepairOrder } from "../types/RepairOrder";
import { API_URL } from "./config";

export async function updateRepairOrder(
  id: string,
  cost: number,
  status: string,
): Promise<RepairOrder> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cost, status }),
  });

  if (!res.ok) {
    throw new Error("Error to update repair order");
  }

  return res.json();
}
