import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { buscarFilmes } from "./api/buscarFilmes";
import { useDebounce } from "./hooks/useDebounce";

export function App() {
  const [busca, setBusca] = useState("");
  const buscaDebounced = useDebounce(busca, 500);

  const {
    data: filmes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filmes", buscaDebounced],
    queryFn: () => buscarFilmes(buscaDebounced),
    enabled: buscaDebounced.trim() !== "",
  });

  return (
    <div>
      <h1>Filmes</h1>
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar filme..."
      />

      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}

      <ul>
        {filmes?.map((filme) => (
          <li key={filme.imdbID}>
            <img src={filme.Poster} alt={filme.Title} width={80} />
            <p>
              {filme.Title} ({filme.Year})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
