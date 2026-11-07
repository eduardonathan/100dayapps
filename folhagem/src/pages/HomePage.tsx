import { Link } from "react-router-dom";
import type { Plant } from "../types/Plant";
import { useEffect, useState } from "react";
import { ListPlantsUseCase } from "../api/ListPlantsUseCase";
import { PlantCard } from "../components/PlantCard";
import { UpdatePlantUseCase } from "../api/UpdatePlantUseCase";
import { DeletePlantUseCase } from "../api/DeletePlantUseCase";
import { PageShell } from "../components/PageShell";

export function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let canceled = false;

    async function loadPlants() {
      try {
        setLoading(true);
        setError(null);
        const data = await new ListPlantsUseCase().handle();
        if (!canceled) {
          setPlants(data);
        }
      } catch (error) {
        console.log("Error to load plants", error);
        if (!canceled) {
          setError("Erro ao carregar plantas");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadPlants();

    return () => {
      canceled = true;
    };
  }, [reloadKey]);

  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function handleSaveEdit(
    id: string,
    waterEveryDays: number,
    status: string,
  ) {
    try {
      const plantEdited = await new UpdatePlantUseCase().handle({
        id,
        waterEveryDays,
        status,
      });
      setPlants((actualPlants) =>
        actualPlants.map((p) => (p.id === id ? plantEdited : p)),
      );
    } catch (error) {
      console.log("Error to update this plant", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeletePlantUseCase().handle(id);
      setPlants((actualPlants) => actualPlants.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Error to delete this plant", error);
    }
  }

  return (
    <PageShell>
      <section className="hero">
        <span className="eyebrow">Jardim de casa</span>
        <h1>Cada plantinha, no seu tempo.</h1>
        <p className="hero-subtitle">
          Cadastre suas plantas, defina a frequência de rega e acompanhe quem
          está saudável, com sede ou em recuperação.
        </p>
        <Link to="/plant/new" className="btn btn-primary btn-lg">
          <span aria-hidden="true">+</span> Cadastrar nova planta
        </Link>
      </section>

      {loading && (
        <div className="state-card">
          <p>🌱 Regando os dados...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-card state-card-error">
          <p>{error}</p>
          <button
            className="btn btn-outline"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && plants.length === 0 && (
        <div className="state-card">
          <p>Nenhuma planta por aqui ainda.</p>
          <Link to="/plant/new" className="btn btn-outline">
            Cadastrar a primeira
          </Link>
        </div>
      )}

      {!loading && !error && plants.length > 0 && (
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar pelo nome da planta..."
            aria-label="Buscar pelo nome da planta"
          />
        </div>
      )}

      {!loading &&
        !error &&
        plants.length > 0 &&
        filteredPlants.length === 0 && (
          <div className="state-card">
            <p>Nenhuma planta encontrada para "{searchText}".</p>
          </div>
        )}

      {!loading && !error && filteredPlants.length > 0 && (
        <div className="plant-grid">
          {filteredPlants.map((p) => (
            <PlantCard
              key={p.id}
              plant={p}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
