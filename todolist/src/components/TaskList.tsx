import type { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tarefas: Task[];
  onToggle: (id: string) => void;
  onRemover: (id: string) => void;
  onEditar: (id: string, novoTitulo: string) => void;
}

export function TaskList({
  tarefas,
  onToggle,
  onRemover,
  onEditar,
}: TaskListProps) {
  if (tarefas.length === 0) {
    return <p>Nenhuma tarefa ainda. Adicione a primeira!</p>;
  }

  return (
    <ul>
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={onToggle}
          onRemover={onRemover}
          onEditar={onEditar}
        />
      ))}
    </ul>
  );
}
