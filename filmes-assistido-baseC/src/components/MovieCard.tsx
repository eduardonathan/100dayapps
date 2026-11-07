import { useState } from "react";
import type { MovieWatched } from "../types/MovieWatched";

interface MovieCardProps {
  movie: MovieWatched;
  onSaveEdit: (id: string, rate: number, comment: string) => void;
  onDeleteMovie: (id: string) => void;
}

export function MovieCard({
  movie,
  onSaveEdit,
  onDeleteMovie,
}: MovieCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [rateEdited, setRateEdited] = useState("");
  const [commentEdited, setCommentEdited] = useState("");

  function handleStartEdit() {
    setIsEditing(true);
    setRateEdited(movie.rate.toString());
    setCommentEdited(movie.comment);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setRateEdited("");
    setCommentEdited("");
  }

  function handleSaveEdit() {
    if (rateEdited.trim() === "" || commentEdited.trim() === "") return;
    const rateEditedNumber = Number(rateEdited);
    onSaveEdit(movie.id, rateEditedNumber, commentEdited);
    setIsEditing(false);
    setRateEdited("");
    setCommentEdited("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "22px",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      <p>Filme: {movie.title}</p>
      <p>Data: {movie.watchDate}</p>
      {isEditing ? (
        <div>
          <input
            value={rateEdited}
            onChange={(e) => setRateEdited(e.target.value)}
            placeholder="Nota do filme"
          />
          <input
            value={commentEdited}
            onChange={(e) => setCommentEdited(e.target.value)}
            placeholder="Comentário sobre o filme"
          />
          <button onClick={handleCancelEdit}>Cancelar</button>
          <button onClick={handleSaveEdit}>Salvar</button>
        </div>
      ) : (
        <div>
          <p>Nota: {movie.rate}</p>
          <p>Comentário: {movie.comment}</p>
          <button onClick={handleStartEdit}>Editar</button>
          <button onClick={() => onDeleteMovie(movie.id)}>Excluir</button>
        </div>
      )}
    </div>
  );
}
