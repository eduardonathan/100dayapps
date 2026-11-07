import { useState } from "react";
import type { DeliveryOrder } from "../types/DeliveryOrder";
import {
  STATUS_OPTIONS,
  formatCurrency,
  getStatusBadgeClass,
} from "../utils/orderStatus";

interface OrderCardProps {
  order: DeliveryOrder;
  onSaveEdit: (id: string, status: string, deliveryFee: number) => void;
  onDelete: (id: string) => void;
}

function EditIcon() {
  return (
    <svg
      className="btn-icon"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3 2.3a1.5 1.5 0 0 1 2.1 0l.3.3a1.5 1.5 0 0 1 0 2.1L5.4 12.9l-2.9.7.7-2.9 8.1-8.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="btn-icon"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5h10M6.3 4.5V3a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1v1.5M4.4 4.5l.5 8.1a1 1 0 0 0 1 .9h4.2a1 1 0 0 0 1-.9l.5-8.1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrderCard({ order, onSaveEdit, onDelete }: OrderCardProps) {
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeliveryFee, setEditedDeliveryFee] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleStartEdit() {
    setEditedStatus(order.status);
    setEditedDeliveryFee(order.deliveryFee.toString());
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditedStatus("");
    setEditedDeliveryFee("");
    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (editedDeliveryFee.trim() === "" || editedStatus.trim() === "") return;

    const editedDeliveryFeeN = Number(editedDeliveryFee);

    onSaveEdit(order.id, editedStatus, editedDeliveryFeeN);

    setEditedStatus("");
    setEditedDeliveryFee("");
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Excluir o pedido de ${order.customerName}?`)) {
      onDelete(order.id);
    }
  }

  if (isEditing) {
    return (
      <div className="order-card">
        <div className="order-card-top">
          <div>
            <h3 className="order-card-restaurant">{order.restaurant}</h3>
            <p className="order-card-customer">para {order.customerName}</p>
          </div>
        </div>
        <div className="card-edit-fields">
          <div className="field">
            <label>Status</label>
            <select
              className="input"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Taxa de entrega</label>
            <div className="fee-input-wrap">
              <input
                className="input"
                type="number"
                step="0.01"
                min="0"
                inputMode="decimal"
                value={editedDeliveryFee}
                onChange={(e) => setEditedDeliveryFee(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-edit-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleCancelEdit}>
            Cancelar
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>
            Salvar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-card">
      <div className="order-card-top">
        <div>
          <h3 className="order-card-restaurant">{order.restaurant}</h3>
          <p className="order-card-customer">para {order.customerName}</p>
        </div>
        <span className="order-card-fee">
          {formatCurrency(order.deliveryFee)}
        </span>
      </div>
      <span className={getStatusBadgeClass(order.status)}>
        {order.status}
      </span>
      <hr className="order-card-divider" />
      <div className="order-card-actions">
        <button className="btn btn-ghost btn-sm" onClick={handleStartEdit}>
          <EditIcon />
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <TrashIcon />
          Excluir
        </button>
      </div>
    </div>
  );
}
