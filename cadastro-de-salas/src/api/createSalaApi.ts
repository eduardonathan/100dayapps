import type { Sala } from "../types/Sala";

const API_URL = "http://localhost:3001/salas";

export async function criaSala(
  nome: string,
  capacidade: number,
  andar: string,
): Promise<Sala> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, capacidade, andar }),
  });

  if (!res.ok) {
    throw new Error("erro ao criar sala");
  }

  return res.json();
}
