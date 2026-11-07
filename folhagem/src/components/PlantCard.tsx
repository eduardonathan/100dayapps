import { useState } from "react";
import type { Plant } from "../types/Plant";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { statusEmoji } from "../utils/statusEmoji";

interface PlantCardProps {
  plant: Plant;
  onSaveEdit: (id: string, waterEveryDays: number, status: string) => void;
  onDelete: (id: string) => void;
}

export function PlantCard({ plant, onSaveEdit, onDelete }: PlantCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [waterEdited, setWaterEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const navigate = useNavigate();

  function startEdit() {
    setIsEditing(true);
    setWaterEdited(plant.waterEveryDays.toString());
    setStatusEdited(plant.status);
  }

  function cancelEdit() {
    setIsEditing(false);
    setWaterEdited("");
    setStatusEdited("");
  }

  function handleSaveEdit() {
    if (waterEdited.trim() === "" || statusEdited.trim() === "") return;

    onSaveEdit(plant.id, Number(waterEdited), statusEdited);

    setIsEditing(false);
    setWaterEdited("");
    setStatusEdited("");
  }

  function handleNavigate() {
    navigate(`/plant/${plant.id}`);
  }

  return (
    <article className="plant-card">
      <div className="plant-card-top">
        <span className="plant-avatar" aria-hidden="true">
          {statusEmoji(plant.status)}
        </span>
        <div className="plant-card-heading">
          <h3 className="plant-name">{plant.name}</h3>
          <p className="plant-species">{plant.species}</p>
        </div>
        {!isEditing && <StatusBadge status={plant.status} />}
      </div>

      {isEditing ? (
        <div className="plant-card-edit">
          <label className="field">
            <span>Regar a cada (dias)</span>
            <input
              value={waterEdited}
              onChange={(e) => setWaterEdited(e.target.value)}
              inputMode="numeric"
            />
          </label>
          <label className="field">
            <span>Status</span>
            <select
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              <option value="saudável">Saudável</option>
              <option value="com sede">Com sede</option>
              <option value="recuperação">Recuperação</option>
            </select>
          </label>
          <div className="plant-card-actions">
            <button className="btn btn-primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn-ghost" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="plant-card-footer">
          <p className="plant-water">
            💧 a cada {plant.waterEveryDays}{" "}
            {plant.waterEveryDays === 1 ? "dia" : "dias"}
          </p>
          <div className="plant-card-actions">
            <button className="btn btn-outline" onClick={startEdit}>
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(plant.id)}
            >
              Excluir
            </button>
            <button className="btn btn-outline" onClick={handleNavigate}>
              Detalhes
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
