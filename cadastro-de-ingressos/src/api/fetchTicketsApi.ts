import type { Ingresso } from "../types/Ingresso";
import { API_URL } from "./config";

export async function fetchTickets(): Promise<Ingresso[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar ingressos");
  }

  return res.json();
}
