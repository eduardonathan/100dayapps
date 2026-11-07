const API_URL = "http://localhost:3001/produtos";

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar produto");
  }
}
