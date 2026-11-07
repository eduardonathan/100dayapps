import { useState } from "react";
import type { ItemCarrinho } from "./types/ItemCarrinho";
import { ItemCard } from "./components/ItemCard";
import { ProdutoForm } from "./components/ProdutoForm";

const itensIniciais: ItemCarrinho[] = [
  { id: "1", nome: "Camiseta", preco: 49.9, quantidade: 1 },
  { id: "2", nome: "Tênis", preco: 199.9, quantidade: 1 },
];

function App() {
  const [itens, setItens] = useState<ItemCarrinho[]>(itensIniciais);

  function handleAlterarQuantidade(id: string, novaQuantidade: number) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item,
      ),
    );
  }

  function handleRemoverProduto(id: string) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  const total = itens.reduce((acumulador, item) => {
    return acumulador + item.preco * item.quantidade;
  }, 0);

  const totalDeItens = itens.reduce((acumulador, item) => {
    return acumulador + item.quantidade;
  }, 0);

  function handleAdicionarProduto(
    nome: string,
    preco: number,
    quantidade: number,
  ) {
    const novoProduto: ItemCarrinho = {
      id: crypto.randomUUID(),
      nome: nome,
      preco: preco,
      quantidade: quantidade,
    };

    setItens((itensIniciais) => [...itensIniciais, novoProduto]);
  }

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {itens.length === 0 && <p>NÃO HÁ ITENS NO CARRINHO</p>}
      <ProdutoForm onAdicionar={handleAdicionarProduto} />
      <ul>
        {itens.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAumentar={handleAlterarQuantidade}
            onDiminuir={handleAlterarQuantidade}
            onRemover={handleRemoverProduto}
          />
        ))}
      </ul>
      <h2>Total: R$ {total.toFixed(2)}</h2>
      <h2>Total de itens: {totalDeItens}</h2>
    </div>
  );
}

export default App;
