import type { Bill } from "../types/Bill";
import { API_URL } from "./config";

export async function createBill(
  dueDate: string,
  status: string,
  total: string,
  type: string,
): Promise<Bill> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dueDate, status, total, type }),
  });

  if (!res.ok) {
    throw new Error("Error to create Bill");
  }

  return res.json();
}
