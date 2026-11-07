import type { Cliente } from "../types/Cliente";

const API_URL = "http://localhost:3001/clientes";

export async function buscaClientes(): Promise<Cliente[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar clientes");
  }

  return res.json();
}
