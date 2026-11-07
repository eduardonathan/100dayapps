import type { Cliente } from "../types/Cliente";

const API_URL = "http://localhost:3001/clientes";

export async function atualizaCliente(
  id: string,
  email: string,
): Promise<Cliente> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar clinete");
  }

  return res.json();
}
