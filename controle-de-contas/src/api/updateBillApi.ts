import type { Bill } from "../types/Bill";
import { API_URL } from "./config";

export async function updateBill(id: string, status: string): Promise<Bill> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Error to update your bill");
  }

  return res.json();
}
