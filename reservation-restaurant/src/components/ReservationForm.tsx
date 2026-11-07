import { useState, type FormEvent } from "react";

interface ReservationFormProps {
  onCreate: (
    customerName: string,
    tableNumber: number,
    time: string,
    guests: number,
  ) => void;
}

export function ReservationForm({ onCreate }: ReservationFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");

  function handleCreateReservation(event: FormEvent) {
    event.preventDefault();
    if (
      customerName.trim() === "" ||
      tableNumber.trim() === "" ||
      time.trim() === "" ||
      guests.trim() === ""
    )
      return;

    const tableNumberN = Number(tableNumber);
    const guestsNumber = Number(guests);

    onCreate(customerName, tableNumberN, time, guestsNumber);

    setCustomerName("");
    setTableNumber("");
    setTime("");
    setGuests("");
  }

  return (
    <div>
      <form onSubmit={handleCreateReservation}>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Eduardo Wayne"
        />
        <input
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="17"
        />
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="19:30"
        />
        <input
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Quantidade de convidados"
        />
        <button type="submit">Reservar mesa</button>
      </form>
    </div>
  );
}
