import { useEffect, useMemo, useState } from "react";
import type { Medicine } from "../types/Medicine";
import { ListMedicinesUseCase } from "../api/ListMedicinesUseCase";
import { MedicineCard } from "../components/MedicineCard";
import { UpdateMedicineUseCase } from "../api/UpdateMedicineUseCase";
import { DeleteMedicineUseCase } from "../api/DeleteMedicineUseCase";
import { Link } from "react-router-dom";
import { expiryState, stockLevel } from "../utils/medicineStatus";

export function HomePage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function loadMedicines() {
      try {
        setError(null);
        const data = await new ListMedicinesUseCase().handle();
        if (!canceled) {
          setMedicines(data);
        }
      } catch (error) {
        console.log("Error to load medicines", error);
        if (!canceled) {
          setError("Erro ao buscar remédios");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadMedicines();

    return () => {
      canceled = true;
    };
  }, []);

  const summary = useMemo(() => {
    return {
      total: medicines.length,
      lowStock: medicines.filter((m) => stockLevel(m.quantity) !== "ok").length,
      expiring: medicines.filter((m) => expiryState(m.expirationDate) !== "ok")
        .length,
    };
  }, [medicines]);

  async function handleSaveEdit(
    id: string,
    quantity: number,
    expirationDate: string,
  ) {
    try {
      const medicineEdited = await new UpdateMedicineUseCase().handle({
        id,
        quantity,
        expirationDate,
      });
      setMedicines((actualMedicines) =>
        actualMedicines.map((m) => (m.id === id ? medicineEdited : m)),
      );
    } catch (error) {
      console.log("Error to update medicine", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteMedicineUseCase().handle(id);
      setMedicines((actualMedicines) =>
        actualMedicines.filter((m) => m.id !== id),
      );
    } catch (error) {
      console.log("Error to delete medicine", error);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head__title">
          <h1>Estoque de medicamentos</h1>
          <p className="page-head__sub">
            {loading
              ? "Carregando registros…"
              : `${summary.total} ${
                  summary.total === 1 ? "medicamento" : "medicamentos"
                } cadastrados`}
          </p>
        </div>
        <Link to="/medicines/new" className="btn btn--primary">
          Novo medicamento
        </Link>
      </div>

      {!loading && !error && medicines.length > 0 && (
        <div className="stats">
          <div className="stat">
            <div className="stat__value">{summary.total}</div>
            <div className="stat__label">Medicamentos cadastrados</div>
          </div>
          <div className={`stat${summary.lowStock > 0 ? " stat--warn" : ""}`}>
            <div className="stat__value">{summary.lowStock}</div>
            <div className="stat__label">Com estoque baixo</div>
          </div>
          <div
            className={`stat${summary.expiring > 0 ? " stat--danger" : ""}`}
          >
            <div className="stat__value">{summary.expiring}</div>
            <div className="stat__label">Validade crítica</div>
          </div>
        </div>
      )}

      {loading && (
        <div className="panel">
          <div className="spinner" />
          Buscando medicamentos…
        </div>
      )}

      {error && !loading && (
        <div className="panel panel--error">
          <p className="panel__title">Não foi possível carregar o estoque</p>
          <p>Verifique a conexão com a API e tente novamente.</p>
        </div>
      )}

      {!loading && !error && medicines.length === 0 && (
        <div className="panel">
          <p className="panel__title">Nenhum medicamento cadastrado</p>
          <p>Cadastre o primeiro item para começar a controlar o estoque.</p>
        </div>
      )}

      {!loading && !error && medicines.length > 0 && (
        <div className="med-grid">
          {medicines.map((m) => (
            <MedicineCard
              key={m.id}
              medicine={m}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
