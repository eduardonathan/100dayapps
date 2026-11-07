import type { Recado } from "../types/Recado";

interface RecadoCardProps {
  recado: Recado;
  onCurtir: (id: string, novasCurtidas: number) => void;
}

export function RecadoCard({ recado, onCurtir }: RecadoCardProps) {
  function handleCurtir() {
    onCurtir(recado.id, recado.curtidas + 1);
  }

  return (
    <li>
      <p>{recado.texto}</p>
      <button onClick={handleCurtir}>❤️ {recado.curtidas}</button>
    </li>
  );
}
