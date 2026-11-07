import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetBookByIdUseCase } from "../api/GetBookByIdUseCase";
import { PageShell } from "../components/PageShell";
import { StatusBadge } from "../components/StatusBadge";
import { statusEmoji } from "../utils/statusEmoji";

export function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let canceled = false;

    if (!id) return;

    async function loadBook() {
      try {
        setLoading(true);
        setError(null);
        const bookById = await new GetBookByIdUseCase().handle(id!);
        if (!canceled) {
          setBook(bookById);
        }
      } catch (error) {
        console.log("Error to load this book data.", error);
        if (!canceled) {
          setError("Erro ao buscar dados do livro");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => {
      canceled = true;
    };
  }, [id]);

  return (
    <PageShell>
      <div className="form-page">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        {loading && (
          <div className="state-card">
            <p>📖 Procurando o livro...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-card state-card-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && book && (
          <div className="card form-card">
            <div className="book-card-top">
              <span className="book-avatar" aria-hidden="true">
                {statusEmoji(book.status)}
              </span>
              <div className="book-card-heading">
                <h1 className="form-title book-title">{book.title}</h1>
                <p className="book-author">{book.author}</p>
              </div>
              <StatusBadge status={book.status} />
            </div>
            <p className="book-year">{book.year}</p>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/book/${id}/edit`)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
