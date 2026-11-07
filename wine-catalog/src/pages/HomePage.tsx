import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListWinesUseCase } from "../api/ListWinesUseCase";
import type { Wine } from "../types/Wine";

export function HomePage() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchWines() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListWinesUseCase().handle();
        if (!canceled) {
          setWines(data);
        }
      } catch (err) {
        if (!canceled) {
          setError("Não foi possível carregar os vinhos.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchWines();

    return () => {
      canceled = true;
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Catálogo de Vinhos</h1>
      <Link to="/wines/new">Novo vinho</Link>
      <ul>
        {wines.map((wine) => (
          <li key={wine.id}>
            <Link to={`/wines/${wine.id}`}>
              {wine.name} — {wine.winery} ({wine.vintage}) — R$ {wine.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
