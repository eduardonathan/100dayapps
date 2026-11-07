import type { Pedido } from "../types/Pedido";

const API_URL = "http://localhost:3001/pedidos";

export async function atualizaPedido(
  id: string,
  produto: string,
): Promise<Pedido> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produto }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar pedido.");
  }

  return res.json();
}
