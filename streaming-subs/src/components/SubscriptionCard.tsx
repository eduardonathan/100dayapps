import { useState, type CSSProperties } from "react";
import type { Subscription } from "../types/Subscription";
import { getBrand } from "../lib/brands";
import { brl, renewalInfo } from "../lib/format";

interface SubscriptionCardProps {
  subscription: Subscription;
  onSaveEdit: (id: string, plan: string, price: number) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  onSaveEdit,
  onDelete,
}: SubscriptionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [planEdited, setPlanEdited] = useState("");
  const [priceEdited, setPriceEdited] = useState("");

  const brand = getBrand(subscription.serviceName);
  const renew = renewalInfo(subscription.renewDate);

  function handleStartEdit() {
    setPlanEdited(subscription.plan);
    setPriceEdited(String(subscription.price).replace(".", ","));
    setIsEditing(true);
  }

  function handleSaveEdit() {
    const nextPrice = Number(priceEdited.replace(",", "."));
    if (planEdited.trim() === "" || !Number.isFinite(nextPrice) || nextPrice <= 0) {
      return;
    }
    onSaveEdit(subscription.id, planEdited.trim(), nextPrice);
    setIsEditing(false);
  }

  return (
    <article className="card" style={{ "--brand": brand.color } as CSSProperties}>
      <div className="card-top">
        <span
          className="tile"
          style={{ background: brand.color, color: brand.ink }}
          aria-hidden="true"
        >
          {brand.monogram}
        </span>

        <div className="card-id">
          <h3 title={subscription.serviceName}>{subscription.serviceName}</h3>
          <span className="card-plan">{subscription.plan}</span>
        </div>

        {!isEditing && (
          <div className="card-actions">
            <button
              type="button"
              onClick={handleStartEdit}
              aria-label={`Editar ${subscription.serviceName}`}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3z" />
                <path d="M13.5 6.5l3 3" />
              </svg>
            </button>
            <button
              type="button"
              className="card-action-danger"
              onClick={() => onDelete(subscription.id)}
              aria-label={`Excluir ${subscription.serviceName}`}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="card-edit">
          <label className="field-label">
            Plano
            <input
              className="field"
              value={planEdited}
              onChange={(event) => setPlanEdited(event.target.value)}
              autoFocus
            />
          </label>
          <label className="field-label">
            Preço mensal
            <span className="field-wrap">
              <span className="field-prefix">R$</span>
              <input
                className="field field-has-prefix"
                value={priceEdited}
                onChange={(event) => setPriceEdited(event.target.value)}
                inputMode="decimal"
              />
            </span>
          </label>
          <div className="card-edit-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSaveEdit}
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <div className="card-foot">
          <span className="card-price">
            {brl(Number(subscription.price) || 0)}
            <span className="card-price-unit">/mês</span>
          </span>
          <span className={`renew renew-${renew.tone}`}>{renew.label}</span>
        </div>
      )}
    </article>
  );
}
