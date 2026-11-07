import { useState, type FormEvent } from "react";
import { IconAlert, IconCalendar, IconCash, IconPin, IconPlus, IconTag, IconUser } from "./icons";
import {
  STATUS_OPTIONS,
  centsDigitsToNumber,
  formatCentsDigits,
  isCompleteDate,
  maskCurrencyDigits,
  maskDate,
} from "../utils/masks";

interface RentalContractFormProps {
  onCreate: (
    tenantName: string,
    propertyAddress: string,
    monthlyRent: number,
    startDate: string,
    status: string,
  ) => void;
}

type FieldName =
  | "tenantName"
  | "propertyAddress"
  | "monthlyRent"
  | "startDate"
  | "status";

type FormErrors = Partial<Record<FieldName, string>>;

export function RentalContractForm({ onCreate }: RentalContractFormProps) {
  const [tenantName, setTenantName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function clearError(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleCreateContract(event: FormEvent) {
    event.preventDefault();

    const monthlyRentNumber = centsDigitsToNumber(monthlyRent);
    const nextErrors: FormErrors = {};

    if (tenantName.trim() === "")
      nextErrors.tenantName = "Informe o nome do inquilino";
    if (propertyAddress.trim() === "")
      nextErrors.propertyAddress = "Informe o endereço";
    if (monthlyRent.trim() === "")
      nextErrors.monthlyRent = "Informe o valor do aluguel";
    else if (monthlyRentNumber <= 0)
      nextErrors.monthlyRent = "Informe um valor válido";
    if (startDate.trim() === "")
      nextErrors.startDate = "Informe a data de início";
    else if (!isCompleteDate(startDate))
      nextErrors.startDate = "Data incompleta (dd/mm/aaaa)";
    if (status.trim() === "") nextErrors.status = "Selecione o status";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onCreate(tenantName, propertyAddress, monthlyRentNumber, startDate, status);

    setTenantName("");
    setPropertyAddress("");
    setMonthlyRent("");
    setStartDate("");
    setStatus("");
    setErrors({});
  }

  return (
    <section className="form-card">
      <div className="form-card__heading">
        <h2>Novo contrato de aluguel</h2>
        <p>Cadastre um contrato para acompanhar aluguel, status e vigência.</p>
      </div>
      <form className="form-card__grid" onSubmit={handleCreateContract} noValidate>
        <label className={`field${errors.tenantName ? " field--error" : ""}`}>
          <span className="field__label">
            <IconUser className="field__icon" />
            Nome do inquilino
          </span>
          <input
            className="field__input"
            value={tenantName}
            onChange={(e) => {
              setTenantName(e.target.value);
              clearError("tenantName");
            }}
            placeholder="Ex: Ana Souza"
          />
          {errors.tenantName && (
            <span className="field__error">
              <IconAlert className="field__error-icon" />
              {errors.tenantName}
            </span>
          )}
        </label>
        <label
          className={`field${errors.propertyAddress ? " field--error" : ""}`}
        >
          <span className="field__label">
            <IconPin className="field__icon" />
            Endereço da propriedade
          </span>
          <input
            className="field__input"
            value={propertyAddress}
            onChange={(e) => {
              setPropertyAddress(e.target.value);
              clearError("propertyAddress");
            }}
            placeholder="Ex: Rua das Flores, 123"
          />
          {errors.propertyAddress && (
            <span className="field__error">
              <IconAlert className="field__error-icon" />
              {errors.propertyAddress}
            </span>
          )}
        </label>
        <label className={`field${errors.monthlyRent ? " field--error" : ""}`}>
          <span className="field__label">
            <IconCash className="field__icon" />
            Aluguel mensal
          </span>
          <input
            className="field__input"
            inputMode="numeric"
            value={formatCentsDigits(monthlyRent)}
            onChange={(e) => {
              setMonthlyRent(maskCurrencyDigits(e.target.value));
              clearError("monthlyRent");
            }}
            placeholder="R$ 0,00"
          />
          {errors.monthlyRent && (
            <span className="field__error">
              <IconAlert className="field__error-icon" />
              {errors.monthlyRent}
            </span>
          )}
        </label>
        <label className={`field${errors.startDate ? " field--error" : ""}`}>
          <span className="field__label">
            <IconCalendar className="field__icon" />
            Início do contrato
          </span>
          <input
            className="field__input"
            inputMode="numeric"
            value={startDate}
            onChange={(e) => {
              setStartDate(maskDate(e.target.value));
              clearError("startDate");
            }}
            placeholder="dd/mm/aaaa"
          />
          {errors.startDate && (
            <span className="field__error">
              <IconAlert className="field__error-icon" />
              {errors.startDate}
            </span>
          )}
        </label>
        <label className={`field${errors.status ? " field--error" : ""}`}>
          <span className="field__label">
            <IconTag className="field__icon" />
            Status do contrato
          </span>
          <select
            className="field__input"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              clearError("status");
            }}
          >
            <option value="" disabled hidden>
              Selecione o status
            </option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="field__error">
              <IconAlert className="field__error-icon" />
              {errors.status}
            </span>
          )}
        </label>
        <button type="submit" className="btn btn--primary form-card__submit">
          <IconPlus className="field__icon" />
          Criar contrato
        </button>
      </form>
    </section>
  );
}
