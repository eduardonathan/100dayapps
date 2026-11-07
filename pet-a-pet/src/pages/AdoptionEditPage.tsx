import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateAdoptionUseCase } from "../api/UpdateAdoptionUseCase";
import { GetAdoptionByIdUseCase } from "../api/GetAdoptionByIdUseCase";
import type { Adoption } from "../types/Adoption";
import { PageShell } from "../components/PageShell";
import { speciesEmoji } from "../utils/speciesEmoji";

export function AdoptionEditPage() {
  const { id } = useParams();
  const [adoption, setAdoption] = useState<Adoption | null>(null);
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();

    if (!id || age.trim() === "" || status.trim() === "") return;

    const ageN = Number(age);

    try {
      await new UpdateAdoptionUseCase().handle({
        id,
        age: ageN,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to update this adoption", error);
    }
  }

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
          setAge(String(adoptionById.age));
          setStatus(adoptionById.status);
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

        {!loading && (error || !adoption) && (
          <div className="state-card state-card-error">
            <p>{error ?? "Erro ao buscar pet"}</p>
          </div>
        )}

        {!loading && adoption && (
          <div className="card form-card">
            <div className="pet-card-top">
              <span className="pet-avatar" aria-hidden="true">
                {speciesEmoji(adoption.species)}
              </span>
              <div className="pet-card-heading">
                <h1 className="form-title pet-name">{adoption.petName}</h1>
                <p className="pet-species">{adoption.species}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="form-grid">
              <label className="field">
                <span>Idade (anos)</span>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 2"
                  inputMode="numeric"
                />
              </label>
              <label className="field">
                <span>Status da adoção</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="disponível">Disponível</option>
                  <option value="pendente">Pendente</option>
                  <option value="adotado">Adotado</option>
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
