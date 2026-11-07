import type { Reserva } from "../types/Reserva";

const API_URL = "http://localhost:3001/reservas";

export async function criaReserva(
  hospede: string,
  quarto: string,
  noites: number,
): Promise<Reserva> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hospede, quarto, noites }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar reserva");
  }

  return res.json();
}
