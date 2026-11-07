import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreateMaintenanceRecordUseCase } from "../api/CreateMaintenanceRecordUseCase";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";
import { GetMaintenanceById } from "../api/GetMaintenanceById";

export function DetailMaintenancePage() {
  const { id } = useParams();
  const [maintenance, setMaintenance] = useState<MaintenanceRecord>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function getMaintenanceById() {
      try {
        const data = await new GetMaintenanceById().handle(id);
        if (!canceled) {
          setMaintenance(data);
        }
      } catch (error) {
        console.log("Error to get maitenance");
        if (!canceled) {
          setError("Erro ao buscar manutencao");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    getMaintenanceById();

    return () => {
      canceled = true;
    };
  }, [id]);

  if (error) return <p>Erro ao buscar detalhes dessa manutencao</p>;
  if (loading) return <p>Buscando detalhes dessa manutencao</p>;
  if (!error && !loading && !maintenance)
    return <p>Não encontramos manutenção :c </p>;

  return (
    <div>
      <h1>Detalhes da manutenção</h1>

      <p>Modelo da bike: {maintenance.bikeModel}</p>
      <p>Tipo de manutenção: {maintenance.serviceType}</p>
      <p>Valor total: {maintenance.cost}</p>

      <Link to="/">Voltar</Link>
    </div>
  );
}
