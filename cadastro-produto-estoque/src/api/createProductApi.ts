import type { Produto } from "../types/Produto";

const API_URL = "http://localhost:3001/produtos";

export async function createProduct(
  nome: string,
  preco: number,
  quantidade: number,
): Promise<Produto> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, quantidade }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar Produto");
  }

  return res.json();
}
