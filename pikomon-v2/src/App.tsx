import { useState } from "react";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemons, LIMIT } from "./api/pokemonApi";
import { fetchFavoritos, addFavorito, removeFavorito } from "./api/favoritoApi";

function App() {
  const [pagina, setPagina] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["pokemons", pagina],
    queryFn: () => fetchPokemons(pagina),
    placeholderData: (dadoAnterior) => dadoAnterior,
  });

  const { data: favoritos } = useQuery({
    queryKey: ["favoritos"],
    queryFn: fetchFavoritos,
  });

  const addMutation = useMutation({
    mutationFn: addFavorito,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorito,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    },
  });

  function handleToggleFavorito(nomePokemon: string) {
    const favoritoExistente = favoritos.find(
      (f) => f.pokemonName === nomePokemon,
    );

    if (favoritoExistente) {
      removeMutation.mutate(favoritoExistente.id);
    } else {
      addMutation.mutate(nomePokemon);
    }
  }

  if (isLoading) return <p>Carregando pokémons...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const ultimaPagina = pagina * LIMIT >= (data?.count ?? 0);

  return (
    <div>
      <h1>POKEMON LIST</h1>
      <ul style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
        {data?.results.map((p) => {
          const ehFavorito =
            favoritos?.some((f) => f.pokemonName === p.name) ?? false;

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

      <button onClick={() => setPagina((p) => p - 1)} disabled={pagina === 1}>
        anterior
      </button>
      <button onClick={() => setPagina((p) => p + 1)} disabled={ultimaPagina}>
        proximo
      </button>
    </div>
  );
}

export default App;
