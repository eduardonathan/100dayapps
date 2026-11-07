import { useState, type FormEvent } from "react";
import { CreateAdoptionUseCase } from "../api/CreateAdoptionUseCase";
import { useNavigate, Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

export function NewAdoptionPage() {
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("disponível");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleCreateAdoption(event: FormEvent) {
    event.preventDefault();

    if (
      petName.trim() === "" ||
      species.trim() === "" ||
      age.trim() === "" ||
      status.trim() === ""
    )
      return;

    const ageNumber = Number(age);

    try {
      setSubmitting(true);
      await new CreateAdoptionUseCase().handle({
        petName,
        species,
        age: ageNumber,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create adoption", error);
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
          <h1 className="form-title">Mais um focinho na fila do amor</h1>
          <p className="hero-subtitle">
            Preencha os dados abaixo pra colocar esse pet na lista de adoção.
          </p>

          <form onSubmit={handleCreateAdoption} className="form-grid">
            <label className="field">
              <span>Nome do pet</span>
              <input
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ex: Leo"
              />
            </label>
            <label className="field">
              <span>Espécie</span>
              <input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Ex: Cachorro"
              />
            </label>
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
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="disponível">Disponível</option>
                <option value="pendente">Pendente</option>
                <option value="adotado">Adotado</option>
              </select>
            </label>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? "Cadastrando..." : "Criar adoção"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
