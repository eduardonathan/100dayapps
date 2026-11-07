import type { Produto } from "../types/Produto";

const API_URL = "http://localhost:3001/produtos";

export async function fetchProducts(): Promise<Produto[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos no estoque");
  }

  return res.json();
}
