import { useState } from "react";
import type { RentalContract } from "../types/RentalContract";
import {
  IconAlert,
  IconCalendar,
  IconCash,
  IconCheck,
  IconEdit,
  IconPin,
  IconTag,
  IconTrash,
  IconX,
} from "./icons";
import {
  STATUS_OPTIONS,
  centsDigitsToNumber,
  currencyFormatter,
  formatCentsDigits,
  maskCurrencyDigits,
  numberToCentsDigits,
} from "../utils/masks";

interface RentalContractCardProps {
  contract: RentalContract;
  onSaveEdit: (
    id: string,
    monthlyRentEdited: number,
    statusEdited: string,
  ) => void;
  onDelete: (id: string) => void;
}

type StatusTone = "active" | "pending" | "late" | "closed" | "neutral";

function getStatusTone(status: string): StatusTone {
  const normalized = status
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

  if (normalized.includes("atras")) return "late";
  if (normalized.includes("encerr") || normalized.includes("finaliz"))
    return "closed";
  if (normalized.includes("pend") || normalized.includes("nao iniciado"))
    return "pending";
  if (normalized.includes("ativo") || normalized.includes("vigente"))
    return "active";
  return "neutral";
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function RentalContractCard({
  contract,
  onSaveEdit,
  onDelete,
}: RentalContractCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [monthlyRentEdited, setMonthlyRentEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const [rentError, setRentError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const canonicalStatus = STATUS_OPTIONS.find(
    (option) => option.toLowerCase() === contract.status.toLowerCase(),
  );
  const statusOptions = canonicalStatus
    ? STATUS_OPTIONS
    : [contract.status, ...STATUS_OPTIONS];

  function handleStartEdit() {
    setMonthlyRentEdited(numberToCentsDigits(contract.monthlyRent));
    setStatusEdited(canonicalStatus ?? contract.status);
    setRentError(null);
    setStatusError(null);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setMonthlyRentEdited("");
    setStatusEdited("");
    setRentError(null);
    setStatusError(null);
    setIsEditing(false);
  }

  function handleSaveEdit() {
    const monthlyRentNumber = centsDigitsToNumber(monthlyRentEdited);

    const nextRentError =
      monthlyRentEdited.trim() === ""
        ? "Informe o valor do aluguel"
        : monthlyRentNumber <= 0
          ? "Informe um valor válido"
          : null;
    const nextStatusError =
      statusEdited.trim() === "" ? "Selecione o status" : null;

    setRentError(nextRentError);
    setStatusError(nextStatusError);
    if (nextRentError || nextStatusError) return;

    onSaveEdit(contract.id, monthlyRentNumber, statusEdited);

    setMonthlyRentEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  const tone = getStatusTone(contract.status);

  return (
    <article className="contract-card">
      <header className="contract-card__header">
        <div className="contract-card__identity">
          <span className="contract-card__avatar" aria-hidden="true">
            {getInitials(contract.tenantName)}
          </span>
          <div className="contract-card__identity-text">
            <h3 className="contract-card__name">{contract.tenantName}</h3>
            <p className="contract-card__address">
              <IconPin className="contract-card__icon" />
              {contract.propertyAddress}
            </p>
          </div>
        </div>
        <span className={`status-pill status-pill--${tone}`}>
          {contract.status}
        </span>
      </header>

      {isEditing ? (
        <div className="contract-card__edit-form">
          <label className={`field${rentError ? " field--error" : ""}`}>
            <span className="field__label">
              <IconCash className="contract-card__icon" />
              Aluguel mensal
            </span>
            <input
              className="field__input"
              inputMode="numeric"
              value={formatCentsDigits(monthlyRentEdited)}
              onChange={(e) => {
                setMonthlyRentEdited(maskCurrencyDigits(e.target.value));
                setRentError(null);
              }}
              placeholder="R$ 0,00"
              autoFocus
            />
            {rentError && (
              <span className="field__error">
                <IconAlert className="field__error-icon" />
                {rentError}
              </span>
            )}
          </label>
          <label className={`field${statusError ? " field--error" : ""}`}>
            <span className="field__label">
              <IconTag className="contract-card__icon" />
              Status do contrato
            </span>
            <select
              className="field__input"
              value={statusEdited}
              onChange={(e) => {
                setStatusEdited(e.target.value);
                setStatusError(null);
              }}
            >
              <option value="" disabled hidden>
                Selecione o status
              </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {statusError && (
              <span className="field__error">
                <IconAlert className="field__error-icon" />
                {statusError}
              </span>
            )}
          </label>
          <div className="contract-card__actions">
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={handleSaveEdit}
            >
              <IconCheck className="contract-card__icon" />
              Salvar
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={handleCancelEdit}
            >
              <IconX className="contract-card__icon" />
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="contract-card__body">
          <dl className="contract-card__stats">
            <div className="contract-card__stat">
              <dt>
                <IconCash className="contract-card__icon" />
                Aluguel mensal
              </dt>
              <dd>{currencyFormatter.format(contract.monthlyRent)}</dd>
            </div>
            <div className="contract-card__stat">
              <dt>
                <IconCalendar className="contract-card__icon" />
                Início do contrato
              </dt>
              <dd>{contract.startDate}</dd>
            </div>
          </dl>
          <div className="contract-card__actions">
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={handleStartEdit}
            >
              <IconEdit className="contract-card__icon" />
              Editar
            </button>
            <button
              type="button"
              className="btn btn--danger-ghost btn--sm"
              onClick={() => onDelete(contract.id)}
            >
              <IconTrash className="contract-card__icon" />
              Excluir
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

