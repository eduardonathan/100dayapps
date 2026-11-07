import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { ListEquipmentsUseCase } from "../api/ListEquipmentsUseCase";
import { EquipmentCard } from "../components/EquipmentCard";
import { UpdateEquipmentUseCase } from "../api/UpdateEquipmentUseCase";
import { DelteEquipmentUseCase } from "../api/DeleteEquipmentUseCase";
import { Link } from "react-router-dom";

export function HomePage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function loadEquipments() {
      try {
        setError(null);
        const data = await new ListEquipmentsUseCase().handle();
        if (!canceled) {
          setEquipments(data);
        }
      } catch {
        if (!canceled) {
          setError("Erro ao buscar equipamentos");
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
  }, []);

  async function handleSaveEdit(
    id: string,
    name: string,
    category: string,
    weight: number,
  ) {
    try {
      const equipmentEdited = await new UpdateEquipmentUseCase().handle({
        id,
        name,
        category,
        weight,
      });
      setEquipments((actualEquipments) =>
        actualEquipments.map((ae) => (ae.id === id ? equipmentEdited : ae)),
      );
    } catch (error) {
      console.log("Error to update this equipment", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DelteEquipmentUseCase().handle(id);
      setEquipments((actualEquipments) =>
        actualEquipments.filter((ae) => ae.id !== id),
      );
    } catch (error) {
      console.log("Error to delete this equipment", error);
    }
  }

  if (error) return <p>Erro ao buscar equipamentos</p>;

  if (loading) return <p>Buscando equipamentos</p>;

  if (!error && !loading && equipments.length === 0)
    return <p>Não há equipamentos</p>;

  return (
    <div>
      <h1>Lista de equipamentos</h1>
      <Link to={"/equipments/new"}>Criar novo equipamento</Link>
      {equipments.length > 0 &&
        equipments.map((eq) => (
          <div key={eq.id}>
            <EquipmentCard
              equipment={eq}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  );
}
