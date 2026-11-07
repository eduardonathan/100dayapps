import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListClubsUseCase } from "../usecases/ListClubsUseCase";
import { ClubCard } from "../components/ClubCard";
import type { Club } from "../types/Club";

export function HomePage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  useEffect(() => {
    let canceled = false;

    async function fetchClubs() {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * limit;
      try {
        const data = await new ListClubsUseCase().handle({ offset, limit });
        if (!canceled) {
          setClubs(data);
          setHasMore(data.length === limit);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os clubes.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchClubs();

    return () => {
      canceled = true;
    };
  }, [page]);

  return (
    <div>
      <h1>Clubes Brasileiros</h1>
      <Link to="/clubs/new">Novo clube</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && clubs.length === 0 && (
        <p>Nenhum clube cadastrado.</p>
      )}

      {!loading && !error && clubs.length > 0 && (
        <ul>
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </ul>
      )}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)} disabled={!hasMore}>
        Próxima
      </button>
    </div>
  );
}
