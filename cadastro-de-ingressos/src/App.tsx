import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Ingresso } from "./types/Ingresso";
import { createTicket } from "./api/createTicketApi";
import { fetchTickets } from "./api/fetchTicketsApi";
import { updateTicket } from "./api/updateTicketApi";
import { deleteTicket } from "./api/deleteTicketApi";

function App() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [preco, setPreco] = useState("");
  const [dia, setDia] = useState("");
  const [assento, setAssento] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [precoEditado, setPrecoEditado] = useState("");

  async function handleCreateTicket(event: FormEvent) {
    event.preventDefault();

    if (preco.trim() === "" || dia.trim() === "" || assento.trim() === "")
      return;

    try {
      const newTicket = await createTicket(preco, dia, assento);
      setIngressos((actualTickets) => [...actualTickets, newTicket]);
      setPreco("");
      setDia("");
      setAssento("");
    } catch (error) {
      console.log("Erro ao criar ingresso.", error);
    }
  }

  useEffect(() => {
    let cancelado = false;

    async function handleFetchTickets() {
      try {
        setErro(null);
        const data = await fetchTickets();
        if (!cancelado) {
          setIngressos(data);
        }
      } catch (error) {
        console.log("Erro ao buscar ingressos", error);
        if (!cancelado) {
          setErro("Erro ao buscar ingressos");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    handleFetchTickets();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleStartEdit(ingresso: Ingresso) {
    setEditandoId(ingresso.id);
    setPrecoEditado(ingresso.preco);
  }

  function handleCancelEdit() {
    setEditandoId(null);
    setPrecoEditado("");
  }

  async function handleSaveEdit(id: string) {
    if (precoEditado.trim() === "") return;

    try {
      const editedTicket = await updateTicket(id, precoEditado);
      setIngressos((actualTickets) =>
        actualTickets.map((a) => (a.id === id ? editedTicket : a)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar ingresso");
    }
  }

  async function handleDeleteTicket(id: string) {
    try {
      await deleteTicket(id);
      setIngressos((actualTickets) => actualTickets.filter((a) => a.id !== id));
    } catch (error) {
      console.log("Erro ao deletar ingresso", error);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Cadastro de ingressos</h1>
        <p className="subtitle">Gerencie os ingressos do seu evento</p>
      </header>

      <form className="ticket-form" onSubmit={handleCreateTicket}>
        <div className="field">
          <label htmlFor="preco">Preço</label>
          <input
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Ex: 150,00"
          />
        </div>
        <div className="field">
          <label htmlFor="dia">Dia do evento</label>
          <input
            id="dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            placeholder="Ex: 20/09/2026"
          />
        </div>
        <div className="field">
          <label htmlFor="assento">Assento</label>
          <input
            id="assento"
            value={assento}
            onChange={(e) => setAssento(e.target.value)}
            placeholder="Ex: A12"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Criar ingresso
        </button>
      </form>

      {erro && (
        <p className="status status-error">Erro ao carregar ingressos</p>
      )}
      {carregando && <p className="status">Carregando os ingressos…</p>}
      {!erro && !carregando && ingressos.length === 0 && (
        <p className="status status-empty">Não há ingressos</p>
      )}

      {ingressos.length > 0 && (
        <section className="ticket-section">
          <h2>Lista de ingressos</h2>
          <div className="ticket-list">
            {ingressos.map((i) => (
              <div key={i.id} className="ticket-card">
                {editandoId === i.id ? (
                  <div className="ticket-edit">
                    <input
                      className="edit-input"
                      value={precoEditado}
                      onChange={(e) => setPrecoEditado(e.target.value)}
                      autoFocus
                    />
                    <div className="ticket-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSaveEdit(i.id)}
                      >
                        Salvar
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="ticket-info">
                      <span className="ticket-price">R$ {i.preco}</span>
                      <span className="ticket-meta">{i.dia}</span>
                      <span className="ticket-meta">Assento {i.assento}</span>
                    </div>
                    <div className="ticket-actions">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleStartEdit(i)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTicket(i.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
