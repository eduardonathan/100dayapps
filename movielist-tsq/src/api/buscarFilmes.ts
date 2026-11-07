import type { Movie } from "../types/Movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function buscarFilmes(busca: string): Promise<Movie[]> {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${busca}`,
  );
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search;
}
