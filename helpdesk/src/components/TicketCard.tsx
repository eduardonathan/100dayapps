import { useState } from "react";
import type { Ticket } from "../types/Ticket";
import { PRIORITIES, STATUSES, toneOf } from "../lib/ticketOptions";

interface TicketCardProps {
  ticket: Ticket;
  onSaveEdit: (id: string, statusEdited: string, priorityEdited: string) => void;
  onDelete: (id: string) => void;
}

export function TicketCard({ ticket, onSaveEdit, onDelete }: TicketCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [priorityEdited, setPriorityEdited] = useState(ticket.priority);
  const [statusEdited, setStatusEdited] = useState(ticket.status);

  function handleStartEdit() {
    setPriorityEdited(ticket.priority);
    setStatusEdited(ticket.status);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (priorityEdited.trim() === "" || statusEdited.trim() === "") return;
    onSaveEdit(ticket.id, statusEdited, priorityEdited);
    setIsEditing(false);
  }

  const idLabel = `#${String(ticket.id).padStart(3, "0")}`;

  return (
    <article className="ticket">
      <span className="ticket-id">{idLabel}</span>

      <div className="ticket-body">
        <p className="ticket-subject">{ticket.subject}</p>
        <div className="ticket-meta">
          <span className="who">{ticket.requesterName}</span>
          <span className="dot">·</span>
          <span>{ticket.category}</span>
        </div>
      </div>

      <div className="ticket-side">
        <div className="badges">
          <span
            className="badge"
            data-kind="priority"
            data-tone={toneOf(ticket.priority)}
          >
            {ticket.priority}
          </span>
          <span
            className="badge"
            data-kind="status"
            data-tone={toneOf(ticket.status)}
          >
            <span className="tick" />
            {ticket.status}
          </span>
        </div>

        {!isEditing && (
          <div className="ticket-actions">
            <button className="btn-link" onClick={handleStartEdit}>
              Editar
            </button>
            <button
              className="btn-link"
              data-variant="danger"
              onClick={() => onDelete(ticket.id)}
            >
              Excluir
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="ticket-edit">
          <div className="field">
            <label htmlFor={`pr-${ticket.id}`}>Prioridade</label>
            <select
              id={`pr-${ticket.id}`}
              value={priorityEdited}
              onChange={(e) => setPriorityEdited(e.target.value)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor={`st-${ticket.id}`}>Status</label>
            <select
              id={`st-${ticket.id}`}
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
