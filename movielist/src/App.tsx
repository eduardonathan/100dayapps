import { useEffect, useState } from "react";
import type { Movie } from "./types/Movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const DEBOUNCE_DELAY_MS = 500;

export function App() {
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (busca.trim() === "") {
      setFilmes([]);
      setErro(null);
      setCarregando(false);
      return;
    }

    let cancelado = false;

    const timeoutId = setTimeout(() => {
      async function buscarFilmes() {
        setCarregando(true);
        setErro(null);

        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${busca}`,
          );
          const data = await res.json();

          if (!cancelado) {
            if (data.Response === "False") {
              setErro(data.Error);
            } else {
              setFilmes(data.Search);
            }
          }
        } catch (err) {
          if (!cancelado) {
            setErro("Erro ao buscar filmes");
          }
        } finally {
          if (!cancelado) {
            setCarregando(false);
          }
        }
      }

      buscarFilmes();
    }, DEBOUNCE_DELAY_MS);

    return () => {
      cancelado = true;
      clearTimeout(timeoutId);
    };
  }, [busca]);

  return (
    <div>
      <h1>Filmes</h1>
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar filme..."
      />

      {carregando && <p>Carregando...</p>}
      {erro && <p>Erro: {erro}</p>}

      <ul>
        {filmes.map((filme) => (
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
