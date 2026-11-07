import type { Reserva } from "../types/Reserva";

const API_URL = "http://localhost:3001/reservas";

export async function buscaReservas(): Promise<Reserva[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar as reservas");
  }

  return res.json();
}
