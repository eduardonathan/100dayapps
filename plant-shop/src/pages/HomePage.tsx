import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListPlantsUseCase } from "../usecases/ListPlantsUseCase";
import { PlantCard } from "../components/PlantCard";
import type { Plant } from "../types/Plant";

const LIMIT = 5;

export function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let canceled = false;

    async function fetchPlants() {
      setLoading(true);
      setError(null);
      try {
        // pede 1 item a mais que o limite: se ele vier, existe próxima página
        const data = await new ListPlantsUseCase().handle({
          limit: LIMIT + 1,
          offset: (page - 1) * LIMIT,
        });
        if (!canceled) {
          setPlants(data.slice(0, LIMIT));
          setHasMore(data.length > LIMIT);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar as plantas.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchPlants();

    return () => {
      canceled = true;
    };
  }, [page]);

  return (
    <div>
      <h1>Plant Shop</h1>
      <Link to="/plants/new">Nova planta</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && plants.length === 0 && (
        <p>Nenhuma planta cadastrada.</p>
      )}

      {!loading && !error && plants.length > 0 && (
        <ul>
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
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
