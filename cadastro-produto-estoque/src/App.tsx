import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Produto } from "./types/Produto";
import { createProduct } from "./api/createProductApi";
import { fetchProducts } from "./api/fetchProductsApi";
import { updateProduct } from "./api/updateProductApi";
import { deleteProduct } from "./api/deleteProductApi";

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarPedidos() {
      try {
        setErro(null);
        const data = await fetchProducts();
        if (!cancelado) {
          setProdutos(data);
        }
      } catch (error) {
        console.log("Erro ao buscar produtos", error);
        if (!cancelado) {
          setErro("Erro ao buscar produtos.");
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

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const precoNumero = Number(preco);
    const quantidadeNumero = Number(quantidade);

    if (nome.trim() === "" || preco === "" || quantidade === "") return;

    try {
      const novoProduto = await createProduct(
        nome,
        precoNumero,
        quantidadeNumero,
      );
      setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
      setNome("");
      setPreco("");
      setQuantidade("");
    } catch (error) {
      console.log("Erro ao adicinar produto: ", error);
    }
  }

  function handleStartEditing(produto: Produto) {
    setEditandoId(produto.id);
    setNomeEditado(produto.nome);
  }

  function handleCancelEditing() {
    setEditandoId(null);
    setNomeEditado("");
  }

  async function handleSaveEdit(id: string) {
    if (nomeEditado.trim() === "") return;

    try {
      const produtoAtualizado = await updateProduct(id, nomeEditado);
      setProdutos((produtosAtuais) =>
        produtosAtuais.map((p) => (p.id === id ? produtoAtualizado : p)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar pedido", error);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProduct(id);
      setProdutos((produtosAtuais) =>
        produtosAtuais.filter((p) => p.id !== id),
      );
    } catch (error) {
      console.log("Erro ao deletar produto", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateProduct}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
        />
        <input
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço do produto"
        />
        <input
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade do produto"
        />
        <button type="submit">Adicionar Produto</button>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          marginTop: "16px",
        }}
      >
        {erro && <p>Erro ao buscar produtos</p>}
        {carregando && <p>Carregando os produtos</p>}
        {!carregando && !erro && produtos.length === 0 && (
          <p>Não há produtos cadastrados.</p>
        )}
        {produtos.length > 0 &&
          produtos.map((p) => (
            <div
              style={{ display: "flex", gap: "8px", flexDirection: "row" }}
              key={p.id}
            >
              {editandoId === p.id ? (
                <>
                  <input
                    value={nomeEditado}
                    onChange={(e) => setNomeEditado(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(p.id)}>Salvar</button>
                  <button onClick={handleCancelEditing}>Cancelar</button>
                </>
              ) : (
                <>
                  <p>Nome: {p.nome}</p>
                  <button onClick={() => handleStartEditing(p)}>Editar</button>
                </>
              )}
              <p>Preço: {p.preco}</p>
              <p>Quantidade: {p.quantidade}</p>
              <button onClick={() => handleDeleteProduct(p.id)}>Deletar</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
