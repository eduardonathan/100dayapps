import type { Veiculo } from "../types/Veiculo";

const API_URL = "http://localhost:3001/veiculos";

export async function atualizaVeiculo(
  id: string,
  placa: string,
): Promise<Veiculo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ placa }),
  });

  if (!res.ok) {
    throw new Error("Não foi possível atualizar o veículo");
  }

  return res.json();
}
