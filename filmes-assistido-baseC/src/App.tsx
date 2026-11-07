import { useEffect, useState } from "react";

import "./App.css";
import type { MovieWatched } from "./types/MovieWatched";
import { createWatchedMovie } from "./api/createWatchedMovieApi";
import { fetchWatchedMovies } from "./api/fetchWatchedMoviesApi";
import { updateWatchedMovie } from "./api/updateWatchedMovieApi";
import { deleteMovieWatched } from "./api/deleteWatchedMovieApi";
import { MovieForm } from "./components/MovieForm";
import { MovieCard } from "./components/MovieCard";

function App() {
  const [watchedMovies, setWatchedMovies] = useState<MovieWatched[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleCreateMovie(
    title: string,
    rate: number,
    watchDate: string,
    comment: string,
  ) {
    try {
      const newMovie = await createWatchedMovie(
        title,
        rate,
        watchDate,
        comment,
      );
      setWatchedMovies((actualMovies) => [...actualMovies, newMovie]);
    } catch (error) {
      console.log("Error to create a movie", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadMovies() {
      try {
        setError(null);
        const data = await fetchWatchedMovies();
        if (!canceled) {
          setWatchedMovies(data);
        }
      } catch (error) {
        console.log("Error to load movies", error);
        if (!canceled) {
          setError("Erro ao buscar filmes");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(id: string, rate: number, comment: string) {
    try {
      const movieEdited = await updateWatchedMovie(id, rate, comment);
      setWatchedMovies((actualMovies) =>
        actualMovies.map((m) => (m.id === id ? movieEdited : m)),
      );
    } catch (error) {
      console.log("Error to update movie", error);
    }
  }

  async function handleDeleteMovie(id: string) {
    try {
      await deleteMovieWatched(id);
      setWatchedMovies((actualMovies) =>
        actualMovies.filter((m) => m.id !== id),
      );
    } catch (error) {
      console.log("Error to delete movie", error);
    }
  }

  return (
    <div>
      <MovieForm onCriar={handleCreateMovie} />
      {error && <p>Erro ao buscar filmes</p>}
      {loading && <p>Buscando filmes</p>}
      {!error && !loading && watchedMovies.length === 0 && <p>Não há filmes</p>}
      {watchedMovies.length > 0 &&
        watchedMovies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onSaveEdit={handleSaveEdit}
            onDeleteMovie={handleDeleteMovie}
          />
        ))}
    </div>
  );
}

export default App;
