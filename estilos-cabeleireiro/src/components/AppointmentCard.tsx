import { useState } from "react";
import type { Appointment } from "../types/Appointment";
import { PROFESSIONALS, STATUS_OPTIONS } from "../constants/salon";
import { StatusBadge } from "./StatusBadge";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  XIcon,
} from "./icons";
import { useToast } from "../contexts/ToastContext";
import { isCompleteDate, isCompleteTime, maskDate, maskTime } from "../utils/masks";
import "./AppointmentCard.css";

interface AppointmentCardProps {
  appointment: Appointment;
  onSaveEdit: (
    id: string,
    professional: string,
    date: string,
    time: string,
    status: string,
  ) => void;
  onDelete: (id: string) => void;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AppointmentCard({
  appointment,
  onSaveEdit,
  onDelete,
}: AppointmentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [professionalEdited, setProfessionalEdited] = useState("");
  const [dateEdited, setDateEdited] = useState("");
  const [timeEdited, setTimeEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const { showToast } = useToast();

  function startEdit() {
    setIsEditing(true);
    setProfessionalEdited(appointment.professional);
    setDateEdited(appointment.date);
    setTimeEdited(appointment.time);
    setStatusEdited(appointment.status);
  }

  function cancelEdit() {
    setProfessionalEdited("");
    setDateEdited("");
    setTimeEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (!isCompleteDate(dateEdited)) {
      showToast("Informe a data completa no formato dd/mm/aaaa.");
      return;
    }
    if (!isCompleteTime(timeEdited)) {
      showToast("Informe o horário completo no formato hh:mm.");
      return;
    }

    onSaveEdit(
      appointment.id,
      professionalEdited,
      dateEdited,
      timeEdited,
      statusEdited,
    );

    setProfessionalEdited("");
    setDateEdited("");
    setTimeEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="card appointment-card">
        <div className="appointment-edit">
          <div className="field">
            <label htmlFor={`professional-${appointment.id}`}>
              Profissional
            </label>
            <select
              id={`professional-${appointment.id}`}
              className="input"
              value={professionalEdited}
              onChange={(e) => setProfessionalEdited(e.target.value)}
            >
              {PROFESSIONALS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="appointment-edit-row">
            <div className="field">
              <label htmlFor={`date-${appointment.id}`}>Data</label>
              <input
                id={`date-${appointment.id}`}
                className="input"
                value={dateEdited}
                onChange={(e) => setDateEdited(maskDate(e.target.value))}
                placeholder="dd/mm/aaaa"
                inputMode="numeric"
                maxLength={10}
              />
            </div>
            <div className="field">
              <label htmlFor={`time-${appointment.id}`}>Horário</label>
              <input
                id={`time-${appointment.id}`}
                className="input"
                value={timeEdited}
                onChange={(e) => setTimeEdited(maskTime(e.target.value))}
                placeholder="hh:mm"
                inputMode="numeric"
                maxLength={5}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor={`status-${appointment.id}`}>Status</label>
            <select
              id={`status-${appointment.id}`}
              className="input"
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="appointment-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSaveEdit}
              type="button"
            >
              <CheckIcon width={15} height={15} />
              Salvar
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={cancelEdit}
              type="button"
            >
              <XIcon width={15} height={15} />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card appointment-card">
      <div className="appointment-card-top">
        <div className="appointment-avatar" aria-hidden="true">
          {initials(appointment.clientName)}
        </div>
        <div className="appointment-heading">
          <h3>{appointment.clientName}</h3>
          <p className="appointment-service">{appointment.service}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="appointment-details">
        <span>
          <UserIcon width={15} height={15} />
          {appointment.professional}
        </span>
        <span>
          <CalendarIcon width={15} height={15} />
          {appointment.date}
        </span>
        <span>
          <ClockIcon width={15} height={15} />
          {appointment.time}
        </span>
      </div>

      <div className="appointment-actions">
        <button className="btn btn-secondary btn-sm" onClick={startEdit} type="button">
          <PencilIcon width={14} height={14} />
          Editar
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(appointment.id)}
          type="button"
        >
          <TrashIcon width={14} height={14} />
          Excluir
        </button>
      </div>
    </div>
  );
}
