import { Link } from "react-router-dom";
import type { Skateboard } from "../types/Skateboard";

interface SkateboardCardProps {
  skateboard: Skateboard;
}

export function SkateboardCard({ skateboard }: SkateboardCardProps) {
  return (
    <li>
      <Link to={`/skateboards/${skateboard.id}`}>
        <strong>{skateboard.model}</strong> — {skateboard.brand}
      </Link>
      <p>
        {skateboard.lengthCm} cm · R$ {skateboard.price.toFixed(2)}
      </p>
    </li>
  );
}
