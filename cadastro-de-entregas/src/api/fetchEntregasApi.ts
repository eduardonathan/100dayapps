import type { Entrega } from "../types/Entrega";

const API_URL = "http://localhost:3001/entregas";

export async function buscaEntregas(): Promise<Entrega[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar entregas");
  }

  return res.json();
}
