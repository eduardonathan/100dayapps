import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateMemberUseCase } from "../api/CreateMemberUseCase";

export function NewMemberPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await new CreateMemberUseCase().handle({ name, plan, status });
      navigate("/");
    } catch {
      setError("Erro ao criar o membro");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Novo membro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="plan">Plano</label>
          <input id="plan" value={plan} onChange={(e) => setPlan(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input id="status" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </form>

      <Link to="/">Voltar</Link>
    </div>
  );
}
