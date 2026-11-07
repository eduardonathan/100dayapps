import type { Recado } from "../types/Recado";

const API_URL = "http://localhost:3001/recados";

export async function fetchRecados(): Promise<Recado[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar recados");
  }

  return res.json();
}

export async function createRecado(texto: string): Promise<Recado> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, curtidas: 0 }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar recado");
  }

  return res.json();
}

interface CurtirInput {
  id: string;
  novasCurtidas: number;
}

export async function curtirRecado({
  id,
  novasCurtidas,
}: CurtirInput): Promise<Recado> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ curtidas: novasCurtidas }),
  });

  if (!res.ok) {
    throw new Error("Erro ao curtir recado");
  }

  return res.json();
}
