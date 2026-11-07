import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetClubByIdUseCase } from "../usecases/GetClubByIdUseCase";
import type { Club } from "../types/Club";

export function ClubDetailPage() {
  const [club, setClub] = useState<Club>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchClubById(clubId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetClubByIdUseCase().handle(clubId);
        if (!canceled) {
          setClub(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o clube.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchClubById(id);

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

  if (!club) {
    return <p>Clube não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{club.name}</h1>
      <p>
        Cidade: {club.city}/{club.state}
      </p>
      <p>Fundação: {club.foundedYear}</p>
      <p>Títulos: {club.titles}</p>
    </div>
  );
}
