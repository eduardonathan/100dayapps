import type { Favorito } from "../types/Favorito";

const URL_API = "http://localhost:3001/favoritos";

export async function fetchFavoritos(): Promise<Favorito[]> {
  const res = await fetch(URL_API);

  if (!res.ok) {
    throw new Error("Erro ao buscar favoritos");
  }

  return res.json();
}

export async function addFavorito(pokemonName: string): Promise<Favorito> {
  const res = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pokemonName }),
  });

  return res.json();
}

export async function removeFavorito(id: string) {
  const res = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao desfavoritar pokémon");
  }
}
