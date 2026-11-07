import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBoardGameByIdUseCase } from "../usecases/GetBoardGameByIdUseCase";
import type { BoardGame } from "../types/BoardGame";

export function BoardGameDetailPage() {
  const [boardGame, setBoardGame] = useState<BoardGame>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchBoardGameById(boardGameId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetBoardGameByIdUseCase().handle(boardGameId);
        if (!canceled) {
          setBoardGame(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o jogo.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchBoardGameById(id);

    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!boardGame) {
    return <p>Jogo não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{boardGame.title}</h1>
      <p>Editora: {boardGame.publisher}</p>
      <p>
        Jogadores: {boardGame.minPlayers} a {boardGame.maxPlayers}
      </p>
      <p>Preço: R$ {boardGame.price.toFixed(2)}</p>
    </div>
  );
}
