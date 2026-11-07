import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCharacterUseCase } from "../api/CreateCharacterUseCase";
import { PixelAvatar } from "../components/PixelAvatar";

const CLASS_OPTIONS = [
  "Guerreiro",
  "Mago",
  "Arqueiro",
  "Ladino",
  "Paladino",
  "Clérigo",
  "Bárbaro",
  "Bardo",
  "Druida",
  "Necromante",
];

export function NewCharacterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState(CLASS_OPTIONS[0]);
  const [level, setLevel] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await new CreateCharacterUseCase().handle({
        name,
        class: characterClass,
        level,
      });
      navigate("/");
    } catch {
      setError("Não foi possível criar o personagem.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Novo personagem</h1>
          <p className="subtitle">Dê vida a um novo herói para sua guilda</p>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-preview">
          <PixelAvatar characterClass={characterClass} seed={name} size={120} />
          <div className="character-card-name">{name || "Sem nome"}</div>
          <div className="character-card-class">{characterClass}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Aragorn"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="class">Classe</label>
            <select
              id="class"
              value={characterClass}
              onChange={(event) => setCharacterClass(event.target.value)}
              required
            >
              {CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="level">Nível</label>
            <input
              id="level"
              type="number"
              min={1}
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
              required
            />
          </div>

          {error && <p className="field-error">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Salvando..." : "Criar personagem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
