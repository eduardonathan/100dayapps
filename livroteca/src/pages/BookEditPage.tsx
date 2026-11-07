import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateBookUseCase } from "../api/UpdateBookUseCase";
import { GetBookByIdUseCase } from "../api/GetBookByIdUseCase";
import type { Book } from "../types/Book";
import { PageShell } from "../components/PageShell";
import { statusEmoji } from "../utils/statusEmoji";

export function BookEditPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();

    if (!id || year.trim() === "" || status.trim() === "") return;

    const yearN = Number(year);

    try {
      await new UpdateBookUseCase().handle({
        id,
        year: yearN,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to update this book", error);
    }
  }

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
          setYear(String(bookById.year));
          setStatus(bookById.status);
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

        {!loading && (error || !book) && (
          <div className="state-card state-card-error">
            <p>{error ?? "Erro ao buscar livro"}</p>
          </div>
        )}

        {!loading && book && (
          <div className="card form-card">
            <div className="book-card-top">
              <span className="book-avatar" aria-hidden="true">
                {statusEmoji(book.status)}
              </span>
              <div className="book-card-heading">
                <h1 className="form-title book-title">{book.title}</h1>
                <p className="book-author">{book.author}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="form-grid">
              <label className="field">
                <span>Ano</span>
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Ex: 1965"
                  inputMode="numeric"
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="disponível">Disponível</option>
                  <option value="emprestado">Emprestado</option>
                  <option value="atrasado">Atrasado</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-lg">
                Salvar alterações
              </button>
            </form>
          </div>
        )}
      </div>
    </PageShell>
  );
}
