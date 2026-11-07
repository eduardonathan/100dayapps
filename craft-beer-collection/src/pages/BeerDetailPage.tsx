import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBeerByIdUseCase } from "../usecases/GetBeerByIdUseCase";
import type { Beer } from "../types/Beer";

export function BeerDetailPage() {
  const [beer, setBeer] = useState<Beer>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchBeerById(beerId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetBeerByIdUseCase().handle(beerId);
        if (!canceled) {
          setBeer(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar a cerveja.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchBeerById(id);

    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!beer) {
    return <p>Cerveja não encontrada</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{beer.name}</h1>
      <p>Cervejaria: {beer.brewery}</p>
      <p>Estilo: {beer.style}</p>
      <p>Teor alcoólico: {beer.abv}%</p>
      <p>Preço: R$ {beer.price.toFixed(2)}</p>
    </div>
  );
}
