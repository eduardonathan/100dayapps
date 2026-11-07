import { useEffect, useState } from "react";
import type { Adoption } from "../types/Adoption";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetAdoptionByIdUseCase } from "../api/GetAdoptionByIdUseCase";
import { PageShell } from "../components/PageShell";
import { StatusBadge } from "../components/StatusBadge";
import { speciesEmoji } from "../utils/speciesEmoji";

export function AdoptionDetailPage() {
  const { id } = useParams();
  const [adoption, setAdoption] = useState<Adoption | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let canceled = false;

    if (!id) return;

    async function loadAdoption() {
      try {
        setLoading(true);
        setError(null);
        const adoptionById = await new GetAdoptionByIdUseCase().handle(id!);
        if (!canceled) {
          setAdoption(adoptionById);
        }
      } catch (error) {
        console.log("Error to load this pet data.", error);
        if (!canceled) {
          setError("Erro ao buscar dados do pet");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadAdoption();

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
            <p>🐾 Farejando os dados do pet...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-card state-card-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && adoption && (
          <div className="card form-card">
            <div className="pet-card-top">
              <span className="pet-avatar" aria-hidden="true">
                {speciesEmoji(adoption.species)}
              </span>
              <div className="pet-card-heading">
                <h1 className="form-title pet-name">{adoption.petName}</h1>
                <p className="pet-species">{adoption.species}</p>
              </div>
              <StatusBadge status={adoption.status} />
            </div>
            <p className="pet-age">
              {adoption.age} {adoption.age === 1 ? "ano" : "anos"}
            </p>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/adoption/${id}/edit`)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
