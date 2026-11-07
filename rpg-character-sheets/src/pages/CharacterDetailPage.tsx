import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Character } from "../types/Character";
import { GetCharacterByIdUseCase } from "../api/GetCharacterByIdUseCase";
import { DeleteCharacterUseCase } from "../api/DeleteCharacterUseCase";
import { PixelAvatar } from "../components/PixelAvatar";
import { getClassTheme } from "../components/classTheme";

export function CharacterDetailPage() {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function getCharacterById() {
      setLoading(true);
      setError(null);

      try {
        const data = await new GetCharacterByIdUseCase().handle(id!);
        if (!canceled) {
          setCharacter(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os dados do personagem.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    getCharacterById();

    return () => {
      canceled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!id || !character) return;
    if (!window.confirm(`Remover ${character.name} da guilda?`)) return;

    setDeleting(true);
    try {
      await new DeleteCharacterUseCase().handle(id);
      navigate("/");
    } catch {
      setError("Não foi possível remover o personagem.");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="state-panel">
        <span className="spinner" />
        <p>Buscando personagem...</p>
      </div>
    );
  }

  if (error) return <div className="state-panel error">{error}</div>;
  if (!character) return <div className="state-panel">Personagem não encontrado.</div>;

  const theme = getClassTheme(character.class, character.id + character.name);

  return (
    <div>
      <Link to="/" className="back-link">
        ← Voltar para a guilda
      </Link>

      <div className="detail-hero">
        <PixelAvatar characterClass={character.class} seed={character.id + character.name} size={160} />

        <div className="detail-info">
          <h1>{character.name}</h1>
          <span className="detail-class" style={{ color: theme.glow }}>
            {character.class}
          </span>

          <div className="detail-stats">
            <span className="level-badge">Nível {character.level}</span>
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Removendo..." : "Remover personagem"}
        </button>
      </div>
    </div>
  );
}
