import { useState, type CSSProperties } from "react";
import type { Member } from "../types/Member";
import {
  PLAN_OPTIONS,
  STATUS_OPTIONS,
  initialsOf,
  isGalaxyPlan,
  planColor,
  planLabel,
  statusColor,
} from "../lib/memberStyle";

interface MemberCardProps {
  member: Member;
  onSaveEdit: (id: string, planEdited: string, statusEdited: string) => void;
  onDelete: (id: string) => void;
}

export function MemberCard({ member, onSaveEdit, onDelete }: MemberCardProps) {
  const [planEdited, setPlanEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const sColor = statusColor(member.status);
  const pColor = planColor(member.plan);

  function handleStartEdit() {
    setPlanEdited(member.plan);
    setStatusEdited(member.status);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setPlanEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (planEdited.trim() === "" || statusEdited.trim() === "") return;

    onSaveEdit(member.id, planEdited, statusEdited);

    setPlanEdited("");
    setStatusEdited("");
    setIsEditing(false);
  }

  return (
    <article
      className="member-card"
      style={{ "--status-color": sColor } as CSSProperties}
    >
      <div className="member-card__top">
        <div className="member-card__avatar">{initialsOf(member.name)}</div>
        <span className="tag" style={{ "--tag-color": sColor } as CSSProperties}>
          {member.status}
        </span>
      </div>

      <h3 className="member-card__lead">
        {member.name}
        <span className="member-card__id">Aluno</span>
      </h3>

      {isEditing ? (
        <div className="edit-grid">
          <div className="field">
            <label htmlFor={`edit-plan-${member.id}`}>Plano</label>
            <select
              id={`edit-plan-${member.id}`}
              className="control"
              value={planEdited}
              onChange={(e) => setPlanEdited(e.target.value)}
            >
              {PLAN_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {planLabel(p)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`edit-status-${member.id}`}>Status</label>
            <select
              id={`edit-status-${member.id}`}
              className="control"
              value={statusEdited}
              onChange={(e) => setStatusEdited(e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="row-2">
            <button className="btn btn--primary btn--sm" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn--ghost btn--sm" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="member-card__tags">
            <span
              className="tag"
              style={
                {
                  "--tag-color": pColor,
                  ...(isGalaxyPlan(member.plan) && {
                    boxShadow: "0 0 0 3px var(--pl-galaxy-glow)",
                  }),
                } as CSSProperties
              }
            >
              {planLabel(member.plan)}
            </span>
          </div>

          <div className="member-card__actions">
            <button className="btn btn--ghost btn--sm" onClick={handleStartEdit}>
              Editar
            </button>
            <button
              className="btn btn--danger btn--sm"
              onClick={() => onDelete(member.id)}
            >
              Excluir
            </button>
          </div>
        </>
      )}
    </article>
  );
}
