import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Wine } from "../types/Wine";
import { GetWineByIdUseCase } from "../api/GetWineByIdUseCase";

export function WineDetailPage() {
  const [wine, setWine] = useState<Wine>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchWineById() {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetWineByIdUseCase().handle(id);
        if (!canceled) {
          setWine(data);
        }
      } catch (err) {
        if (!canceled) {
          setError("Não foi possível carregar os vinhos.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchWineById();

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

  if (!wine) {
    return <p>Vinho não encontrado</p>;
  }

  return (
    <div>
      <h1>{wine.name}</h1>
      <p>Vinícola: {wine.winery}</p>
      <p>Safra: {wine.vintage}</p>
      <p>Preço: R$ {wine.price}</p>
    </div>
  );
}
