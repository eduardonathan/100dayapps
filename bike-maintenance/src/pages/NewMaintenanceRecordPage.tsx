import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateMaintenanceRecordUseCase } from "../api/CreateMaintenanceRecordUseCase";

export function NewMaintenanceRecordPage() {
  const navigate = useNavigate();
  const [bikeModel, setBikeModel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cost, setCost] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await new CreateMaintenanceRecordUseCase().handle({
        bikeModel,
        serviceType,
        cost: Number(cost),
      });
      navigate("/");
    } catch {
      setError("Erro ao criar o registro de manutenção");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Nova manutenção</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bikeModel">Modelo da bike</label>
          <input id="bikeModel" value={bikeModel} onChange={(e) => setBikeModel(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="serviceType">Tipo de serviço</label>
          <input id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="cost">Custo (R$)</label>
          <input id="cost" type="number" min="0" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} required />
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
