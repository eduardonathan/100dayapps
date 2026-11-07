import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdatePlantUseCase } from "../api/UpdatePlantUseCase";
import { GetPlantByIdUseCase } from "../api/GetPlantByIdUseCase";
import type { Plant } from "../types/Plant";
import { PageShell } from "../components/PageShell";
import { statusEmoji } from "../utils/statusEmoji";

export function PlantEditPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [waterEveryDays, setWaterEveryDays] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();

    if (!id || waterEveryDays.trim() === "" || status.trim() === "") return;

    try {
      await new UpdatePlantUseCase().handle({
        id,
        waterEveryDays: Number(waterEveryDays),
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to update this plant", error);
    }
  }

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
          setWaterEveryDays(String(plantById.waterEveryDays));
          setStatus(plantById.status);
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

        {!loading && (error || !plant) && (
          <div className="state-card state-card-error">
            <p>{error ?? "Erro ao buscar planta"}</p>
          </div>
        )}

        {!loading && plant && (
          <div className="card form-card">
            <div className="plant-card-top">
              <span className="plant-avatar" aria-hidden="true">
                {statusEmoji(plant.status)}
              </span>
              <div className="plant-card-heading">
                <h1 className="form-title plant-name">{plant.name}</h1>
                <p className="plant-species">{plant.species}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="form-grid">
              <label className="field">
                <span>Regar a cada (dias)</span>
                <input
                  value={waterEveryDays}
                  onChange={(e) => setWaterEveryDays(e.target.value)}
                  placeholder="Ex: 7"
                  inputMode="numeric"
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="saudável">Saudável</option>
                  <option value="com sede">Com sede</option>
                  <option value="recuperação">Recuperação</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-lg">
                Salvar alterações
              </button>
            </form>
          </div>
        )}
      </div>
    </PageShell>
  );
}
