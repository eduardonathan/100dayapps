import { useState, type FormEvent } from "react";
import { MODALITIES } from "../lib/modalities";

interface ClassScheduleFormProps {
  onCreate: (
    modality: string,
    instructor: string,
    time: string,
    capacity: number,
  ) => void;
}

export function ClassScheduleForm({ onCreate }: ClassScheduleFormProps) {
  const [modality, setModality] = useState("");
  const [instructor, setInstructor] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");

  const isValid =
    modality.trim() !== "" &&
    instructor.trim() !== "" &&
    time.trim() !== "" &&
    capacity.trim() !== "" &&
    Number(capacity) > 0;

  function handleCreateClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    onCreate(modality, instructor, time, Number(capacity));

    setModality("");
    setInstructor("");
    setTime("");
    setCapacity("");
  }

  return (
    <form className="form-grid" onSubmit={handleCreateClass}>
      <div className="field">
        <label htmlFor="f-modality">Modalidade</label>
        <select
          id="f-modality"
          className="control"
          value={modality}
          onChange={(e) => setModality(e.target.value)}
        >
          <option value="" disabled>
            Selecione a modalidade
          </option>
          {MODALITIES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-instructor">Instrutor</label>
        <input
          id="f-instructor"
          className="control"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          placeholder="Ex.: Léo Freitas"
          autoComplete="off"
        />
      </div>

      <div className="row-2">
        <div className="field">
          <label htmlFor="f-time">Horário</label>
          <input
            id="f-time"
            type="time"
            className="control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="f-capacity">Vagas na turma</label>
          <input
            id="f-capacity"
            type="number"
            min={1}
            max={99}
            className="control"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="15"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={!isValid}>
          Abrir turma
        </button>
      </div>

      <p className="form-hint">
        A turma abre com todas as vagas livres. Os check-ins são feitos depois,
        pelo card da turma.
      </p>
    </form>
  );
}
