import type { Funcionario } from "../types/Funcionario";

const API_URL = "http://localhost:3001/funcionarios";

export async function handleCreateFuncionario(
  nome: string,
  cargo: string,
  salario: number,
): Promise<Funcionario> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, cargo, salario }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar funcionário.");
  }

  return res.json();
}
