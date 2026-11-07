import { useState } from "react";
import type { Book } from "../types/Book";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { statusEmoji } from "../utils/statusEmoji";

interface BookCardProps {
  book: Book;
  onSaveEdit: (id: string, year: number, status: string) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onSaveEdit, onDelete }: BookCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [yearEdited, setYearEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const navigate = useNavigate();

  function startEdit() {
    setIsEditing(true);
    setYearEdited(book.year.toString());
    setStatusEdited(book.status);
  }

  function cancelEdit() {
    setIsEditing(false);
    setYearEdited("");
    setStatusEdited("");
  }

  function handleSaveEdit() {
    if (yearEdited.trim() === "" || statusEdited.trim() === "") return;

    const yearEditedNumber = Number(yearEdited);

    onSaveEdit(book.id, yearEditedNumber, statusEdited);

    setIsEditing(false);
    setYearEdited("");
    setStatusEdited("");
  }

  function handleNavigate() {
    navigate(`/book/${book.id}`);
  }

  return (
    <article className="book-card">
      <div className="book-card-top">
        <span className="book-avatar" aria-hidden="true">
          {statusEmoji(book.status)}
        </span>
        <div className="book-card-heading">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
        {!isEditing && <StatusBadge status={book.status} />}
      </div>

      {isEditing ? (
        <div className="book-card-edit">
          <label className="field">
            <span>Ano</span>
            <input
              value={yearEdited}
              onChange={(e) => setYearEdited(e.target.value)}
              inputMode="numeric"
            />
          </label>
          <label className="field">
            <span>Status</span>
            <select
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              <option value="disponível">Disponível</option>
              <option value="emprestado">Emprestado</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </label>
          <div className="book-card-actions">
            <button className="btn btn-primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn-ghost" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="book-card-footer">
          <p className="book-year">{book.year}</p>
          <div className="book-card-actions">
            <button className="btn btn-outline" onClick={startEdit}>
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(book.id)}
            >
              Excluir
            </button>
            <button className="btn btn-outline" onClick={handleNavigate}>
              Detalhes
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
