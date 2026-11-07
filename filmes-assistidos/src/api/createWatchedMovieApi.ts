import type { MovieWatched } from "../types/MovieWatched";
import { API_URL } from "./config";

export async function createWatchedMovie(
  title: string,
  rate: number,
  watchDate: string,
  comment: string,
): Promise<MovieWatched> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, rate, watchDate, comment }),
  });

  if (!res.ok) {
    throw new Error("Error to create a movie");
  }

  return res.json();
}
