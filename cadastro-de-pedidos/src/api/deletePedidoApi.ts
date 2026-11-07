const API_URL = "http://localhost:3001/pedidos";

export async function deletaPedido(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao excluir pedido");
  }
}
