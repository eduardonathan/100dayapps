import { useState, type FormEvent } from "react";

interface ProdutoFormProps {
  onAdicionar: (nome: string, preco: number, quantidade: number) => void;
}

export function ProdutoForm({ onAdicionar }: ProdutoFormProps) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const precoNumero = Number(preco);
    const quantidadeNumero = Number(quantidade);

    if (nome.trim() === "" || preco === "" || quantidade === "") return;

    onAdicionar(nome, precoNumero, quantidadeNumero);
    setNome("");
    setPreco("");
    setQuantidade("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Novo Produto"
      />
      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        placeholder="Valor"
      />
      <input
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        placeholder="Quantidade"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
