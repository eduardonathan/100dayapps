import { Link } from "react-router-dom";
import type { Comic } from "../types/Comic";

interface ComicCardProps {
  comic: Comic;
}

export function ComicCard({ comic }: ComicCardProps) {
  return (
    <li>
      <Link to={`/comics/${comic.id}`}>
        <strong>{comic.title}</strong> — {comic.author} ({comic.year})
      </Link>
      <p>
        {comic.publisher} · R$ {comic.price.toFixed(2)}
      </p>
    </li>
  );
}
