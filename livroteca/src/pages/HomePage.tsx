import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import { useEffect, useState } from "react";
import { ListBooksUseCase } from "../api/ListBooksUseCase";
import { BookCard } from "../components/BookCard";
import { UpdateBookUseCase } from "../api/UpdateBookUseCase";
import { DeleteBookUseCase } from "../api/DeleteBookUseCase";
import { PageShell } from "../components/PageShell";

export function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let canceled = false;

    async function loadBooks() {
      try {
        setLoading(true);
        setError(null);
        const data = await new ListBooksUseCase().handle();
        if (!canceled) {
          setBooks(data);
        }
      } catch (error) {
        console.log("Error to load books", error);
        if (!canceled) {
          setError("Erro ao carregar livros");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      canceled = true;
    };
  }, [reloadKey]);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function handleSaveEdit(id: string, year: number, status: string) {
    try {
      const bookEdited = await new UpdateBookUseCase().handle({
        id,
        year,
        status,
      });
      setBooks((actualBooks) =>
        actualBooks.map((b) => (b.id === id ? bookEdited : b)),
      );
    } catch (error) {
      console.log("Error to update this book", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteBookUseCase().handle(id);
      setBooks((actualBooks) => actualBooks.filter((b) => b.id !== id));
    } catch (error) {
      console.log("Error to delete this book", error);
    }
  }

  return (
    <PageShell>
      <section className="hero">
        <span className="eyebrow">Catálogo pessoal</span>
        <h1>Sua próxima leitura está aqui.</h1>
        <p className="hero-subtitle">
          Organize os livros da sua estante e acompanhe quem está emprestado,
          disponível ou atrasado.
        </p>
        <Link to="/book/new" className="btn btn-primary btn-lg">
          <span aria-hidden="true">+</span> Cadastrar novo livro
        </Link>
      </section>

      {loading && (
        <div className="state-card">
          <p>📖 Vasculhando a estante...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-card state-card-error">
          <p>{error}</p>
          <button
            className="btn btn-outline"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="state-card">
          <p>Nenhum livro por aqui ainda.</p>
          <Link to="/book/new" className="btn btn-outline">
            Cadastrar o primeiro
          </Link>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar pelo título..."
            aria-label="Buscar pelo título"
          />
        </div>
      )}

      {!loading && !error && books.length > 0 && filteredBooks.length === 0 && (
        <div className="state-card">
          <p>Nenhum livro encontrado para "{searchText}".</p>
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="book-grid">
          {filteredBooks.map((b) => (
            <BookCard
              key={b.id}
              book={b}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
