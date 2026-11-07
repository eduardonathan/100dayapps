import type { Sala } from "../types/Sala";

const API_URL = "http://localhost:3001/salas";

export async function fetchSalas(): Promise<Sala[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar as salas.");
  }

  return res.json();
}
