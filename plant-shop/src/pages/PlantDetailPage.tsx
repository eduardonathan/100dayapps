import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPlantByIdUseCase } from "../usecases/GetPlantByIdUseCase";
import type { Plant } from "../types/Plant";

export function PlantDetailPage() {
  const [plant, setPlant] = useState<Plant>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchPlantById(plantId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetPlantByIdUseCase().handle(plantId);
        if (!canceled) {
          setPlant(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o plante.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchPlantById(id);

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

  if (!plant) {
    return <p>Plante não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{plant.name}</h1>
      <p>
        Espécie: <em>{plant.species}</em>
      </p>
      <p>Regar a cada {plant.waterFrequencyDays} dias</p>
      <p>Preço: R$ {plant.price.toFixed(2)}</p>
      <Link to={`/plants/${plant.id}/edit`}>Editar</Link>
    </div>
  );
}
