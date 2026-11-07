const API_URL = "http://localhost:3001/pedidos";
import type { Pedido } from "../types/Pedido";

export async function criaPedido(
  cliente: string,
  produto: string,
  valor: number,
): Promise<Pedido> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente, produto, valor }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar pedido");
  }

  return res.json();
}
