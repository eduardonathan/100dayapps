import type { Maintenance } from "../types/Maintenance";
import { API_URL } from "./config";

export async function fetchMaintenances(): Promise<Maintenance[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to fetch maintenances");
  }

  return res.json();
}
