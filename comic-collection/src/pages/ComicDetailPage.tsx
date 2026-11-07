import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetComicByIdUseCase } from "../usecases/GetComicByIdUseCase";
import type { Comic } from "../types/Comic";

export function ComicDetailPage() {
  const [comic, setComic] = useState<Comic>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let canceled = false;

    async function fetchComicById(comicId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await new GetComicByIdUseCase().handle(comicId);
        if (!canceled) {
          setComic(data);
        }
      } catch {
        if (!canceled) {
          setError("Não foi possível carregar o quadrinho.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchComicById(id);

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

  if (!comic) {
    return <p>Quadrinho não encontrado</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{comic.title}</h1>
      <p>Autor: {comic.author}</p>
      <p>Ano: {comic.year}</p>
      <p>Editora: {comic.publisher}</p>
      <p>Preço: R$ {comic.price.toFixed(2)}</p>
    </div>
  );
}
