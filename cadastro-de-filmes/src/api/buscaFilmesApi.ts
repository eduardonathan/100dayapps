import type { Filme } from "../types/Filme";

const API_URL = "http://localhost:3001/filmes";

export async function buscaFilmes(): Promise<Filme[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("erro ao buscar filmes");
  }

  return res.json();
}
