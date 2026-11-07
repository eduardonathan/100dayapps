import type { ItemCarrinho } from "../types/ItemCarrinho";

interface ItemCardProps {
  item: ItemCarrinho;
  onAumentar: (id: string, novaQuantidade: number) => void;
  onDiminuir: (id: string, novaQuantidade: number) => void;
  onRemover: (id: string) => void;
}

export function ItemCard({
  item,
  onAumentar,
  onDiminuir,
  onRemover,
}: ItemCardProps) {
  function handleAumentarQtd() {
    const novaQuantidade = item.quantidade + 1;
    onAumentar(item.id, novaQuantidade);
  }

  function handleDiminuirQtd() {
    const novaQuantidade = item.quantidade - 1;
    onDiminuir(item.id, novaQuantidade);
  }

  function handleRemoverItem() {
    onRemover(item.id);
  }

  return (
    <div>
      <h3>{item.nome}</h3>
      <p>Quantidade: {item.quantidade}</p>
      <p>Preço: {item.preco}</p>
      <button onClick={handleAumentarQtd}>Aumentar quantidade</button>
      <button onClick={handleDiminuirQtd} disabled={item.quantidade <= 1}>
        Diminuir quantidade
      </button>
      <button onClick={handleRemoverItem}>Remover produto</button>
    </div>
  );
}
