import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Member } from "../types/Member";
import { GetMemberhipByIdUseCase } from "../api/GetMermbeshipByIdUseCase";

export function MembershipDetailPage() {
  const { id } = useParams();
  const [member, setMember] = useState<Member>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    async function fetchMembers() {
      try {
        const data = await new GetMemberhipByIdUseCase().handle(id);
        if (!canceled) setMember(data);
      } catch {
        if (!canceled) setError("Erro ao carregar detalhes do membros");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    fetchMembers();

    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!error && !loading && !member) return <p>Não encontramos o membro.</p>;

  return (
    <div>
      <h1>Detalhe do Membro da Academia</h1>
      <p>Nome: {member.name}</p>
      <p>Plano: {member.plan}</p>
      <p>Status: {member.status}</p>
    </div>
  );
}
