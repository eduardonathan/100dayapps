import type { MovieWatched } from "../types/MovieWatched";
import { API_URL } from "./config";

export async function fetchWatchedMovies(): Promise<MovieWatched[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error to fetch movies");
  }

  return res.json();
}
