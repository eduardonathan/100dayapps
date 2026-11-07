import { useState, type SubmitEvent } from "react";

interface TaskFormProps {
  onAdicionar: (titulo: string) => void;
}

export function TaskForm({ onAdicionar }: TaskFormProps) {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (titulo.trim() === "") return;

    onAdicionar(titulo);
    setTitulo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
