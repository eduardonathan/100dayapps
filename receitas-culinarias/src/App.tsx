import { useEffect, useState } from "react";
import "./App.css";
import { RecipeForm } from "./components/RecipeForm";
import type { Recipe } from "./types/Recipe";
import { createRecipe } from "./api/createRecipeApi";
import { updateRecipe } from "./api/updateRecipeApi";
import { RecipeCard } from "./components/RecipeCard";
import { deleteRecipe } from "./api/deleteRecipeApi";
import { fetchRecipes } from "./api/fetchRecipesApi";
import {
  AlertTriangleIcon,
  BookIcon,
  LoaderIcon,
  SoupIcon,
} from "./components/Icon";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleCreateRecipe(
    name: string,
    mainIngredient: string,
    preparationTime: number,
    difficulty: string,
  ) {
    try {
      const newRecipe = await createRecipe(
        name,
        mainIngredient,
        preparationTime,
        difficulty,
      );
      setRecipes((actualRecipes) => [...actualRecipes, newRecipe]);
    } catch (error) {
      console.log("Error to create recipe", error);
    }
  }

  async function handleSaveEdit(
    id: string,
    preparationTime: number,
    difficulty: string,
  ) {
    try {
      const editedRecipe = await updateRecipe(id, preparationTime, difficulty);
      setRecipes((actualRecipes) =>
        actualRecipes.map((r) => (r.id === id ? editedRecipe : r)),
      );
    } catch (error) {
      console.log("Error to update recipe");
    }
  }

  async function handleDeleteRecipe(id: string) {
    try {
      await deleteRecipe(id);
      setRecipes((actualRecipes) => actualRecipes.filter((r) => r.id !== id));
    } catch (error) {
      console.log("Error to delete recipe", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadRecipes() {
      try {
        setError(null);
        const data = await fetchRecipes();
        if (!canceled) {
          setRecipes(data);
        }
      } catch (error) {
        console.log("Error to fetch recipes", error);
        if (!canceled) {
          setError("Erro ao buscar receitas");
        }
      } finally {
        if (!canceled) {
          setIsLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <span className="eyebrow">
          <BookIcon size={14} />
          Caderno de receitas
        </span>
        <h1>
          Suas receitas, <em>organizadas</em> com carinho
        </h1>
        <p className="subtitle">
          Guarde o essencial de cada prato — ingrediente principal, tempo de
          preparo e nível de dificuldade.
        </p>
      </header>

      <RecipeForm onCreate={handleCreateRecipe} />

      <section className="recipes-section">
        <div className="section-head">
          <h2>Receitas salvas</h2>
          {!isLoading && !error && (
            <span className="count">
              {recipes.length}{" "}
              {recipes.length === 1 ? "receita" : "receitas"}
            </span>
          )}
        </div>

        {error && (
          <div className="state state-error">
            <span className="state-icon">
              <AlertTriangleIcon size={32} />
            </span>
            Erro ao buscar receitas. Tente novamente em instantes.
          </div>
        )}

        {isLoading && (
          <div className="state">
            <span className="state-icon">
              <LoaderIcon size={32} className="icon-spin" />
            </span>
            Buscando receitas…
          </div>
        )}

        {!error && !isLoading && recipes.length === 0 && (
          <div className="state">
            <span className="state-icon">
              <SoupIcon size={32} />
            </span>
            Nenhuma receita por aqui ainda. Cadastre a primeira acima!
          </div>
        )}

        {recipes.length > 0 && (
          <div className="recipes-grid">
            {recipes.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                onSaveEdit={handleSaveEdit}
                onDeleteRecipe={handleDeleteRecipe}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="app-footer">
        Feito na cozinha · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
