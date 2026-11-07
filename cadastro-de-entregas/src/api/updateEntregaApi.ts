import type { Entrega } from "../types/Entrega";

const API_URL = "http://localhost:3001/entregas";

export async function atualizaEntrega(
  id: string,
  status: string,
): Promise<Entrega> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar entrega");
  }

  return res.json();
}
