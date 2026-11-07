import { useState } from "react";
import type { Reservation } from "../types/Reservation";

interface ReservationCardProps {
  reservation: Reservation;
  onSaveEdit: (id: string, tableNumber: number, guests: number) => void;
  onDeleteReservation: (id: string) => void;
}

export function ReservationCard({
  reservation,
  onSaveEdit,
  onDeleteReservation,
}: ReservationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tableNumberEdited, setTableNumberEdited] = useState("");
  const [guestsEdited, setGuestsEdited] = useState("");

  function handleStartEdit() {
    setIsEditing(true);
    setTableNumberEdited(reservation.tableNumber.toString());
    setGuestsEdited(reservation.guests.toString());
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setTableNumberEdited("");
    setGuestsEdited("");
  }

  function handleSaveEdit() {
    if (tableNumberEdited.trim() === "" || guestsEdited.trim() === "") return;
    const tableNumberEditedNumber = Number(tableNumberEdited);
    const guestsEditedNumber = Number(guestsEdited);
    onSaveEdit(reservation.id, tableNumberEditedNumber, guestsEditedNumber);
    setIsEditing(false);
    setTableNumberEdited("");
    setGuestsEdited("");
  }

  return (
    <div>
      <p>Cliente: {reservation.customerName}</p>
      <p>Horário: {reservation.time}</p>
      {isEditing ? (
        <div>
          <input
            value={tableNumberEdited}
            onChange={(e) => setTableNumberEdited(e.target.value)}
            placeholder="Número da mesa"
          />
          <input
            value={guestsEdited}
            onChange={(e) => setGuestsEdited(e.target.value)}
            placeholder="Quantidade de convidados"
          />
          <button onClick={handleSaveEdit}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p>Mesa: {reservation.tableNumber}</p>
          <p>Convidados: {reservation.guests}</p>
          <button onClick={handleStartEdit}>Editar</button>
          <button onClick={() => onDeleteReservation(reservation.id)}>
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
