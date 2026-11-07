import type { Filme } from "../types/Filme";

const API_URL = "http://localhost:3001/filmes";

export async function criaFilme(
  titulo: string,
  genero: string,
  duracaoMinutos: number,
): Promise<Filme> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, genero, duracaoMinutos }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar filme");
  }

  return res.json();
}
