import type { Pedido } from "../types/Pedido";

const API_URL = "http://localhost:3001/pedidos";

export async function buscaPedidos(): Promise<Pedido[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar pedidos");
  }

  return res.json();
}
