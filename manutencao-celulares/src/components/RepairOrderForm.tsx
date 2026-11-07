import { useState, type FormEvent } from "react";
import { STATUS_OPTIONS } from "../lib/format";

interface RepairOrderFormProps {
  onCreate: (
    customerName: string,
    deviceModel: string,
    issue: string,
    cost: number,
    status: string,
  ) => void;
}

export function RepairOrderForm({ onCreate }: RepairOrderFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [issue, setIssue] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("");

  function handleCreateRepairOrder(event: FormEvent) {
    event.preventDefault();

    if (
      customerName.trim() === "" ||
      deviceModel.trim() === "" ||
      issue.trim() === "" ||
      cost.trim() === "" ||
      status.trim() === ""
    )
      return;

    const costNumber = Number(cost);

    onCreate(customerName, deviceModel, issue, costNumber, status);

    setCustomerName("");
    setDeviceModel("");
    setIssue("");
    setCost("");
    setStatus("");
  }

  return (
    <div className="panel panel--form">
      <p className="panel__title">Nova ordem de reparo</p>
      <p className="panel__subtitle">
        Registre um aparelho que chegou para manutenção.
      </p>

      <form className="form" onSubmit={handleCreateRepairOrder}>
        <div className="field">
          <label className="field__label" htmlFor="customerName">
            Cliente
          </label>
          <input
            id="customerName"
            className="input"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nome do cliente"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="deviceModel">
            Modelo do aparelho
          </label>
          <input
            id="deviceModel"
            className="input"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
            placeholder="Ex.: iPhone 13 Pro"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="issue">
            Problema relatado
          </label>
          <input
            id="issue"
            className="input"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Ex.: tela quebrada, não carrega"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="cost">
            Valor do reparo (R$)
          </label>
          <input
            id="cost"
            className="input"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0,00"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>
              Selecione o status
            </option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn--primary btn--block">
          Criar ordem
        </button>
      </form>
    </div>
  );
}
