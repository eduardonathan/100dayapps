import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import { FlameIcon, TimerIcon } from "./Icon";

interface RecipeCardProps {
  recipe: Recipe;
  onSaveEdit: (id: string, preparationTime: number, difficulty: string) => void;
  onDeleteRecipe: (id: string) => void;
}

const DIFFICULTY_OPTIONS = ["Fácil", "Médio", "Difícil"];

function difficultyModifier(difficulty: string) {
  const normalized = difficulty
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  if (normalized.startsWith("fac")) return "badge-diff-facil";
  if (normalized.startsWith("med")) return "badge-diff-medio";
  if (normalized.startsWith("dif")) return "badge-diff-dificil";
  return "";
}

export function RecipeCard({
  recipe,
  onSaveEdit,
  onDeleteRecipe,
}: RecipeCardProps) {
  const [editedPreparationTime, setEditedPreparationTime] = useState("");
  const [editedDifficulty, setEditedDifficulty] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleStartEdit() {
    setIsEditing(true);
    setEditedPreparationTime(recipe.preparationTime.toString());
    setEditedDifficulty(recipe.difficulty);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditedPreparationTime("");
    setEditedDifficulty("");
  }

  function handleSaveEdit() {
    if (editedDifficulty.trim() === "" || editedPreparationTime.trim() === "")
      return;

    const editedPreparationTimeNumber = Number(editedPreparationTime);

    onSaveEdit(recipe.id, editedPreparationTimeNumber, editedDifficulty);

    setEditedPreparationTime("");
    setEditedDifficulty("");
    setIsEditing(false);
  }

  return (
    <article className="recipe-card">
      <span className="card-kicker">Receita</span>
      <h3>{recipe.name}</h3>
      <p className="main-ingredient">
        Ingrediente principal: {recipe.mainIngredient}
      </p>

      <div className="card-divider" />

      {isEditing ? (
        <div className="card-edit">
          <div className="field">
            <label htmlFor={`time-${recipe.id}`}>Tempo de preparo (min)</label>
            <input
              id={`time-${recipe.id}`}
              type="number"
              min="0"
              value={editedPreparationTime}
              onChange={(e) => setEditedPreparationTime(e.target.value)}
              placeholder="Tempo de preparo"
            />
          </div>
          <div className="field">
            <label htmlFor={`diff-${recipe.id}`}>Dificuldade</label>
            <select
              id={`diff-${recipe.id}`}
              value={editedDifficulty}
              onChange={(e) => setEditedDifficulty(e.target.value)}
            >
              <option value="" disabled>
                Selecione…
              </option>
              {DIFFICULTY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>
              Salvar
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="badge-row">
            <span className="badge badge-time">
              <TimerIcon size={14} />
              {recipe.preparationTime} min
            </span>
            <span
              className={`badge ${difficultyModifier(recipe.difficulty)}`}
            >
              <FlameIcon size={14} />
              {recipe.difficulty}
            </span>
          </div>
          <div className="card-actions">
            <button className="btn btn-ghost btn-sm" onClick={handleStartEdit}>
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteRecipe(recipe.id)}
            >
              Excluir
            </button>
          </div>
        </>
      )}
    </article>
  );
}
