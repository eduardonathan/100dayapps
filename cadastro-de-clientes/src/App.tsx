import { useEffect, useState, type FormEvent } from "react";
import { createCliente } from "./api/createClienteApi";
import type { Cliente } from "./types/Cliente";
import { buscaClientes } from "./api/fetchClientesApi";
import { atualizaCliente } from "./api/updateClienteApi";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [emailAtualizado, setEmailAtualizado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarClientes() {
      try {
        setErro(null);
        const data = await buscaClientes();
        if (!cancelado) {
          setClientes(data);
        }
      } catch (error) {
        console.log("Erro ao carregar clientes", error);

        if (!cancelado) {
          setErro("Erro ao carregar clientes");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarClientes();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(cliente: Cliente) {
    setEditandoId(cliente.id);
    setEmailAtualizado(cliente.email);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setEmailAtualizado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (emailAtualizado.trim() === "") return;

    try {
      const clienteEditado = await atualizaCliente(id, emailAtualizado);
      setClientes((clientesAtuais) =>
        clientesAtuais.map((c) => (c.id === id ? clienteEditado : c)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar cliente", error);
    }
  }

  // const [nome, setNome] = useState("");
  // const [email, setEmail] = useState("");

  // async function handleCreateCliente(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   if (nome.trim() === "" || email.trim() === "") return;

  //   try {
  //     const novoCliente = await createCliente(nome, email);
  //     setClientes((clientesAtuais) => [...clientesAtuais, novoCliente]);
  //     setNome("");
  //     setEmail("");
  //   } catch (error) {
  //     console.error("Erro ao criar cliente:", error);
  //   }
  // }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h1>Cadastro de clientes</h1>
      {erro && <p>Erro ao carregar clientes...</p>}
      {carregando && <p>Carregando clientes...</p>}
      {!carregando && !erro && clientes.length === 0 && (
        <p>Não há clientes...</p>
      )}
      {clientes.length > 0 &&
        clientes.map((c) => (
          <div
            key={c.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <p>Nome: {c.nome}</p>
            {editandoId === c.id ? (
              <>
                <p>Email:</p>
                <input
                  value={emailAtualizado}
                  onChange={(e) => setEmailAtualizado(e.target.value)}
                />
                <button onClick={() => handleSalvarEdicao(c.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <p>Email: {c.email}</p>
                <button onClick={() => handleIniciarEdicao(c)}>Editar</button>
              </>
            )}
          </div>
        ))}
    </div>
    // <>
    /* <form onSubmit={handleCreateCliente}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e-mail do cliente"
        />
        <button type="submit">Criar</button>
      </form>
      {clientes.length > 0 && clientes.map((c) => <p key={c.id}>{c.nome}</p>)} */
    // </>
  );
}

export default App;
