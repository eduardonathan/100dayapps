import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { TicketForm } from "./components/TicketForm";
import type { Ticket } from "./types/Ticket";
import { CreateTicketUseCase } from "./api/CreateTicketUseCase";
import { ListTicketsUseCase } from "./api/ListTicketsUseCase";
import { TicketCard } from "./components/TicketCard";
import { UpdateTicketUseCase } from "./api/UpdateTicketUseCase";
import { DeleteTicketUseCase } from "./api/DeleteTicketUseCase";
import { STATUSES } from "./lib/ticketOptions";

type Filter = "Todos" | (typeof STATUSES)[number];
const FILTERS: Filter[] = ["Todos", ...STATUSES];

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("Todos");
  const [query, setQuery] = useState("");

  async function handleCreateTicket(
    requesterName: string,
    subject: string,
    category: string,
    priority: string,
    status: string,
  ) {
    try {
      const newTicket = await new CreateTicketUseCase().handle({
        requesterName,
        subject,
        category,
        priority,
        status,
      });
      setTickets((actualTickets) => [newTicket, ...actualTickets]);
    } catch {
      console.log("Error to create a new ticket.");
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadTickets() {
      try {
        setError(null);
        const data = await new ListTicketsUseCase().handle();
        if (!canceled) {
          setTickets(data);
        }
      } catch {
        console.log("Error to load tickets");
        if (!canceled) {
          setError("Erro ao buscar tickets");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(id: string, status: string, priority: string) {
    try {
      const ticketEdited = await new UpdateTicketUseCase().handle({
        id,
        status,
        priority,
      });
      setTickets((actualTickets) =>
        actualTickets.map((t) => (t.id === id ? ticketEdited : t)),
      );
    } catch (error) {
      console.log("Error to update ticket", error);
    }
  }

  async function handleDeleteTicket(id: string) {
    try {
      await new DeleteTicketUseCase().handle(id);
      setTickets((actualTickets) => actualTickets.filter((t) => t.id !== id));
    } catch (error) {
      console.log("Error to delete this ticket", error);
    }
  }

  const counts = useMemo(() => {
    const by = (s: string) => tickets.filter((t) => t.status === s).length;
    return {
      Todos: tickets.length,
      Aberto: by("Aberto"),
      "Em andamento": by("Em andamento"),
      Resolvido: by("Resolvido"),
    } as Record<Filter, number>;
  }, [tickets]);

  const visibleTickets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => {
      const matchesFilter = filter === "Todos" || t.status === filter;
      const matchesQuery =
        q === "" ||
        t.subject.toLowerCase().includes(q) ||
        t.requesterName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [tickets, filter, query]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="3"
                y="11"
                width="4"
                height="7"
                rx="1.5"
                fill="currentColor"
              />
              <rect
                x="17"
                y="11"
                width="4"
                height="7"
                rx="1.5"
                fill="currentColor"
              />
            </svg>
          </span>
          <div className="brand-text">
            <strong>Central de Suporte</strong>
            <span>Gestão de chamados internos de TI</span>
          </div>
        </div>

        <div className="topbar-stats">
          <div className="stat" data-tone="aberto">
            <b>{counts.Aberto}</b>
            <span>Abertos</span>
          </div>
          <div className="stat" data-tone="andamento">
            <b>{counts["Em andamento"]}</b>
            <span>Andamento</span>
          </div>
          <div className="stat" data-tone="resolvido">
            <b>{counts.Resolvido}</b>
            <span>Resolvidos</span>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="col-form">
          <TicketForm onCreate={handleCreateTicket} />
        </aside>

        <section className="col-list">
          <div className="toolbar">
            <div className="filters" role="tablist">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`filter${filter === f ? " is-active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <span className="n">{counts[f]}</span>
                </button>
              ))}
            </div>

            <div className="search">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m20 20-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar chamado"
                aria-label="Buscar chamado"
              />
            </div>
          </div>

          {loading && (
            <div className="skeleton-list">
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
            </div>
          )}

          {!loading && error && (
            <div className="state" data-tone="error">
              <strong>Não foi possível carregar os chamados</strong>
              Verifique se a API está rodando em localhost:3001.
            </div>
          )}

          {!loading && !error && visibleTickets.length === 0 && (
            <div className="state">
              <strong>Nenhum chamado por aqui</strong>
              {tickets.length === 0
                ? "Abra o primeiro chamado pelo formulário ao lado."
                : "Ajuste os filtros ou o termo de busca."}
            </div>
          )}

          {!loading && !error && visibleTickets.length > 0 && (
            <div className="ticket-list">
              {visibleTickets.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  onSaveEdit={handleSaveEdit}
                  onDelete={handleDeleteTicket}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
