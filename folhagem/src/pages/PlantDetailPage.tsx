import { useEffect, useState } from "react";
import type { Plant } from "../types/Plant";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetPlantByIdUseCase } from "../api/GetPlantByIdUseCase";
import { PageShell } from "../components/PageShell";
import { StatusBadge } from "../components/StatusBadge";
import { statusEmoji } from "../utils/statusEmoji";

export function PlantDetailPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let canceled = false;

    if (!id) return;

    async function loadPlant() {
      try {
        setLoading(true);
        setError(null);
        const plantById = await new GetPlantByIdUseCase().handle(id!);
        if (!canceled) {
          setPlant(plantById);
        }
      } catch (error) {
        console.log("Error to load this plant data.", error);
        if (!canceled) {
          setError("Erro ao buscar dados da planta");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadPlant();

    return () => {
      canceled = true;
    };
  }, [id]);

  return (
    <PageShell>
      <div className="form-page">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        {loading && (
          <div className="state-card">
            <p>🌱 Procurando a planta...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-card state-card-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && plant && (
          <div className="card form-card">
            <div className="plant-card-top">
              <span className="plant-avatar" aria-hidden="true">
                {statusEmoji(plant.status)}
              </span>
              <div className="plant-card-heading">
                <h1 className="form-title plant-name">{plant.name}</h1>
                <p className="plant-species">{plant.species}</p>
              </div>
              <StatusBadge status={plant.status} />
            </div>
            <p className="plant-water">
              💧 a cada {plant.waterEveryDays}{" "}
              {plant.waterEveryDays === 1 ? "dia" : "dias"}
            </p>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/plant/${id}/edit`)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
