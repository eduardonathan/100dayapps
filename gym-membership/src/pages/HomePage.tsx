import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListMembersUseCase } from "../api/ListMembersUseCase";
import type { Member } from "../types/Member";

export function HomePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchMembers() {
      try {
        const data = await new ListMembersUseCase().handle();
        if (!canceled) setMembers(data);
      } catch {
        if (!canceled) setError("Erro ao carregar os membros");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    fetchMembers();

    return () => {
      canceled = true;
    };
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Membros da Academia</h1>
      <Link to="/members/new">Novo membro</Link>

      {members.length === 0 ? (
        <p>Nenhum membro encontrado.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <Link to={`/members/${member.id}`}>
                {member.name} — {member.plan} — {member.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
