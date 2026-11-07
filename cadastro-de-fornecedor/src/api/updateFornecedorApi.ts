import type { Fornecedor } from "../types/Fornecedor";

const API_URL = "http://localhost:3001/fornecedores";

export async function atualizaFornecedor(
  id: string,
  nome: string,
): Promise<Fornecedor> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar fornecedor");
  }

  return res.json();
}
