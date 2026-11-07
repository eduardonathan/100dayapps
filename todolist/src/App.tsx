import { useState } from "react";
import type { Task } from "./types/Task";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

export function App() {
  const [tarefas, setTarefas] = useState<Task[]>([]);

  function handleAdicionarTarefa(titulo: string) {
    const novaTarefa: Task = {
      id: crypto.randomUUID(),
      title: titulo,
      completed: false,
    };

    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
  }

  function handleToggleTarefa(id: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa,
      ),
    );
  }

  function handleRemoverTarefa(id: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  function handleEditarTarefa(id: string, novoTitulo: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, title: novoTitulo } : tarefa,
      ),
    );
  }

  const concludedTask = tarefas.filter((tarefa) => tarefa.completed).length;

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <h1>Tarefas concluídas {concludedTask}</h1>
      <TaskForm onAdicionar={handleAdicionarTarefa} />
      <TaskList
        tarefas={tarefas}
        onToggle={handleToggleTarefa}
        onRemover={handleRemoverTarefa}
        onEditar={handleEditarTarefa}
      />
    </div>
  );
}
