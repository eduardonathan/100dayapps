import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Member } from "../types/Member";
import { ListMemberUseCase } from "../api/ListMembersUseCase";
import { MemberCard } from "../components/MemberCard";
import { UpdateMemberUseCase } from "../api/UpdateMemberUseCase";
import { DeleteMemberUseCase } from "../api/DeleteMemberUseCase";
import { Fin } from "../components/Fin";

interface Toast {
  id: number;
  message: string;
  tone: "ok" | "error";
}

export function HomePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((message: string, tone: Toast["tone"]) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  useEffect(() => {
    let canceled = false;

    async function loadMembers() {
      try {
        setError(null);
        const data = await new ListMemberUseCase().handle();
        if (!canceled) {
          setMembers(data);
        }
      } catch (error) {
        console.log("Error to load members", error);
        if (!canceled) {
          setError("Não foi possível carregar os alunos.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadMembers();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(id: string, plan: string, status: string) {
    try {
      const memberEdited = await new UpdateMemberUseCase().handle({
        id,
        plan,
        status,
      });
      setMembers((actualMembers) =>
        actualMembers.map((m) => (m.id === id ? memberEdited : m)),
      );
      pushToast("Matrícula atualizada.", "ok");
    } catch (error) {
      console.log("Error to update member", error);
      pushToast("Erro ao atualizar o aluno.", "error");
    }
  }

  async function handleDeleteMember(id: string) {
    try {
      await new DeleteMemberUseCase().handle(id);
      setMembers((actualMembers) => actualMembers.filter((m) => m.id !== id));
      pushToast("Aluno removido.", "ok");
    } catch (error) {
      console.log("Error to delete member", error);
      pushToast("Erro ao remover o aluno.", "error");
    }
  }

  const stats = useMemo(() => {
    const total = members.length;
    const ativos = members.filter(
      (m) => m.status.trim().toLowerCase() === "ativo",
    ).length;
    const plans = new Set(members.map((m) => m.plan.trim().toLowerCase())).size;
    return { total, ativos, plans };
  }, [members]);

  const showEmpty = !error && !loading && members.length === 0;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <Fin className="brand__fin" />
          <div>
            <span className="brand__name">
              GYM <b>SHARKS</b>
            </span>
            <span className="brand__tag">Painel de alunos</span>
          </div>
        </div>
        <div className="topbar__meta">
          Unidade Centro
          <b>Recepção · Matrículas</b>
        </div>
      </header>

      <section className="hero">
        <div>
          <h1 className="hero__title">
            Gerencie os alunos
            <span>sem perder o controle da grade</span>
          </h1>
          <p className="hero__lead">
            Acompanhe planos e status de matrícula em um lugar só. Edições
            feitas aqui refletem na hora para o time de recepção.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat__num">{String(stats.total).padStart(2, "0")}</div>
            <div className="stat__label">Alunos cadastrados</div>
          </div>
          <div className="stat stat--accent">
            <div className="stat__num">{stats.ativos}</div>
            <div className="stat__label">Matrículas ativas</div>
          </div>
          <div className="stat">
            <div className="stat__num">{stats.plans}</div>
            <div className="stat__label">Planos em uso</div>
          </div>
        </div>
      </section>

      <main>
        <div className="action-bar">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <h2>Lista de alunos</h2>
            {!loading && !error && (
              <span className="action-bar__count">
                {members.length}{" "}
                {members.length === 1 ? "aluno" : "alunos"}
              </span>
            )}
          </div>
          <Link to="/members/new" className="btn btn--primary">
            Novo aluno
          </Link>
        </div>

        {loading && (
          <div className="card-list">
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        )}

        {error && (
          <div className="state state--error">
            <svg
              className="state__mark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 3 2 21h20L12 3Z" strokeLinejoin="round" />
              <path d="M12 10v5M12 18h.01" strokeLinecap="round" />
            </svg>
            <h3>Sem conexão com o servidor</h3>
            <p>{error}</p>
          </div>
        )}

        {showEmpty && (
          <div className="state">
            <Fin className="state__mark" />
            <h3>Águas paradas</h3>
            <p>
              Nenhum aluno cadastrado ainda. Use o botão acima para cadastrar
              o primeiro.
            </p>
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="card-list">
            {members.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                onSaveEdit={handleSaveEdit}
                onDelete={handleDeleteMember}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="foot">
        <span>GYM SHARKS · Painel interno</span>
        <span>
          {stats.total} alunos · {stats.ativos} ativos
        </span>
      </footer>

      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${t.tone === "ok" ? "toast--ok" : ""}`}
          >
            <span className="toast__dot" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
