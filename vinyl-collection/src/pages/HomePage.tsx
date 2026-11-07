import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListVinylsUseCase } from "../api/ListVinylsUseCase";
import { VinylCard } from "../components/VinylCard";
import type { Vinyl } from "../types/Vinyl";

export function HomePage() {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchVinyls() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListVinylsUseCase().handle();
        if (!canceled) {
          setVinyls(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os vinis.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchVinyls();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <h1>Coleção de Vinis</h1>
      <Link to="/vinyls/new">Novo vinil</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && vinyls.length === 0 && (
        <p>Nenhum vinil cadastrado.</p>
      )}

      {!loading && !error && vinyls.length > 0 && (
        <ul>
          {vinyls.map((vinyl) => (
            <VinylCard key={vinyl.id} vinyl={vinyl} />
          ))}
        </ul>
      )}
    </div>
  );
}
