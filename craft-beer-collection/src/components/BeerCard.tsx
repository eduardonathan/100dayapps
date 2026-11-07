import { Link } from "react-router-dom";
import type { Beer } from "../types/Beer";

interface BeerCardProps {
  beer: Beer;
}

export function BeerCard({ beer }: BeerCardProps) {
  return (
    <li>
      <Link to={`/beers/${beer.id}`}>
        <strong>{beer.name}</strong> — {beer.brewery}
      </Link>
      <p>
        {beer.style} · {beer.abv}% ABV · R$ {beer.price.toFixed(2)}
      </p>
    </li>
  );
}
