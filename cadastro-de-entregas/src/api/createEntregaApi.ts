import type { Entrega } from "../types/Entrega";

const API_URL = "http://localhost:3001/entregas";

export async function criaEntrega(
  destinatario: string,
  endereco: string,
  status: string,
): Promise<Entrega> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destinatario, endereco, status }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar entrega");
  }
  return res.json();
}
