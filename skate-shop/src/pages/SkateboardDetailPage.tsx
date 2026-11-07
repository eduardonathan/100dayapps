import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetSkateboardByIdUseCase } from "../usecases/GetSkateboardByIdUseCase";
import type { Skateboard } from "../types/Skateboard";

export function SkateboardDetailPage() {
  const [skateboard, setSkateboard] = useState<Skateboard>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchSkateboardById(skateboardId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetSkateboardByIdUseCase().handle(skateboardId);
        if (!canceled) {
          setSkateboard(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o skate.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchSkateboardById(id);

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

  if (!skateboard) {
    return <p>Skate não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{skateboard.model}</h1>
      <p>Marca: {skateboard.brand}</p>
      <p>Comprimento: {skateboard.lengthCm} cm</p>
      <p>Preço: R$ {skateboard.price.toFixed(2)}</p>
      <Link to={`/skateboards/${skateboard.id}/edit`}>Editar</Link>
    </div>
  );
}
