import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListSkateboardsUseCase } from "../usecases/ListSkateboardsUseCase";
import { SkateboardCard } from "../components/SkateboardCard";
import type { Skateboard } from "../types/Skateboard";

const LIMIT = 5;

export function HomePage() {
  const [skateboards, setSkateboards] = useState<Skateboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let canceled = false;

    async function fetchSkateboards() {
      setLoading(true);
      setError(null);
      try {
        // pede 1 item a mais que o limite: se ele vier, existe próxima página
        const data = await new ListSkateboardsUseCase().handle({
          limit: LIMIT + 1,
          offset: (page - 1) * LIMIT,
        });
        if (!canceled) {
          setSkateboards(data.slice(0, LIMIT));
          setHasMore(data.length > LIMIT);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os skates.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchSkateboards();

    return () => {
      canceled = true;
    };
  }, [page]);

  return (
    <div>
      <h1>Skate Shop</h1>
      <Link to="/skateboards/new">Novo skate</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && skateboards.length === 0 && (
        <p>Nenhum skate cadastrado.</p>
      )}

      {!loading && !error && skateboards.length > 0 && (
        <ul>
          {skateboards.map((skateboard) => (
            <SkateboardCard key={skateboard.id} skateboard={skateboard} />
          ))}
        </ul>
      )}

      <div>
        <button
          type="button"
          onClick={() => setPage((current) => current - 1)}
          disabled={page === 1 || loading}
        >
          Anterior
        </button>
        <span> Página {page} </span>
        <button
          type="button"
          onClick={() => setPage((current) => current + 1)}
          disabled={!hasMore || loading}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
