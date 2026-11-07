import { useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask } from "./api/tasksApi";
import { TaskItem } from "./components/TaskItem";

export function App() {
  const [titulo, setTitulo] = useState("");
  const queryClient = useQueryClient();

  const {
    data: tarefas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tarefas"],
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setTitulo("");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (titulo.trim() === "") return;
    mutation.mutate({ title: titulo });
  }

  if (isLoading) return <p>Carregando tarefas...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h1>Minhas Tarefas</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adicionando..." : "Adicionar"}
        </button>
      </form>

      {mutation.isError && (
        <p>Erro ao criar tarefa: {mutation.error.message}</p>
      )}

      <ul>
        {tarefas?.map((tarefa) => (
          <TaskItem key={tarefa.id} tarefa={tarefa} />
        ))}
      </ul>
    </div>
  );
}
