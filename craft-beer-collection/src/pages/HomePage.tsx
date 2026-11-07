import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListBeersUseCase } from "../usecases/ListBeersUseCase";
import { BeerCard } from "../components/BeerCard";
import type { Beer } from "../types/Beer";

export function HomePage() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  useEffect(() => {
    let canceled = false;

    async function fetchBeers() {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * limit;
      try {
        const data = await new ListBeersUseCase().handle({
          limit,
          offset,
        });
        if (!canceled) {
          setBeers(data);
          setHasMore(data.length === limit);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar as cervejas.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchBeers();

    return () => {
      canceled = true;
    };
  }, [page]);

  return (
    <div>
      <h1>Coleção de Cervejas Artesanais</h1>
      <Link to="/beers/new">Nova cerveja</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && beers.length === 0 && (
        <p>Nenhuma cerveja cadastrada.</p>
      )}

      {!loading && !error && beers.length > 0 && (
        <ul>
          {beers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </ul>
      )}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)} disabled={!hasMore}>
        Proxima
      </button>
    </div>
  );
}
