import type { Cliente } from "../types/Cliente";

const API_URL = "http://localhost:3001/clientes";

export async function createCliente(
  nome: string,
  email: string,
): Promise<Cliente> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar cliente");
  }

  return res.json();
}
