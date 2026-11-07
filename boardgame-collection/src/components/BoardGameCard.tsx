import { Link } from "react-router-dom";
import type { BoardGame } from "../types/BoardGame";

interface BoardGameCardProps {
  boardGame: BoardGame;
}

export function BoardGameCard({ boardGame }: BoardGameCardProps) {
  return (
    <li>
      <Link to={`/boardgames/${boardGame.id}`}>
        <strong>{boardGame.title}</strong> — {boardGame.publisher}
      </Link>
      <p>
        {boardGame.minPlayers}–{boardGame.maxPlayers} jogadores · R${" "}
        {boardGame.price.toFixed(2)}
      </p>
    </li>
  );
}
