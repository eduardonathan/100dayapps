import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListPerfumesUseCase } from "../usecases/ListPerfumesUseCase";
import { PerfumeCard } from "../components/PerfumeCard";
import type { Perfume } from "../types/Perfume";

export function HomePage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchPerfumes() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListPerfumesUseCase().handle();
        if (!canceled) {
          setPerfumes(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os perfumes.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchPerfumes();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <h1>Coleção de Perfumes</h1>
      <Link to="/perfumes/new">Novo perfume</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && perfumes.length === 0 && (
        <p>Nenhum perfume cadastrado.</p>
      )}

      {!loading && !error && perfumes.length > 0 && (
        <ul>
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </ul>
      )}
    </div>
  );
}
