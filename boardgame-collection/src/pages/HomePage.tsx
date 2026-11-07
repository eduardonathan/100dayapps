import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListBoardGamesUseCase } from "../usecases/ListBoardGamesUseCase";
import { BoardGameCard } from "../components/BoardGameCard";
import type { BoardGame } from "../types/BoardGame";

export function HomePage() {
  const [boardGames, setBoardGames] = useState<BoardGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchBoardGames() {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListBoardGamesUseCase().handle();
        if (!canceled) {
          setBoardGames(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os jogos.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchBoardGames();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <h1>Coleção de Jogos de Tabuleiro</h1>
      <Link to="/boardgames/new">Novo jogo</Link>

      {loading && <p>Carregando...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && boardGames.length === 0 && (
        <p>Nenhum jogo cadastrado.</p>
      )}

      {!loading && !error && boardGames.length > 0 && (
        <ul>
          {boardGames.map((boardGame) => (
            <BoardGameCard key={boardGame.id} boardGame={boardGame} />
          ))}
        </ul>
      )}
    </div>
  );
}
