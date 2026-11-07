import type { Filme } from "../types/Filme";

const API_URL = "http://localhost:3001/filmes";

export async function atualizaFilme(
  id: string,
  titulo: string,
): Promise<Filme> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar filme");
  }

  return res.json();
}
