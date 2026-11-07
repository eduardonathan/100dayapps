import { useState } from "react";
import type { Medicine } from "../types/Medicine";
import {
  daysUntilExpiry,
  expiryState,
  stockLevel,
} from "../utils/medicineStatus";

interface MedicineCardProps {
  medicine: Medicine;
  onSaveEdit: (id: string, quantity: number, expirationDate: string) => void;
  onDelete: (id: string) => void;
}

function StockBadge({ quantity }: { quantity: number }) {
  const level = stockLevel(quantity);
  if (level === "out") {
    return <span className="badge badge--danger">Sem estoque</span>;
  }
  if (level === "low") {
    return <span className="badge badge--warn">Estoque baixo</span>;
  }
  return <span className="badge badge--ok">Estoque adequado</span>;
}

function ExpiryBadge({ expirationDate }: { expirationDate: string }) {
  const state = expiryState(expirationDate);
  if (state === "expired") {
    return <span className="badge badge--danger">Vencido</span>;
  }
  if (state === "soon") {
    const days = daysUntilExpiry(expirationDate);
    return (
      <span className="badge badge--warn">
        {days !== null && days >= 0
          ? `Vence em ${days} ${days === 1 ? "dia" : "dias"}`
          : "Validade próxima"}
      </span>
    );
  }
  return <span className="badge badge--neutral">Validade em dia</span>;
}

export function MedicineCard({
  medicine,
  onSaveEdit,
  onDelete,
}: MedicineCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantityEdited, setQuantityEdited] = useState("");
  const [expirationDateEdited, setExpirationDateEdited] = useState("");

  function handleStartEdit() {
    setIsEditing(true);
    setQuantityEdited(medicine.quantity.toString());
    setExpirationDateEdited(medicine.expirationDate);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setQuantityEdited("");
    setExpirationDateEdited("");
  }

  function handleSaveEdit() {
    if (quantityEdited.trim() === "" || expirationDateEdited.trim() === "")
      return;

    const quantityEditedN = Number(quantityEdited);

    onSaveEdit(medicine.id, quantityEditedN, expirationDateEdited);

    setIsEditing(false);
    setQuantityEdited("");
    setExpirationDateEdited("");
  }

  return (
    <article className="card med">
      <div className="med__head">
        <span className="med__name">{medicine.name}</span>
        <span className="med__maker">{medicine.manufacturer}</span>
      </div>

      {isEditing ? (
        <div className="med__edit">
          <label className="field">
            <span className="field__label">Quantidade em estoque</span>
            <input
              className="input"
              type="number"
              min={0}
              value={quantityEdited}
              onChange={(e) => setQuantityEdited(e.target.value)}
              placeholder="Ex.: 120"
            />
          </label>
          <label className="field">
            <span className="field__label">Data de validade</span>
            <input
              className="input"
              value={expirationDateEdited}
              onChange={(e) => setExpirationDateEdited(e.target.value)}
              placeholder="dd/mm/aaaa"
            />
          </label>
          <div className="med__edit-actions">
            <button className="btn btn--primary" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="med__badges">
            <StockBadge quantity={medicine.quantity} />
            <ExpiryBadge expirationDate={medicine.expirationDate} />
          </div>

          <div className="med__metrics">
            <div className="med__metric">
              <span className="med__metric-label">Em estoque</span>
              <span className="med__metric-value">
                {medicine.quantity} un.
              </span>
            </div>
            <div className="med__metric">
              <span className="med__metric-label">Validade</span>
              <span className="med__metric-value">
                {medicine.expirationDate}
              </span>
            </div>
          </div>

          <div className="med__actions">
            <button className="btn btn--sm" onClick={handleStartEdit}>
              Editar
            </button>
            <button
              className="btn btn--sm btn--danger"
              onClick={() => onDelete(medicine.id)}
            >
              Excluir
            </button>
          </div>
        </>
      )}
    </article>
  );
}
