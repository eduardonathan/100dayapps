import { useState, type FormEvent } from "react";
import { CreatePlantUseCase } from "../api/CreatePlantUseCase";
import { useNavigate, Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

export function NewPlantPage() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [waterEveryDays, setWaterEveryDays] = useState("");
  const [status, setStatus] = useState("saudável");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleCreatePlant(event: FormEvent) {
    event.preventDefault();

    if (
      name.trim() === "" ||
      species.trim() === "" ||
      waterEveryDays.trim() === "" ||
      status.trim() === ""
    )
      return;

    try {
      setSubmitting(true);
      await new CreatePlantUseCase().handle({
        name,
        species,
        waterEveryDays: Number(waterEveryDays),
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create plant", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <div className="form-page">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>
        <div className="card form-card">
          <span className="eyebrow">Novo cadastro</span>
          <h1 className="form-title">Mais uma planta no jardim</h1>
          <p className="hero-subtitle">
            Preencha os dados abaixo pra começar a cuidar dessa plantinha.
          </p>

          <form onSubmit={handleCreatePlant} className="form-grid">
            <label className="field">
              <span>Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Costela-de-adão"
              />
            </label>
            <label className="field">
              <span>Espécie</span>
              <input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Ex: Monstera deliciosa"
              />
            </label>
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
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="saudável">Saudável</option>
                <option value="com sede">Com sede</option>
                <option value="recuperação">Recuperação</option>
              </select>
            </label>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              {submitting ? "Cadastrando..." : "Criar planta"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
