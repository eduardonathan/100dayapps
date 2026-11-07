import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { useParams } from "react-router-dom";
import { GetEquipmentById } from "../api/GetEquipmentById";

export function EquipmentDetailPage() {
  const [equipment, setEquipment] = useState<Equipment>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    async function loadEquipments() {
      try {
        setError(null);
        const data = await new GetEquipmentById().handle(id);
        if (!canceled) {
          setEquipment(data);
        }
      } catch {
        if (!canceled) {
          setError("Erro ao buscar equipamento");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadEquipments();

    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!equipment) {
    return <p>Equipamento não encontrado</p>;
  }

  return (
    <div>
      <h1>Detalhes do equipamento</h1>
      <p>Nome do equipamento: {equipment.name}</p>
      <p>Categoria do equipamento: {equipment.category}</p>
      <p>Peso maximo do equipamento: {equipment.weight}</p>
    </div>
  );
}
