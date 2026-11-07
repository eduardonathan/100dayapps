import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types/Task";
import { useState } from "react";
import { deleteTask, updateTask } from "../api/tasksApi";

export interface TaskItemProps {
  tarefa: Task;
}

export function TaskItem({ tarefa }: TaskItemProps) {
  const queryClient = useQueryClient();
  const [editando, setEditando] = useState(false);
  const [tituloEditado, setTituloEditado] = useState(tarefa.title);

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setEditando(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  function handleToggleCompleted() {
    updateMutation.mutate({ id: tarefa.id, completed: !tarefa.completed });
  }

  function handleSalvar() {
    if (tituloEditado.trim() === "") return;

    updateMutation.mutate({ id: tarefa.id, completed: tarefa.completed });
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={tarefa.completed}
        onChange={handleToggleCompleted}
        disabled={updateMutation.isPending}
      />
      {editando ? (
        <>
          <input
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
          />
          <button onClick={handleSalvar} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Salvando..." : "Salvar"}
          </button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span>
            <span>{tarefa.title}</span>
            <button onClick={() => setEditando(true)}>Editar</button>
          </span>
        </>
      )}
      <button
        onClick={() => deleteMutation.mutate(tarefa.id)}
        disabled={deleteMutation.isPending}
      >
        Remover
      </button>
    </li>
  );
}
