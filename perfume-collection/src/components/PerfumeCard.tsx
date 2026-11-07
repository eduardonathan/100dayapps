import { Link } from "react-router-dom";
import type { Perfume } from "../types/Perfume";

interface PerfumeCardProps {
  perfume: Perfume;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  return (
    <li>
      <Link to={`/perfumes/${perfume.id}`}>
        <strong>{perfume.name}</strong> — {perfume.brand} ({perfume.launchYear})
      </Link>
      <p>
        {perfume.volumeMl} ml · R$ {perfume.price.toFixed(2)}
      </p>
    </li>
  );
}
