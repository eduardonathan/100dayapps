import { useState, type CSSProperties } from "react";
import type { ClassSchedule } from "../types/ClassSchedule";
import { modalityColor } from "../lib/modalities";

interface ClassScheduleCardProps {
  classSchedule: ClassSchedule;
  onSave: (
    id: string,
    instructor: string,
    capacity: number,
    enrolled: number,
  ) => void;
  onDelete: (id: string) => void;
}

function levelFor(ratio: number): "good" | "mid" | "full" {
  if (ratio >= 1) return "full";
  if (ratio >= 0.75) return "mid";
  return "good";
}

export function ClassScheduleCard({
  classSchedule,
  onSave,
  onDelete,
}: ClassScheduleCardProps) {
  const [instructorEdited, setInstructorEdited] = useState("");
  const [capacityEdited, setCapacityEdited] = useState("");
  const [enrolledEdited, setEnrolledEdited] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const capacity = classSchedule.capacity;
  const enrolled = classSchedule.enrolled ?? 0;
  const free = Math.max(0, capacity - enrolled);
  const ratio = capacity > 0 ? enrolled / capacity : 0;
  const level = levelFor(ratio);
  const color = modalityColor(classSchedule.modality);

  function startEdit() {
    setInstructorEdited(classSchedule.instructor);
    setCapacityEdited(capacity.toString());
    setEnrolledEdited(enrolled.toString());
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleSaveEdit() {
    const nextCapacity = Number(capacityEdited);
    const nextEnrolled = Number(enrolledEdited);

    if (
      instructorEdited.trim() === "" ||
      capacityEdited.trim() === "" ||
      enrolledEdited.trim() === "" ||
      nextCapacity < 1 ||
      nextEnrolled < 0 ||
      nextEnrolled > nextCapacity
    ) {
      return;
    }

    onSave(classSchedule.id, instructorEdited, nextCapacity, nextEnrolled);
    setIsEditing(false);
  }

  function checkIn(delta: number) {
    const next = enrolled + delta;
    if (next < 0 || next > capacity) return;
    onSave(classSchedule.id, classSchedule.instructor, capacity, next);
  }

  return (
    <article
      className="class-card"
      style={{ "--mod-color": color } as CSSProperties}
    >
      <div className="class-card__top">
        <span className="tag">{classSchedule.modality}</span>
        <span className="time-badge">
          {classSchedule.time}
          <small>Horário</small>
        </span>
      </div>

      <h3 className="class-card__lead">
        {classSchedule.instructor}
        <small>Instrutor</small>
      </h3>

      {isEditing ? (
        <div className="edit-grid">
          <div className="field">
            <label htmlFor={`edit-instr-${classSchedule.id}`}>Instrutor</label>
            <input
              id={`edit-instr-${classSchedule.id}`}
              className="control"
              value={instructorEdited}
              onChange={(e) => setInstructorEdited(e.target.value)}
              placeholder="Nome do instrutor"
              autoComplete="off"
            />
          </div>
          <div className="row-2">
            <div className="field">
              <label htmlFor={`edit-cap-${classSchedule.id}`}>Vagas</label>
              <input
                id={`edit-cap-${classSchedule.id}`}
                type="number"
                min={1}
                max={99}
                className="control"
                value={capacityEdited}
                onChange={(e) => setCapacityEdited(e.target.value)}
                placeholder="Vagas"
              />
            </div>
            <div className="field">
              <label htmlFor={`edit-enr-${classSchedule.id}`}>Inscritos</label>
              <input
                id={`edit-enr-${classSchedule.id}`}
                type="number"
                min={0}
                max={Number(capacityEdited) || 99}
                className="control"
                value={enrolledEdited}
                onChange={(e) => setEnrolledEdited(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <div className="row-2">
            <button className="btn btn--primary btn--sm" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn--ghost btn--sm" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="capacity">
            <div className="capacity__row">
              <span>Ocupação</span>
              <b>
                {enrolled} / {capacity}
              </b>
            </div>
            <div className="capacity__track">
              <div
                className="capacity__fill"
                data-level={level}
                style={{ width: `${Math.min(100, ratio * 100)}%` }}
              />
            </div>
            <p className="capacity__note" data-level={level}>
              {free === 0 ? "Turma lotada" : `${free} ${free === 1 ? "vaga livre" : "vagas livres"}`}
            </p>
          </div>

          <div className="checkin">
            <span className="checkin__label">Check-in</span>
            <div className="checkin__ctrl">
              <button
                className="step"
                onClick={() => checkIn(-1)}
                disabled={enrolled <= 0}
                aria-label="Remover um inscrito"
              >
                –
              </button>
              <button
                className="step"
                onClick={() => checkIn(1)}
                disabled={enrolled >= capacity}
                aria-label="Adicionar um inscrito"
              >
                +
              </button>
            </div>
          </div>

          <div className="class-card__actions">
            <button className="btn btn--ghost btn--sm" onClick={startEdit}>
              Editar
            </button>
            <button
              className="btn btn--danger btn--sm"
              onClick={() => onDelete(classSchedule.id)}
            >
              Remover
            </button>
          </div>
        </>
      )}
    </article>
  );
}
