import type { MovieWatched } from "../types/MovieWatched";
import { API_URL } from "./config";

export async function updateWatchedMovie(
  id: string,
  rate: number,
  comment: string,
): Promise<MovieWatched> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rate, comment }),
  });

  if (!res.ok) {
    throw new Error("Error to update movie");
  }

  return res.json();
}
