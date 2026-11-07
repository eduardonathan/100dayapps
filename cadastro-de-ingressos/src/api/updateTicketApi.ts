import type { Ingresso } from "../types/Ingresso";
import { API_URL } from "./config";

export async function updateTicket(
  id: string,
  preco: string,
): Promise<Ingresso> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preco }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar ingresso");
  }

  return res.json();
}
