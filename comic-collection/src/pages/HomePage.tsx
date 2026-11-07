import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListComicsUseCase } from "../usecases/ListComicsUseCase";
import { ComicCard } from "../components/ComicCard";
import type { Comic } from "../types/Comic";

export function HomePage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchComics() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListComicsUseCase().handle();
        if (!canceled) {
          setComics(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os quadrinhos.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchComics();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <h1>Coleção de Quadrinhos</h1>
      <Link to="/comics/new">Novo quadrinho</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && comics.length === 0 && (
        <p>Nenhum quadrinho cadastrado.</p>
      )}

      {!loading && !error && comics.length > 0 && (
        <ul>
          {comics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </ul>
      )}
    </div>
  );
}
