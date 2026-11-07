import { useEffect, useState } from "react";
import type { Appointment } from "../types/Appointment";
import { ListAppointmentsUseCase } from "../api/ListAppointmentsUseCase";
import { AppointmentCard } from "../components/AppointmentCard";
import { UpdateAppointmentUseCase } from "../api/UpdateAppointmentUseCase";
import { DeleteAppointmentUseCase } from "../api/DeleteAppointmentUseCase";
import { Link } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { CalendarIcon, PlusIcon, ScissorsIcon } from "../components/icons";
import { useToast } from "../contexts/ToastContext";
import "./HomePage.css";

export function HomePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    let canceled = false;

    async function loadAppointments() {
      try {
        setError(null);
        const data = await new ListAppointmentsUseCase().handle();
        if (!canceled) {
          setAppointments(data);
        }
      } catch (error) {
        console.log("Error to load appointments", error);
        if (!canceled) {
          setError("Erro ao buscar agendamentos");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadAppointments();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(
    id: string,
    professional: string,
    date: string,
    time: string,
    status: string,
  ) {
    try {
      const appointmentEdited = await new UpdateAppointmentUseCase().handle({
        id,
        professional,
        date,
        time,
        status,
      });
      setAppointments((actualAppointments) =>
        actualAppointments.map((a) => (a.id === id ? appointmentEdited : a)),
      );
      showToast("Agendamento atualizado com sucesso!", "success");
    } catch (error) {
      console.log("Error to update appointment", error);
      showToast("Não foi possível salvar as alterações. Tente novamente.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteAppointmentUseCase().handle(id);
      setAppointments((actualAppointments) =>
        actualAppointments.filter((a) => a.id !== id),
      );
      showToast("Agendamento excluído com sucesso!", "success");
    } catch (error) {
      console.log("Error to delete this appointment", error);
      showToast("Não foi possível excluir o agendamento. Tente novamente.");
    }
  }

  return (
    <AppLayout>
      <div className="container">
        <div className="home-header">
          <div>
            <span className="home-eyebrow">
              <CalendarIcon width={14} height={14} />
              Agenda
            </span>
            <h1>Agendamentos</h1>
          </div>
          <Link to="/appointments/new" className="btn btn-primary">
            <PlusIcon width={16} height={16} />
            Agendar novo horário
          </Link>
        </div>

        {error && <p className="home-message home-message-error">{error}</p>}

        {loading && <p className="home-message">Buscando agendamentos...</p>}

        {!error && !loading && appointments.length === 0 && (
          <div className="home-empty card">
            <ScissorsIcon width={26} height={26} />
            <h3>Nenhum agendamento por aqui</h3>
            <p>Que tal marcar o próximo horário com um de nossos profissionais?</p>
            <Link to="/appointments/new" className="btn btn-primary btn-sm">
              <PlusIcon width={15} height={15} />
              Agendar horário
            </Link>
          </div>
        )}

        {appointments.length > 0 && (
          <div className="home-grid">
            {appointments.map((a) => (
              <AppointmentCard
                key={a.id}
                appointment={a}
                onSaveEdit={handleSaveEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
