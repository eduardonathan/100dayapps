import type { Task } from "../types/Task";

const API_URL = "http://localhost:3001/tarefas";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }

  return res.json();
}

interface NovaTarefaInput {
  title: string;
}

export async function createTask(input: NovaTarefaInput): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
      completed: false,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao criar tarefa");
  }
}

interface UpdateTaskInput {
  id: string;
  title?: string;
  completed?: boolean;
}

export async function updateTask({
  id,
  ...campos
}: UpdateTaskInput): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campos),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }

  return res.json();
}
