import type { Recipe } from "../types/Recipe";
import { API_URL } from "./config";

export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to fetch recipes");
  }

  return res.json();
}
