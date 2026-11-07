import { useEffect, useState } from "react";
import { fetchPokemons, LIMIT } from "./api/pokemonApi";
import "./App.css";
import type { PokemonListItem } from "./types/Pokemon";
import type { Favorito } from "./types/Favorito";
import {
  addFavorito,
  fetchFavoritos,
  removeFavorito,
} from "./api/favoritosApi";

function App() {
  const [pagina, setPagina] = useState(1);
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [isError, setIsError] = useState(false);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  const ultimaPagina = pagina * LIMIT >= totalPokemons;

  useEffect(() => {
    let cancelado = false;

    const loadPokemons = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchPokemons(pagina);

        if (!cancelado) {
          setPokemon(data.results);
          setTotalPokemons(data.count);
        }
      } catch (error) {
        if (!cancelado) {
          setIsError(true);
        }
      } finally {
        if (!cancelado) {
          setIsLoading(false);
        }
      }
    };
    loadPokemons();

    return () => {
      cancelado = true;
    };
  }, [pagina]);

  useEffect(() => {
    let cancelado = false;

    const load = async () => {
      try {
        const data = await fetchFavoritos();
        if (!cancelado) {
          setFavoritos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };
    load();

    return () => {
      cancelado = true;
    };
  }, []);

  async function handleToggleFavorito(nomePokemon: string) {
    const favoritoExistente = favoritos.find(
      (fav) => fav.pokemonName === nomePokemon,
    );

    try {
      if (favoritoExistente) {
        await removeFavorito(favoritoExistente.id);
      } else {
        await addFavorito(nomePokemon);
      }
      const dataAtualizada = await fetchFavoritos();
      setFavoritos(dataAtualizada);
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar:", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Carregando pokemons...</p>
      ) : (
        <div>
          <h1>POKEMON LIST</h1>
          <ul>
            {pokemon.map((p) => {
              const ehFavorito = favoritos.some(
                (f) => f.pokemonName === p.name,
              );

              return (
                <li key={p.name}>
                  {p.name}
                  <button onClick={() => handleToggleFavorito(p.name)}>
                    {ehFavorito ? "★ favorito" : "☆ favoritar"}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina === 1}
          >
            anterior
          </button>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={ultimaPagina}
          >
            proximo
          </button>
        </div>
      )}
      {isError ? <p>Erro ao carregar pokemons...</p> : null}
    </>
  );
}

export default App;
