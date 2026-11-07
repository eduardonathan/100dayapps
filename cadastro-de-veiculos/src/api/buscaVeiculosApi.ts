import type { Veiculo } from "../types/Veiculo";

const API_URL = "http://localhost:3001/veiculos";

export async function buscaVeiculos(): Promise<Veiculo[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar veículos");
  }

  return res.json();
}
