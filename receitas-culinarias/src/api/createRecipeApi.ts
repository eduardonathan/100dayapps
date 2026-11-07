import type { Recipe } from "../types/Recipe";
import { API_URL } from "./config";

export async function createRecipe(
  name: string,
  mainIngredient: string,
  preparationTime: number,
  difficulty: string,
): Promise<Recipe> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mainIngredient, preparationTime, difficulty }),
  });

  if (!res.ok) {
    throw new Error("Error to create recipe");
  }

  return res.json();
}
