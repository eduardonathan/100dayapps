import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWineUseCase } from "../api/CreateWineUseCase";

export function NewWinePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [winery, setWinery] = useState("");
  const [vintage, setVintage] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await new CreateWineUseCase().handle({
        name,
        winery,
        vintage: Number(vintage),
        price: Number(price),
      });
      navigate("/");
    } catch (err) {
      setError("Não foi possível criar o vinho.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Novo Vinho</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="winery">Vinícola</label>
          <input
            id="winery"
            value={winery}
            onChange={(e) => setWinery(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="vintage">Safra</label>
          <input
            id="vintage"
            type="number"
            value={vintage}
            onChange={(e) => setVintage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
