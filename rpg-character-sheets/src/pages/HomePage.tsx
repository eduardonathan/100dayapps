import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListCharactersUseCase } from "../api/ListCharactersUseCase";
import { PixelAvatar } from "../components/PixelAvatar";
import type { Character } from "../types/Character";

export function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchCharacters() {
      setLoading(true);
      setError(null);

      try {
        const data = await new ListCharactersUseCase().handle();
        if (!canceled) {
          setCharacters(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar os personagens.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Personagens</h1>
          <p className="subtitle">Sua guilda de heróis, forjada pixel a pixel</p>
        </div>
        <Link to="/characters/new" className="btn btn-primary">
          + Novo personagem
        </Link>
      </div>

      {loading && (
        <div className="state-panel">
          <span className="spinner" />
          <p>Convocando a guilda...</p>
        </div>
      )}

      {error && <div className="state-panel error">{error}</div>}

      {!loading && !error && characters.length === 0 && (
        <div className="state-panel">
          <p>Nenhum personagem por aqui ainda.</p>
          <Link to="/characters/new" className="btn btn-ghost">
            Criar o primeiro herói
          </Link>
        </div>
      )}

      {!loading && !error && characters.length > 0 && (
        <div className="character-grid">
          {characters.map((character) => (
            <Link
              key={character.id}
              to={`/characters/${character.id}`}
              className="character-card"
            >
              <PixelAvatar
                characterClass={character.class}
                seed={character.id + character.name}
                size={88}
              />
              <div className="character-card-name">{character.name}</div>
              <div className="character-card-class">{character.class}</div>
              <span className="level-badge">Nível {character.level}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
