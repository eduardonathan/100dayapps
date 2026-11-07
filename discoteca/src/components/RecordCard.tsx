import { useState } from "react";
import type { VinylRecord } from "../types/Record";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { statusEmoji } from "../utils/statusEmoji";

interface RecordCardProps {
  record: VinylRecord;
  onSaveEdit: (id: string, year: number, status: string) => void;
  onDelete: (id: string) => void;
}

export function RecordCard({ record, onSaveEdit, onDelete }: RecordCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [yearEdited, setYearEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const navigate = useNavigate();

  function startEdit() {
    setIsEditing(true);
    setYearEdited(record.year.toString());
    setStatusEdited(record.status);
  }

  function cancelEdit() {
    setIsEditing(false);
    setYearEdited("");
    setStatusEdited("");
  }

  function handleSaveEdit() {
    if (yearEdited.trim() === "" || statusEdited.trim() === "") return;

    onSaveEdit(record.id, Number(yearEdited), statusEdited);

    setIsEditing(false);
    setYearEdited("");
    setStatusEdited("");
  }

  function handleNavigate() {
    navigate(`/record/${record.id}`);
  }

  return (
    <article className="record-card">
      <div className="record-card-top">
        <span className="record-avatar" aria-hidden="true">
          {statusEmoji(record.status)}
        </span>
        <div className="record-card-heading">
          <h3 className="record-title">{record.albumTitle}</h3>
          <p className="record-artist">{record.artist}</p>
        </div>
        {!isEditing && <StatusBadge status={record.status} />}
      </div>

      {isEditing ? (
        <div className="record-card-edit">
          <label className="field">
            <span>Ano</span>
            <input
              value={yearEdited}
              onChange={(e) => setYearEdited(e.target.value)}
              inputMode="numeric"
            />
          </label>
          <label className="field">
            <span>Estado</span>
            <select
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              <option value="novo">Novo</option>
              <option value="usado">Usado</option>
              <option value="riscado">Riscado</option>
            </select>
          </label>
          <div className="record-card-actions">
            <button className="btn btn-primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn-ghost" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="record-card-footer">
          <p className="record-year">{record.year}</p>
          <div className="record-card-actions">
            <button className="btn btn-outline" onClick={startEdit}>
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(record.id)}
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
