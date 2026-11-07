import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Entrega } from "./types/Entrega";
import { criaEntrega } from "./api/createEntregaApi";
import { buscaEntregas } from "./api/fetchEntregasApi";
import { atualizaEntrega } from "./api/updateEntregaApi";

function App() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [destinatario, setDestinatario] = useState("");
  const [endereco, setEndereco] = useState("");
  const [status, setStatus] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [statusEditado, setStatusEditado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarEntregas() {
      try {
        setErro(null);
        const data = await buscaEntregas();
        if (!cancelado) {
          setEntregas(data);
        }
      } catch (error) {
        console.log("Erro ao buscar entregas", error);
        if (!cancelado) {
          setErro("Erro ao buscar entregas");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarEntregas();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(entrega: Entrega) {
    setEditandoId(entrega.id);
    setStatusEditado(entrega.status);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setStatusEditado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (statusEditado.trim() === "") return;

    try {
      const entregaAtualizada = await atualizaEntrega(id, statusEditado);
      setEntregas((entregasAtuais) =>
        entregasAtuais.map((e) => (e.id === id ? entregaAtualizada : e)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar categoria", error);
    }
  }

  async function handleCriarEntrega(event: FormEvent) {
    event.preventDefault();

    if (
      destinatario.trim() === "" ||
      endereco.trim() === "" ||
      status.trim() === ""
    )
      return;
    try {
      const novaEntrega = await criaEntrega(destinatario, endereco, status);
      setEntregas((entregasAtuais) => [...entregasAtuais, novaEntrega]);
      setDestinatario("");
      setEndereco("");
      setStatus("");
    } catch (error) {
      console.log("Erro ao criar entrega", error);
    }
  }

  return (
    <div>
      <h1>Lista de entregas</h1>
      <form onSubmit={handleCriarEntrega}>
        <input
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
          placeholder="Digite o nome do destinatario"
        />
        <input
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Digite o endereço da entrega"
        />
        <input
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Digite o status da entrega"
        />
        <button type="submit">Criar entrega</button>
      </form>
      {erro && <p>Erro ao carregar entregas</p>}
      {carregando && <p>Carregando as entregas</p>}
      {!erro && !carregando && entregas.length === 0 && <p>Não há entregas</p>}
      {entregas.length > 0 &&
        entregas.map((e) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              margin: "32px",
            }}
          >
            <p>Destinatario: {e.destinatario}</p>
            <p>Endereço: {e.endereco}</p>
            <p>Status: {e.status}</p>
          </div>
        ))}
      {entregas.length > 0 &&
        entregas.map((e) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              margin: "32px",
            }}
          >
            <p>Destinatario: {e.destinatario}</p>
            <p>Endereço: {e.endereco}</p>

            {editandoId === e.id ? (
              <>
                <input
                  value={statusEditado}
                  onChange={(ev) => setStatusEditado(ev.target.value)}
                />
                <button onClick={() => handleSalvarEdicao(e.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <p>Status: {e.status}</p>
                <button onClick={() => handleIniciarEdicao(e)}>Editar</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
