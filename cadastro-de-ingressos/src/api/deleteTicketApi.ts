import { API_URL } from "./config";

export async function deleteTicket(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar ingresso");
  }
}
