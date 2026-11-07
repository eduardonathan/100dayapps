import { Link } from "react-router-dom";
import type { Adoption } from "../types/Adoption";
import { useEffect, useState } from "react";
import { ListAdoptionUseCase } from "../api/ListAdoptionsUseCase";
import { AdoptionCard } from "../components/AdoptionCard";
import { UpdateAdoptionUseCase } from "../api/UpdateAdoptionUseCase";
import { DeleteAdoptionUseCase } from "../api/DeleteAdoptionUseCase";
import { PageShell } from "../components/PageShell";

export function HomePage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let canceled = false;

    async function loadAdoptions() {
      try {
        setLoading(true);
        setError(null);
        const data = await new ListAdoptionUseCase().handle();
        if (!canceled) {
          setAdoptions(data);
        }
      } catch (error) {
        console.log("Error to load adoptions", error);
        if (!canceled) {
          setError("Erro ao carregar adoções");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadAdoptions();

    return () => {
      canceled = true;
    };
  }, [reloadKey]);

  const filteredAdoptions = adoptions.filter((a) =>
    a.petName.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function handleSaveEdit(id: string, age: number, status: string) {
    try {
      const adoptionEdited = await new UpdateAdoptionUseCase().handle({
        id,
        age,
        status,
      });
      setAdoptions((actualAdoptions) =>
        actualAdoptions.map((a) => (a.id === id ? adoptionEdited : a)),
      );
    } catch (error) {
      console.log("Error to update this adoption", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteAdoptionUseCase().handle(id);
      setAdoptions((actualAdoptions) =>
        actualAdoptions.filter((a) => a.id !== id),
      );
    } catch (error) {
      console.log("Error to delete this adoption", error);
    }
  }

  return (
    <PageShell>
      <section className="hero">
        <span className="eyebrow">ONG de adoção</span>
        <h1>Um lar pra cada focinho.</h1>
        <p className="hero-subtitle">
          Conectamos bichos incríveis a famílias apaixonadas. Veja quem está
          esperando por você — adote, não compre.
        </p>
        <Link to="/adoption/new" className="btn btn-primary btn-lg">
          <span aria-hidden="true">+</span> Cadastrar novo pet
        </Link>
      </section>

      {loading && (
        <div className="state-card">
          <p>🐾 Farejando adoções...</p>
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

      {!loading && !error && adoptions.length === 0 && (
        <div className="state-card">
          <p>Nenhum pet por aqui ainda.</p>
          <Link to="/adoption/new" className="btn btn-outline">
            Cadastrar o primeiro
          </Link>
        </div>
      )}

      {!loading && !error && adoptions.length > 0 && (
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar pelo nome do pet..."
            aria-label="Buscar pelo nome do pet"
          />
        </div>
      )}

      {!loading && !error && adoptions.length > 0 && filteredAdoptions.length === 0 && (
        <div className="state-card">
          <p>Nenhum pet encontrado para "{searchText}".</p>
        </div>
      )}

      {!loading && !error && filteredAdoptions.length > 0 && (
        <div className="adoption-grid">
          {filteredAdoptions.map((a) => (
            <AdoptionCard
              key={a.id}
              adoption={a}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
