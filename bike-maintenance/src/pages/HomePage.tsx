import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListMaintenanceRecordsUseCase } from "../api/ListMaintenanceRecordsUseCase";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";

export function HomePage() {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchRecords() {
      try {
        const data = await new ListMaintenanceRecordsUseCase().handle();
        if (!canceled) setRecords(data);
      } catch {
        if (!canceled) setError("Erro ao carregar os registros de manutenção");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    fetchRecords();

    return () => {
      canceled = true;
    };
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manutenções de Bike</h1>
      <Link to="/records/new">Nova manutenção</Link>

      {records.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <Link to={`/records/${record.id}`}>
                {record.bikeModel} — {record.serviceType} — R$ {record.cost.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
