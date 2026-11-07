import { useEffect, useState, type FormEvent } from "react";

import "./App.css";
import type { MovieWatched } from "./types/MovieWatched";
import { createWatchedMovie } from "./api/createWatchedMovieApi";
import { fetchWatchedMovies } from "./api/fetchWatchedMoviesApi";
import { updateWatchedMovie } from "./api/updateWatchedMovieApi";
import { deleteMovieWatched } from "./api/deleteWatchedMovieApi";

function ratingTone(rate: number | null | undefined) {
  if (rate === null || rate === undefined || Number.isNaN(rate)) return "neutral";
  if (rate >= 7) return "good";
  if (rate >= 4) return "mid";
  return "low";
}

function RatingBadge({ rate }: { rate: number | null | undefined }) {
  const hasRate = rate !== null && rate !== undefined && !Number.isNaN(rate);
  return (
    <span className={`rating-badge rating-badge--${ratingTone(rate)}`}>
      <svg viewBox="0 0 20 20" className="rating-badge__star" aria-hidden="true">
        <path d="M10 1.5l2.59 5.25 5.8.84-4.2 4.1 1 5.78L10 14.9l-5.19 2.57 1-5.78-4.2-4.1 5.8-.84L10 1.5z" />
      </svg>
      {hasRate ? rate : "—"}
    </span>
  );
}

function App() {
  const [watchedMovies, setWatchedMovies] = useState<MovieWatched[]>([]);
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [watchDate, setWatchDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rateEdited, setRateEdited] = useState("");
  const [commentEdited, setCommentEdited] = useState("");

  async function handleCreateMovie(event: FormEvent) {
    event.preventDefault();

    if (
      title.trim() === "" ||
      rate.trim() === "" ||
      comment.trim() === "" ||
      watchDate.trim() === ""
    )
      return;
    const rateNumber = Number(rate);

    setSubmitting(true);
    try {
      const newMovie = await createWatchedMovie(
        title,
        rateNumber,
        watchDate,
        comment,
      );
      setWatchedMovies((actualMovies) => [...actualMovies, newMovie]);
      setTitle("");
      setRate("");
      setWatchDate("");
      setComment("");
    } catch (error) {
      console.log("Error to create a movie", error);
    } finally {
      setSubmitting(false);
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

  function handleStartEdit(movie: MovieWatched) {
    setEditingId(movie.id);
    setRateEdited(movie.rate.toString());
    setCommentEdited(movie.comment);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setRateEdited("");
    setCommentEdited("");
  }

  async function handleSaveEdit(id: string) {
    if (rateEdited.trim() === "" || commentEdited.trim() === "") return;

    try {
      const movieEdited = await updateWatchedMovie(
        id,
        Number(rateEdited),
        commentEdited,
      );
      setWatchedMovies((actualMovies) =>
        actualMovies.map((m) => (m.id === id ? movieEdited : m)),
      );
      setEditingId(null);
      setRateEdited("");
      setCommentEdited("");
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
      console.log("Error to delete movie");
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <span className="page-header__eyebrow">🎬 Meu diário de cinema</span>
        <h1>Filmes Assistidos</h1>
        <p className="page-header__subtitle">
          Guarde a nota e a resenha de cada filme que você assistiu.
        </p>
      </header>

      <form className="review-form" onSubmit={handleCreateMovie}>
        <div className="review-form__grid">
          <label className="field field--title">
            <span className="field__label">Título</span>
            <input
              className="field__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do filme"
            />
          </label>
          <label className="field">
            <span className="field__label">Nota (0 a 10)</span>
            <input
              className="field__input"
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="8.5"
            />
          </label>
          <label className="field">
            <span className="field__label">Data que assistiu</span>
            <input
              className="field__input"
              value={watchDate}
              onChange={(e) => setWatchDate(e.target.value)}
              placeholder="12/08/2026"
            />
          </label>
          <label className="field field--comment">
            <span className="field__label">Resenha</span>
            <textarea
              className="field__input field__textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="O que você achou do filme?"
              rows={2}
            />
          </label>
        </div>
        <button className="submit-btn" type="submit" disabled={submitting}>
          {submitting ? "Publicando..." : "Publicar avaliação"}
        </button>
      </form>

      {error && <p className="status-message status-message--error">⚠️ {error}</p>}
      {loading && <p className="status-message">Buscando filmes...</p>}
      {!error && !loading && watchedMovies.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">🍿</span>
          <p>Nenhum filme por aqui ainda. Adicione sua primeira resenha!</p>
        </div>
      )}

      {watchedMovies.length > 0 && (
        <ul className="movie-list">
          {watchedMovies.map((m) => (
            <li className="movie-card" key={m.id}>
              {editingId === m.id ? (
                <div className="movie-card__edit">
                  <div className="movie-card__edit-header">
                    <h3>{m.title}</h3>
                    <span className="movie-card__date">{m.watchDate}</span>
                  </div>
                  <label className="field">
                    <span className="field__label">Nota (0 a 10)</span>
                    <input
                      className="field__input"
                      type="number"
                      min={0}
                      max={10}
                      step={0.5}
                      value={rateEdited}
                      onChange={(e) => setRateEdited(e.target.value)}
                      placeholder="Nota do filme"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Resenha</span>
                    <textarea
                      className="field__input field__textarea"
                      value={commentEdited}
                      onChange={(e) => setCommentEdited(e.target.value)}
                      placeholder="Comentário sobre o filme"
                      rows={2}
                    />
                  </label>
                  <div className="movie-card__actions">
                    <button className="btn btn--ghost" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                    <button
                      className="btn btn--primary"
                      onClick={() => handleSaveEdit(m.id)}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="movie-card__header">
                    <div>
                      <h3 className="movie-card__title">{m.title}</h3>
                      <span className="movie-card__date">{m.watchDate}</span>
                    </div>
                    <RatingBadge rate={m.rate} />
                  </div>
                  <p className="movie-card__comment">{m.comment}</p>
                  <div className="movie-card__actions">
                    <button
                      className="btn btn--ghost"
                      onClick={() => handleStartEdit(m)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn--danger"
                      onClick={() => handleDeleteMovie(m.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
