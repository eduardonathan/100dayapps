import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetVinylByIdUseCase } from "../api/GetVinylByIdUseCase";
import type { Vinyl } from "../types/Vinyl";

export function VinylDetailPage() {
  const [vinyl, setVinyl] = useState<Vinyl>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchVinylById(vinylId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetVinylByIdUseCase().handle(vinylId);
        if (!canceled) {
          setVinyl(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o vinil.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchVinylById(id);

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

  if (!vinyl) {
    return <p>Vinil não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{vinyl.title}</h1>
      <p>Artista: {vinyl.artist}</p>
      <p>Ano: {vinyl.year}</p>
      <p>Gênero: {vinyl.genre}</p>
      <p>Preço: R$ {vinyl.price.toFixed(2)}</p>
    </div>
  );
}
