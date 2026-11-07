import type { Fornecedor } from "../types/Fornecedor";

const API_URL = "http://localhost:3001/fornecedores";

export async function buscaFornecedores(): Promise<Fornecedor[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar fornecedores");
  }

  return res.json();
}
