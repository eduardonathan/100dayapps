import { useState, type FormEvent } from "react";

interface RecipeFormProps {
  onCreate: (
    name: string,
    mainIngredient: string,
    preparationTime: number,
    difficulty: string,
  ) => void;
}

const DIFFICULTY_OPTIONS = ["Fácil", "Médio", "Difícil"];

export function RecipeForm({ onCreate }: RecipeFormProps) {
  const [name, setName] = useState("");
  const [mainIngredient, setMainIngredient] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [difficulty, setDifficulty] = useState("");

  function handleCreateRecipe(event: FormEvent) {
    event.preventDefault();

    if (
      name.trim() === "" ||
      mainIngredient.trim() === "" ||
      preparationTime.trim() === "" ||
      difficulty.trim() === ""
    )
      return;
    const preparationTimeNumber = Number(preparationTime);
    onCreate(name, mainIngredient, preparationTimeNumber, difficulty);

    setName("");
    setMainIngredient("");
    setPreparationTime("");
    setDifficulty("");
  }

  return (
    <div className="recipe-form panel">
      <h2>Nova receita</h2>
      <p className="form-hint">Preencha os campos para adicionar ao caderno.</p>

      <form onSubmit={handleCreateRecipe}>
        <div className="field">
          <label htmlFor="recipe-name">Nome da receita</label>
          <input
            id="recipe-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Risoto de limão siciliano"
          />
        </div>

        <div className="field">
          <label htmlFor="recipe-ingredient">Principal ingrediente</label>
          <input
            id="recipe-ingredient"
            value={mainIngredient}
            onChange={(e) => setMainIngredient(e.target.value)}
            placeholder="Ex.: Arroz arbóreo"
          />
        </div>

        <div className="field">
          <label htmlFor="recipe-time">Tempo de preparo (min)</label>
          <input
            id="recipe-time"
            type="number"
            min="0"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            placeholder="Ex.: 40"
          />
        </div>

        <div className="field">
          <label htmlFor="recipe-difficulty">Dificuldade</label>
          <select
            id="recipe-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Criar receita
          </button>
        </div>
      </form>
    </div>
  );
}
