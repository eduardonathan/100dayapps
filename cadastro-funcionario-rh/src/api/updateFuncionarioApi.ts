import type { Funcionario } from "../types/Funcionario";

const API_URL = "http://localhost:3001/funcionarios";

export async function atualizaFuncionario(
  id: string,
  cargo: string,
): Promise<Funcionario> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cargo }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar funcionário");
  }

  return res.json();
}
