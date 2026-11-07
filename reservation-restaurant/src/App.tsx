import { useEffect, useState } from "react";

import "./App.css";
import type { Reservation } from "./types/Reservation";
import { ReservationForm } from "./components/ReservationForm";
import { CreateReservationUseCase } from "./api/CreateReservationUseCase";
import { ReservationCard } from "./components/ReservationCard";
import { ListReservationsUseCase } from "./api/ListReservationsUseCase";
import { UpdateReservationUseCase } from "./api/UpdateReservationUseCase";
import { DeleteReservationUseCase } from "./api/DeleteReservationUseCase";

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleCreateReservation(
    customerName: string,
    tableNumber: number,
    time: string,
    guests: number,
  ) {
    try {
      const newReservation = await new CreateReservationUseCase().handle({
        customerName,
        tableNumber,
        time,
        guests,
      });
      setReservations((actualReservations) => [
        ...actualReservations,
        newReservation,
      ]);
    } catch (error) {
      console.log("Error to create reservations", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadReservations() {
      try {
        setError(null);
        const data = await new ListReservationsUseCase().handle();
        if (!canceled) {
          setReservations(data);
        }
      } catch (error) {
        console.log("Error to load reservations", error);
        if (!canceled) {
          setError("Erro ao buscar reservas");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadReservations();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(
    id: string,
    tableNumber: number,
    guests: number,
  ) {
    try {
      const reservationEdited = await new UpdateReservationUseCase().handle({
        id,
        tableNumber,
        guests,
      });
      setReservations((actualReservations) =>
        actualReservations.map((r) => (r.id === id ? reservationEdited : r)),
      );
    } catch (error) {
      console.log("Error to update reservation");
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteReservationUseCase().handle(id);
      setReservations((actualReservations) =>
        actualReservations.filter((r) => r.id !== id),
      );
    } catch (error) {
      console.log("Error to delete reservation");
    }
  }

  return (
    <div>
      <ReservationForm onCreate={handleCreateReservation} />
      {error && <p>Erro ao buscar reservas</p>}
      {loading && <p>Buscando reservas</p>}
      {!error && !loading && reservations.length === 0 && (
        <p>Não há reservas</p>
      )}
      {reservations.length > 0 &&
        reservations.map((r) => (
          <ReservationCard
            key={r.id}
            reservation={r}
            onSaveEdit={handleSaveEdit}
            onDeleteReservation={handleDelete}
          />
        ))}
    </div>
  );
}

export default App;
