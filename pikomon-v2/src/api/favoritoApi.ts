import type { Favorito } from "../types/Favorito";

const API_URL = "http://localhost:3001/favoritos";

export async function fetchFavoritos(): Promise<Favorito[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar favoritos");
  }

  return res.json();
}

export async function addFavorito(pokemonName: string): Promise<Favorito> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pokemonName }),
  });

  if (!res.ok) {
    throw new Error("Erro ao favoritar pokémon");
  }

  return res.json();
}

export async function removeFavorito(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Erro ao desfavoritar pokémon");
  }
}
