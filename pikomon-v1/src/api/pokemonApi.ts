import type { PokemonListResponse } from "../types/Pokemon";

export const LIMIT = 20;

export async function fetchPokemons(
  pagina: number,
): Promise<PokemonListResponse> {
  const offset = (pagina - 1) * LIMIT;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar pokémons");
  }

  return res.json();
}
