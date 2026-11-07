import type { Fornecedor } from "../types/Fornecedor";

const API_URL = "http://localhost:3001/fornecedores";

export async function criaFornecedor(
  nome: string,
  cnpj: string,
  telefone: string,
): Promise<Fornecedor> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, cnpj, telefone }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar fornecedor.");
  }

  return res.json();
}
