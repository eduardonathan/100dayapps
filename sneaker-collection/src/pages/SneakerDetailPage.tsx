import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetSneakerByIdUseCase } from "../usecases/GetSneakerByIdUseCase";
import type { Sneaker } from "../types/Sneaker";

export function SneakerDetailPage() {
  const [sneaker, setSneaker] = useState<Sneaker>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchSneakerById(sneakerId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetSneakerByIdUseCase().handle(sneakerId);
        if (!canceled) {
          setSneaker(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o tênis.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchSneakerById(id);

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

  if (!sneaker) {
    return <p>Tênis não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{sneaker.model}</h1>
      <p>Marca: {sneaker.brand}</p>
      <p>Tamanho: {sneaker.size}</p>
      <p>Ano de lançamento: {sneaker.releaseYear}</p>
      <p>Preço: R$ {sneaker.price.toFixed(2)}</p>
    </div>
  );
}
