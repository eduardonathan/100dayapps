import type { Produto } from "../types/Produto";

const API_URL = "http://localhost:3001/produtos";

export async function updateProduct(
  id: string,
  nome: string,
): Promise<Produto> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar produto");
  }

  return res.json();
}
