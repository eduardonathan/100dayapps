import type { Sala } from "../types/Sala";

const API_URL = "http://localhost:3001/salas";

export async function atualizaSala(id: string, andar: string): Promise<Sala> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ andar }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar sala.");
  }

  return res.json();
}
