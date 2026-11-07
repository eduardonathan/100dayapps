import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListSneakersUseCase } from "../usecases/ListSneakersUseCase";
import { SneakerCard } from "../components/SneakerCard";
import type { Sneaker } from "../types/Sneaker";

export function HomePage() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchSneakers() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListSneakersUseCase().handle();
        if (!canceled) {
          setSneakers(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os tênis.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchSneakers();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <h1>Coleção de Tênis</h1>
      <Link to="/sneakers/new">Novo tênis</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && sneakers.length === 0 && (
        <p>Nenhum tênis cadastrado.</p>
      )}

      {!loading && !error && sneakers.length > 0 && (
        <ul>
          {sneakers.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </ul>
      )}
    </div>
  );
}
