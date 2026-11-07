import { useState, type FormEvent } from "react";
import { CreateAppointmentUseCase } from "../api/CreateAppointmentUseCase";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { PROFESSIONALS, SERVICES, STATUS_OPTIONS } from "../constants/salon";
import { CalendarIcon } from "../components/icons";
import { useToast } from "../contexts/ToastContext";
import { isCompleteDate, isCompleteTime, maskDate, maskTime } from "../utils/masks";
import "./NewAppointmentPage.css";

export function NewAppointmentPage() {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [professional, setProfessional] = useState(PROFESSIONALS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);

  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleCreateAppointment(event: FormEvent) {
    event.preventDefault();

    if (clientName.trim() === "") {
      showToast("Informe o nome do cliente.");
      return;
    }
    if (!isCompleteDate(date)) {
      showToast("Informe a data completa no formato dd/mm/aaaa.");
      return;
    }
    if (!isCompleteTime(time)) {
      showToast("Informe o horário completo no formato hh:mm.");
      return;
    }

    try {
      await new CreateAppointmentUseCase().handle({
        clientName,
        service,
        professional,
        date,
        time,
        status,
      });
      setClientName("");
      setService(SERVICES[0]);
      setProfessional(PROFESSIONALS[0]);
      setDate("");
      setTime("");
      setStatus(STATUS_OPTIONS[0]);
      showToast("Agendamento criado com sucesso!", "success");
      navigate("/");
    } catch (error) {
      console.log("Error to create appointment", error);
      showToast("Não foi possível criar o agendamento. Tente novamente.");
    }
  }

  return (
    <AppLayout>
      <div className="container container-narrow">
        <span className="home-eyebrow">
          <CalendarIcon width={14} height={14} />
          Novo agendamento
        </span>
        <h1 className="new-appointment-title">Marcar horário</h1>
        <p className="new-appointment-subtitle">
          Preencha os dados do cliente para reservar o horário com o profissional escolhido.
        </p>

        <form
          className="card new-appointment-form"
          onSubmit={handleCreateAppointment}
        >
          <div className="field">
            <label htmlFor="clientName">Nome do cliente</label>
            <input
              id="clientName"
              className="input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ex: Cafu"
            />
          </div>

          <div className="new-appointment-row">
            <div className="field">
              <label htmlFor="service">Tipo de serviço</label>
              <select
                id="service"
                className="input"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="professional">Profissional</label>
              <select
                id="professional"
                className="input"
                value={professional}
                onChange={(e) => setProfessional(e.target.value)}
              >
                {PROFESSIONALS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="new-appointment-row">
            <div className="field">
              <label htmlFor="date">Data agendada</label>
              <input
                id="date"
                className="input"
                value={date}
                onChange={(e) => setDate(maskDate(e.target.value))}
                placeholder="dd/mm/aaaa"
                inputMode="numeric"
                maxLength={10}
              />
            </div>

            <div className="field">
              <label htmlFor="time">Horário marcado</label>
              <input
                id="time"
                className="input"
                value={time}
                onChange={(e) => setTime(maskTime(e.target.value))}
                placeholder="hh:mm"
                inputMode="numeric"
                maxLength={5}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="status">Status do serviço</label>
            <select
              id="status"
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary new-appointment-submit">
            Agendar
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
