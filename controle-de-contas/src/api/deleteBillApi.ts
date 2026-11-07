import { API_URL } from "./config";

export async function deleteBill(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error to delete your bill");
  }
}
