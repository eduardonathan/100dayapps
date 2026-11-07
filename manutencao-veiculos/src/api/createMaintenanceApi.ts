import type { Maintenance } from "../types/Maintenance";
import { API_URL } from "./config";

export async function createMaintenance(
  vehicle: string,
  typeSerivce: string,
  price: number,
  status: string,
): Promise<Maintenance> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicle, typeSerivce, price, status }),
  });

  if (!res.ok) {
    throw new Error("Error to create a new maintenance");
  }

  return res.json();
}
