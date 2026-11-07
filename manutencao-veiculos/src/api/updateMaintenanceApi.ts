import type { Maintenance } from "../types/Maintenance";
import { API_URL } from "./config";

export async function updateMaintenace(
  id: string,
  typeSerivce: string,
  status: string,
  price: number,
): Promise<Maintenance> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ typeSerivce, status, price }),
  });

  if (!res.ok) {
    throw new Error("Error to update this maintenance");
  }

  return res.json();
}
