import type { Recipe } from "../types/Recipe";
import { API_URL } from "./config";

export async function updateRecipe(
  id: string,
  preparationTime: number,
  difficulty: string,
): Promise<Recipe> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preparationTime, difficulty }),
  });

  if (!res.ok) {
    throw new Error("Error to update recipe");
  }

  return res.json();
}
