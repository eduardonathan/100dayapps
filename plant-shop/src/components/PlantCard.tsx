import { Link } from "react-router-dom";
import type { Plant } from "../types/Plant";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <li>
      <Link to={`/plants/${plant.id}`}>
        <strong>{plant.name}</strong> — <em>{plant.species}</em>
      </Link>
      <p>
        Regar a cada {plant.waterFrequencyDays} dias · R${" "}
        {plant.price.toFixed(2)}
      </p>
    </li>
  );
}
