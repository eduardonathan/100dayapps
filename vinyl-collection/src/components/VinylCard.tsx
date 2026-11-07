import { Link } from "react-router-dom";
import type { Vinyl } from "../types/Vinyl";

interface VinylCardProps {
  vinyl: Vinyl;
}

export function VinylCard({ vinyl }: VinylCardProps) {
  return (
    <li>
      <Link to={`/vinyls/${vinyl.id}`}>
        <strong>{vinyl.title}</strong> — {vinyl.artist} ({vinyl.year})
      </Link>
      <p>
        {vinyl.genre} · R$ {vinyl.price.toFixed(2)}
      </p>
    </li>
  );
}
