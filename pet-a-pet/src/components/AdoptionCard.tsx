import { useState } from "react";
import type { Adoption } from "../types/Adoption";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { speciesEmoji } from "../utils/speciesEmoji";

interface AdoptionCardProps {
  adoption: Adoption;
  onSaveEdit: (id: string, age: number, status: string) => void;
  onDelete: (id: string) => void;
}

export function AdoptionCard({
  adoption,
  onSaveEdit,
  onDelete,
}: AdoptionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [ageEdited, setAgeEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const navigate = useNavigate();

  function startEdit() {
    setIsEditing(true);
    setAgeEdited(adoption.age.toString());
    setStatusEdited(adoption.status);
  }

  function cancelEdit() {
    setIsEditing(false);
    setAgeEdited("");
    setStatusEdited("");
  }

  function handleSaveEdit() {
    if (ageEdited.trim() === "" || statusEdited.trim() === "") return;

    const ageEditedNumber = Number(ageEdited);

    onSaveEdit(adoption.id, ageEditedNumber, statusEdited);

    setIsEditing(false);
    setAgeEdited("");
    setStatusEdited("");
  }

  function handleNavigate() {
    navigate(`/adoption/${adoption.id}`);
  }

  return (
    <article className="pet-card">
      <div className="pet-card-top">
        <span className="pet-avatar" aria-hidden="true">
          {speciesEmoji(adoption.species)}
        </span>
        <div className="pet-card-heading">
          <h3 className="pet-name">{adoption.petName}</h3>
          <p className="pet-species">{adoption.species}</p>
        </div>
        {!isEditing && <StatusBadge status={adoption.status} />}
      </div>

      {isEditing ? (
        <div className="pet-card-edit">
          <label className="field">
            <span>Idade</span>
            <input
              value={ageEdited}
              onChange={(e) => setAgeEdited(e.target.value)}
              inputMode="numeric"
            />
          </label>
          <label className="field">
            <span>Status</span>
            <select
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              <option value="disponível">Disponível</option>
              <option value="pendente">Pendente</option>
              <option value="adotado">Adotado</option>
            </select>
          </label>
          <div className="pet-card-actions">
            <button className="btn btn-primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn-ghost" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="pet-card-footer">
          <p className="pet-age">
            {adoption.age} {adoption.age === 1 ? "ano" : "anos"}
          </p>
          <div className="pet-card-actions">
            <button className="btn btn-outline" onClick={startEdit}>
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(adoption.id)}
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
