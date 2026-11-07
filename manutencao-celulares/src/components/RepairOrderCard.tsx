import { useState } from "react";
import type { RepairOrder } from "../types/RepairOrder";
import { formatCurrency, statusClass, STATUS_OPTIONS } from "../lib/format";

interface RepairOrderCardProps {
  repairOrder: RepairOrder;
  onSaveEdit: (id: string, cost: number, status: string) => void;
  onDelete: (id: string) => void;
}

export function RepairOrderCard({
  repairOrder,
  onSaveEdit,
  onDelete,
}: RepairOrderCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [costEdited, setCostEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");

  function handleStartEdit() {
    setIsEditing(true);
    setCostEdited(repairOrder.cost.toString());
    setStatusEdited(repairOrder.status);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setCostEdited("");
    setStatusEdited("");
  }

  function handleSaveEdit() {
    if (costEdited.trim() === "" || statusEdited.trim() === "") return;

    const costNumber = Number(costEdited);

    onSaveEdit(repairOrder.id, costNumber, statusEdited);

    setCostEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  const knownStatus = STATUS_OPTIONS.includes(statusEdited);

  return (
    <div className="card">
      <div className="card__top">
        <div>
          <p className="card__customer">{repairOrder.customerName}</p>
          <p className="card__device">{repairOrder.deviceModel}</p>
        </div>
        <span className={`status ${statusClass(repairOrder.status)}`}>
          {repairOrder.status}
        </span>
      </div>

      <p className="card__issue">{repairOrder.issue}</p>

      {isEditing ? (
        <div className="card__edit">
          <div className="card__edit-grid">
            <div className="field">
              <label className="field__label" htmlFor={`cost-${repairOrder.id}`}>
                Valor (R$)
              </label>
              <input
                id={`cost-${repairOrder.id}`}
                className="input"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={costEdited}
                onChange={(e) => setCostEdited(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="field">
              <label
                className="field__label"
                htmlFor={`status-${repairOrder.id}`}
              >
                Status
              </label>
              <select
                id={`status-${repairOrder.id}`}
                className="select"
                value={statusEdited}
                onChange={(e) => setStatusEdited(e.target.value)}
              >
                {!knownStatus && statusEdited !== "" && (
                  <option value={statusEdited}>{statusEdited}</option>
                )}
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card__edit-actions">
            <button className="btn btn--primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn--secondary" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="card__meta">
          <span className="card__cost">
            {formatCurrency(repairOrder.cost)}
          </span>
          <span>valor do reparo</span>
        </div>
      )}

      {!isEditing && (
        <div className="card__actions">
          <button className="btn btn--link" onClick={handleStartEdit}>
            Editar
          </button>
          <span className="spacer" />
          <button
            className="btn btn--link btn--danger"
            onClick={() => onDelete(repairOrder.id)}
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
