import { Link } from "react-router-dom";
import type { Sneaker } from "../types/Sneaker";

interface SneakerCardProps {
  sneaker: Sneaker;
}

export function SneakerCard({ sneaker }: SneakerCardProps) {
  return (
    <li>
      <Link to={`/sneakers/${sneaker.id}`}>
        <strong>{sneaker.model}</strong> — {sneaker.brand} ({sneaker.releaseYear})
      </Link>
      <p>
        Tamanho {sneaker.size} · R$ {sneaker.price.toFixed(2)}
      </p>
    </li>
  );
}
