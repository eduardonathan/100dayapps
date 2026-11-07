import type { Funcionario } from "../types/Funcionario";

const API_URL = "http://localhost:3001/funcionarios";

export async function buscaFuncionarios(): Promise<Funcionario[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar funcionarios");
  }

  return res.json();
}
