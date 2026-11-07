import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Pedido } from "./types/Pedido";
import { criaPedido } from "./api/createPedidoApi";
import { buscaPedidos } from "./api/fetchPedidosApi";
import { atualizaPedido } from "./api/updatePedidoApi";
import { deletaPedido } from "./api/deletePedidoApi";

function App() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [produtoEditado, setProdutoEditado] = useState("");

  // const [cliente, setCliente] = useState("");
  // const [produto, setProduto] = useState("");
  // const [valor, setValor] = useState("");

  // async function handleCriarPedido(event: FormEvent) {
  //   event.preventDefault();

  //   if (cliente.trim() === "" || produto === "" || valor === "") return;

  //   try {
  //     const valorNumber = Number(valor);
  //     const novoPedido = await criaPedido(cliente, produto, valorNumber);
  //     setPedidos((pedidosAtuais) => [...pedidosAtuais, novoPedido]);
  //     setCliente("");
  //     setProduto("");
  //     setValor("");
  //   } catch (error) {
  //     console.log("Erro ao criar pedido", error);
  //   }
  // }

  useEffect(() => {
    let cancelado = false;
    async function buscarPedidos() {
      try {
        setErro(null);
        const data = await buscaPedidos();
        if (!cancelado) {
          setPedidos(data);
        }
      } catch (error) {
        console.log("Erro ao buscar pedidos.", error);
        if (!cancelado) {
          setErro("Erro ao buscar pedidos.");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarPedidos();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(pedido: Pedido) {
    setEditandoId(pedido.id);
    setProdutoEditado(pedido.produto);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setProdutoEditado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (produtoEditado.trim() === "") return;

    try {
      const novoPedido = await atualizaPedido(id, produtoEditado);
      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((p) => (p.id === id ? novoPedido : p)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar pedido", error);
    }
  }

  async function handleDeletarPedido(id: string) {
    try {
      await deletaPedido(id);
      setPedidos((pedidosAtuais) => pedidosAtuais.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Erro ao excluir pedido", error);
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {erro && <p>Erro ao carregar pedidos...</p>}
      {carregando && <p>Carregando pedidos...</p>}
      {!carregando && !erro && pedidos.length === 0 && <p>Não há pedidos...</p>}
      {pedidos.length > 0 &&
        pedidos.map((p) => (
          <div key={p.id} style={{ display: "flex", gap: "16px" }}>
            <p>Cliente: {p.cliente}</p>
            {editandoId === p.id ? (
              <>
                <input
                  value={produtoEditado}
                  onChange={(e) => setProdutoEditado(e.target.value)}
                />
                <button onClick={() => handleSalvarEdicao(p.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <p>Pedido: {p.produto}</p>
                <button onClick={() => handleIniciarEdicao(p)}>Editar</button>
              </>
            )}
            <p>Valor: {p.valor}</p>
            <button onClick={() => handleDeletarPedido(p.id)}>Excluir</button>
          </div>
        ))}
      {/* <form onSubmit={handleCriarPedido}>
        <input
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Digite o nome do cliente"
        />
        <input
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          placeholder="Digite o nome do produto"
        />
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Digite o valor do produto"
        />
        <button type="submit">Criar pedido</button>
      </form>
      {pedidos.length > 0 &&
        pedidos.map((p) => (
          <div key={p.id} style={{ display: "flex", gap: "16px" }}>
            <p>Cliente: {p.cliente}</p>
            <p>Produto: {p.produto}</p>
            <p>Valor: {p.valor}</p>
          </div>
        ))} */}
    </div>
  );
}

export default App;
