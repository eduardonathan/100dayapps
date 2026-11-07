const API_URL = "http://localhost:3001/fornecedores";

export async function deletaFornecedor(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Não foi possivel deletar o fornecedor");
  }
}
