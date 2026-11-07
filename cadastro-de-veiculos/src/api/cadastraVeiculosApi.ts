import type { Veiculo } from "../types/Veiculo";

const API_URL = "http://localhost:3001/veiculos";

export async function criaVeiculo(
  placa: string,
  modelo: string,
  ano: number,
): Promise<Veiculo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ placa, modelo, ano }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar veiculo");
  }

  return res.json();
}
