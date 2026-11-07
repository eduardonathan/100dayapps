import { useState, type FormEvent } from "react";
import {
  CATEGORIES,
  PRIORITIES,
  STATUSES,
} from "../lib/ticketOptions";

interface TicketFormProps {
  onCreate: (
    requesterName: string,
    subject: string,
    category: string,
    priority: string,
    status: string,
  ) => void;
}

const EMPTY = {
  requesterName: "",
  subject: "",
  category: "",
  priority: "",
  status: "Aberto",
};

export function TicketForm({ onCreate }: TicketFormProps) {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const missing =
    form.requesterName.trim() === "" ||
    form.subject.trim() === "" ||
    form.category === "" ||
    form.priority === "" ||
    form.status === "";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (missing) {
      setTouched(true);
      return;
    }

    onCreate(
      form.requesterName.trim(),
      form.subject.trim(),
      form.category,
      form.priority,
      form.status,
    );

    setForm(EMPTY);
    setTouched(false);
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Abrir chamado</h2>
        <p>Registre uma nova solicitação para a equipe de TI.</p>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="tf-name">Solicitante</label>
          <input
            id="tf-name"
            value={form.requesterName}
            onChange={(e) => set("requesterName", e.target.value)}
            placeholder="Ex.: Ana Souza"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="tf-subject">Assunto</label>
          <input
            id="tf-subject"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="Descreva o problema em uma linha"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="tf-category">Categoria</label>
          <select
            id="tf-category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="" disabled>
              Selecione…
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="tf-priority">Prioridade</label>
            <select
              id="tf-priority"
              value={form.priority}
              onChange={(e) => set("priority", e.target.value)}
            >
              <option value="" disabled>
                Selecione…
              </option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="tf-status">Status</label>
            <select
              id="tf-status"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-foot">
          <span className="form-hint" data-error={touched && missing}>
            {touched && missing
              ? "Preencha todos os campos."
              : "Todos os campos obrigatórios."}
          </span>
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
