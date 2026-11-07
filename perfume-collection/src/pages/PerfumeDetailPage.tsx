import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPerfumeByIdUseCase } from "../usecases/GetPerfumeByIdUseCase";
import type { Perfume } from "../types/Perfume";

export function PerfumeDetailPage() {
  const [perfume, setPerfume] = useState<Perfume>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchPerfumeById(perfumeId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetPerfumeByIdUseCase().handle(perfumeId);
        if (!canceled) {
          setPerfume(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o perfume.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchPerfumeById(id);

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

  if (!perfume) {
    return <p>Perfume não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{perfume.name}</h1>
      <p>Marca: {perfume.brand}</p>
      <p>Volume: {perfume.volumeMl} ml</p>
      <p>Ano de lançamento: {perfume.launchYear}</p>
      <p>Preço: R$ {perfume.price.toFixed(2)}</p>
    </div>
  );
}
