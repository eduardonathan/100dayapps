import { useState } from "react";
import type { Task } from "../types/Task";

interface TaskItemProps {
  tarefa: Task;
  onToggle: (id: string) => void;
  onRemover: (id: string) => void;
  onEditar: (id: string, novoTitulo: string) => void;
}

export function TaskItem({
  tarefa,
  onToggle,
  onRemover,
  onEditar,
}: TaskItemProps) {
  const [editando, setEditando] = useState(false);
  const [tituloEditado, setTituloEditado] = useState(tarefa.title);

  function handleEditar() {
    setTituloEditado(tarefa.title);
    setEditando(true);
  }

  function handleSalvar() {
    if (tituloEditado.trim() === "") return;

    onEditar(tarefa.id, tituloEditado);
    setEditando(false);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={tarefa.completed}
        onChange={() => onToggle(tarefa.id)}
      />
      {editando ? (
        <input
          value={tituloEditado}
          onChange={(e) => setTituloEditado(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: tarefa.completed ? "line-through" : "none" }}
        >
          {tarefa.title}
        </span>
      )}
      <button onClick={() => onRemover(tarefa.id)}>Remover</button>
      {editando ? (
        <button onClick={handleSalvar}>Salvar</button>
      ) : (
        <button onClick={handleEditar}>Editar</button>
      )}
    </li>
  );
}
