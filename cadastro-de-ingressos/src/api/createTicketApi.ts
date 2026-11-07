import type { Ingresso } from "../types/Ingresso";
import { API_URL } from "./config";

export async function createTicket(
  preco: string,
  dia: string,
  assento: string,
): Promise<Ingresso> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preco, dia, assento }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar ingresso.");
  }

  return res.json();
}
