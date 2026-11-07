import { useState } from "react";
import type { Equipment } from "../types/Equipment";
import { Link } from "react-router-dom";

interface EquipamentCardProps {
  equipment: Equipment;
  onSaveEdit: (
    id: string,
    name: string,
    category: string,
    weight: number,
  ) => void;
  onDelete: (id: string) => void;
}

export function EquipmentCard({
  equipment,
  onSaveEdit,
  onDelete,
}: EquipamentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameEdited, setNameEdited] = useState("");
  const [categoryEdited, setCategoryEdited] = useState("");
  const [weightEdited, setWeightEdited] = useState("");

  function handleStartEdit() {
    setIsEditing(true);
    setNameEdited(equipment.name);
    setCategoryEdited(equipment.category);
    setWeightEdited(equipment.weight.toString());
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setNameEdited("");
    setCategoryEdited("");
    setWeightEdited("");
  }

  function handleSaveEdit() {
    if (
      nameEdited.trim() === "" ||
      categoryEdited.trim() === "" ||
      weightEdited.trim() === ""
    )
      return;

    const weightEditedN = Number(weightEdited);

    onSaveEdit(equipment.id, nameEdited, categoryEdited, weightEditedN);

    setIsEditing(false);
    setNameEdited("");
    setCategoryEdited("");
    setWeightEdited("");
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            value={nameEdited}
            onChange={(e) => setNameEdited(e.target.value)}
          />
          <input
            value={categoryEdited}
            onChange={(e) => setCategoryEdited(e.target.value)}
          />
          <input
            value={weightEdited}
            onChange={(e) => setWeightEdited(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p>Nome do aparelho: {equipment.name}</p>
          <p>Categoria do aparelho: {equipment.category}</p>
          <p>Peso máximo do aparelho: {equipment.weight}</p>
          <button onClick={handleStartEdit}>Editar</button>
          <button onClick={() => onDelete(equipment.id)}>Excluir</button>
          <Link to={`/equipments/${equipment.id}`}>Detalhes</Link>
        </div>
      )}
    </div>
  );
}
