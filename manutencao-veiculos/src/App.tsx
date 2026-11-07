import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Maintenance } from "./types/Maintenance";
import { createMaintenance } from "./api/createMaintenanceApi";
import { fetchMaintenances } from "./api/fetchMaintenancesApi";
import { updateMaintenace } from "./api/updateMaintenanceApi";
import { deleteMaintenance } from "./api/deleteMaintenanceApi";

const STATUS_OPTIONS = ["a fazer", "em andamento", "feito"];

function statusLabel(status: string) {
  switch (status.trim().toLowerCase()) {
    case "a fazer":
      return "A fazer";
    case "em andamento":
      return "Em andamento";
    case "feito":
      return "Feito";
    default:
      return status;
  }
}

function statusClass(status: string) {
  switch (status.trim().toLowerCase()) {
    case "a fazer":
      return "pending";
    case "em andamento":
      return "progress";
    case "feito":
      return "done";
    default:
      return "";
  }
}

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-.8-.8-2.8z" />
    </svg>
  );
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM3 17l1.6-5.6A2 2 0 0 1 6.5 10h11a2 2 0 0 1 1.9 1.4L21 17M3 17v-3M21 17v-3" />
      <path d="M6 10 7.5 6h9L18 10" />
    </svg>
  );
}

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6" />
    </svg>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 12 5 5 9-9" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function App() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [vehicle, setVehicle] = useState("");
  const [typeService, setTypeService] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [typeServiceEdited, setTypeServiceEdited] = useState("");
  const [statusEdited, setStatusEdited] = useState("");
  const [priceEdited, setPriceEdited] = useState("");

  async function handleCreateMaintenance(event: FormEvent) {
    event.preventDefault();

    if (
      vehicle.trim() === "" ||
      typeService.trim() === "" ||
      price === "" ||
      status.trim() === ""
    )
      return;

    const priceNumber = Number(price);

    try {
      const newMaintenance = await createMaintenance(
        vehicle,
        typeService,
        priceNumber,
        status,
      );
      setMaintenances((actualMaintenances) => [
        ...actualMaintenances,
        newMaintenance,
      ]);
      setVehicle("");
      setTypeService("");
      setStatus("");
      setPrice("");
    } catch (error) {
      console.log("Erro ao criar manutenção", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadMaintenances() {
      try {
        setError(null);
        const data = await fetchMaintenances();
        if (!canceled) {
          setMaintenances(data);
        }
      } catch (error) {
        console.log("Erro to fetch maintenances", error);
        if (!canceled) {
          setError("Erro ao buscar manutenções");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadMaintenances();

    return () => {
      canceled = true;
    };
  }, []);

  function handleStartEdit(maintenance: Maintenance) {
    setEditingId(maintenance.id);
    setTypeServiceEdited(maintenance.typeSerivce);
    setPriceEdited(maintenance.price.toString());
    setStatusEdited(maintenance.status);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTypeServiceEdited("");
    setPriceEdited("");
    setStatusEdited("");
  }

  async function handleSaveEdit(id: string) {
    if (
      typeServiceEdited.trim() === "" ||
      priceEdited.trim() === "" ||
      statusEdited.trim() === ""
    )
      return;

    try {
      const maintenanceEdited = await updateMaintenace(
        id,
        typeServiceEdited,
        statusEdited,
        Number(priceEdited),
      );
      setMaintenances((actualMaintenances) =>
        actualMaintenances.map((m) => (id === m.id ? maintenanceEdited : m)),
      );
      setEditingId(null);
      setPriceEdited("");
      setStatusEdited("");
      setTypeServiceEdited("");
    } catch (error) {
      console.log("Error to update maintenance", error);
    }
  }

  async function handleDeleteMaintenance(id: string) {
    try {
      await deleteMaintenance(id);
      setMaintenances((actualMaintenances) =>
        actualMaintenances.filter((m) => m.id !== id),
      );
    } catch (error) {
      console.log("Error to delete maintenance", error);
    }
  }

  return (
    <div className="page">
      <div className="hazard-strip" />
      <header className="header">
        <div className="header-inner">
          <div className="brand-mark">
            <WrenchIcon />
          </div>
          <div>
            <h1 className="brand-title">
              Oficina <span>do Zé</span>
            </h1>
            <p className="brand-subtitle">Controle de manutenções de veículos</p>
          </div>
        </div>
      </header>

      <div className="container">
        <section>
          <div className="section-heading">
            <ClipboardIcon />
            <h2>Nova ordem de serviço</h2>
          </div>

          <form className="order-card" onSubmit={handleCreateMaintenance}>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="vehicle">Veículo</label>
                <input
                  id="vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ex: Gol bolinha"
                />
              </div>
              <div className="field">
                <label htmlFor="typeService">Serviço</label>
                <input
                  id="typeService"
                  value={typeService}
                  onChange={(e) => setTypeService(e.target.value)}
                  placeholder="Ex: Troca de óleo"
                />
              </div>
              <div className="field">
                <label htmlFor="price">Preço</label>
                <div className="price-input-wrap">
                  <span>R$</span>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {statusLabel(option)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              <WrenchIcon />
              Cadastrar serviço
            </button>
          </form>
        </section>

        <section>
          <div className="section-heading">
            <CarIcon />
            <h2>Ordens de serviço</h2>
            {!loading && !error && (
              <span className="count-badge">{maintenances.length} registro(s)</span>
            )}
          </div>

          {error && (
            <div className="state-panel error">
              <AlertIcon />
              <p>Erro ao buscar suas manutenções</p>
            </div>
          )}

          {loading && (
            <div className="state-panel spin">
              <WrenchIcon />
              <p>Buscando suas manutenções...</p>
            </div>
          )}

          {!error && !loading && maintenances.length === 0 && (
            <div className="state-panel">
              <ClipboardIcon />
              <p>Nenhuma manutenção registrada ainda</p>
            </div>
          )}

          {maintenances.length > 0 && (
            <div className="ticket-list">
              {maintenances.map((m) => (
                <div
                  key={m.id}
                  className="ticket"
                  data-status={m.status.trim().toLowerCase()}
                >
                  <div className="ticket-icon">
                    <CarIcon />
                  </div>

                  {editingId === m.id ? (
                    <div className="edit-form">
                      <div className="field-grid">
                        <div className="field">
                          <label>Serviço</label>
                          <input
                            value={typeServiceEdited}
                            onChange={(e) => setTypeServiceEdited(e.target.value)}
                            placeholder="Ex: Pintura, Motor..."
                          />
                        </div>
                        <div className="field">
                          <label>Preço</label>
                          <div className="price-input-wrap">
                            <span>R$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={priceEdited}
                              onChange={(e) => setPriceEdited(e.target.value)}
                              placeholder="0,00"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label>Status</label>
                          <select
                            value={statusEdited}
                            onChange={(e) => setStatusEdited(e.target.value)}
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {statusLabel(option)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="edit-actions">
                        <button
                          className="btn btn-save"
                          onClick={() => handleSaveEdit(m.id)}
                        >
                          <CheckIcon />
                          Salvar
                        </button>
                        <button className="btn btn-cancel" onClick={handleCancelEdit}>
                          <XIcon />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ticket-body">
                      <div className="ticket-main">
                        <p className="ticket-vehicle">{m.vehicle}</p>
                        <p className="ticket-service">{m.typeSerivce}</p>
                      </div>
                      <div className="ticket-side">
                        <span className={`status-badge ${statusClass(m.status)}`}>
                          <span className="dot" />
                          {statusLabel(m.status)}
                        </span>
                        <p className="ticket-price">{formatPrice(m.price)}</p>
                        <div className="ticket-actions">
                          <button
                            className="btn btn-icon"
                            onClick={() => handleStartEdit(m)}
                            title="Editar"
                          >
                            <PencilIcon />
                          </button>
                          <button
                            className="btn btn-icon danger"
                            onClick={() => handleDeleteMaintenance(m.id)}
                            title="Excluir"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
