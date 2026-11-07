import { useEffect, useState } from "react";

import "./App.css";
import { RentalContractForm } from "./components/RentalContractForm";
import { CreateRentalContractUseCase } from "./api/CreateRentalContractUseCase";
import type { RentalContract } from "./types/RentalContract";
import { RentalContractCard } from "./components/RentalContractCard";
import { ListRentalContractsUseCase } from "./api/ListRentalContractsUseCase";
import { UpdateRentalContractUseCase } from "./api/UpdateRentalContractUseCase";
import { DeleteRentalContractUseCase } from "./api/DeleteRentalContractUseCase";
import { IconHome, IconInbox } from "./components/icons";
import { ToastStack, type ToastItem } from "./components/Toast";

function App() {
  const [contracts, setContracts] = useState<RentalContract[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function pushToast(type: ToastItem["type"], message: string) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [...current, { id, type, message }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }

  function dismissToast(id: string) {
    setToasts((current) => current.filter((t) => t.id !== id));
  }

  async function handleCreateContract(
    tenantName: string,
    propertyAddress: string,
    monthlyRent: number,
    startDate: string,
    status: string,
  ) {
    try {
      const newContract = await new CreateRentalContractUseCase().handle({
        tenantName,
        propertyAddress,
        monthlyRent,
        startDate,
        status,
      });
      setContracts((actualContracts) => [...actualContracts, newContract]);
      pushToast("success", "Contrato criado com sucesso.");
    } catch {
      pushToast("error", "Não foi possível criar o contrato.");
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadContracts() {
      try {
        setError(null);
        const data = await new ListRentalContractsUseCase().handle();
        if (!canceled) {
          setContracts(data);
        }
      } catch (error) {
        console.log("Error to load contracts", error);
        if (!canceled) {
          setError("Erro ao buscar contratos");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadContracts();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(
    id: string,
    monthlyRent: number,
    status: string,
  ) {
    try {
      const contractEdited = await new UpdateRentalContractUseCase().handle({
        id,
        monthlyRent,
        status,
      });
      setContracts((actualContracts) =>
        actualContracts.map((c) => (c.id === id ? contractEdited : c)),
      );
      pushToast("success", "Contrato atualizado com sucesso.");
    } catch {
      pushToast("error", "Não foi possível atualizar o contrato.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteRentalContractUseCase().handle(id);
      setContracts((actualContracts) =>
        actualContracts.filter((c) => c.id !== id),
      );
      pushToast("success", "Contrato excluído.");
    } catch {
      pushToast("error", "Não foi possível excluir o contrato.");
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand__mark">
            <IconHome />
          </span>
          <span className="brand__name">RentaHouse</span>
        </div>
        <p className="site-header__tagline">
          Gerencie seus contratos de aluguel em um só lugar
        </p>
      </header>

      <ToastStack toasts={toasts} onDismiss={dismissToast} />

      <main className="page__content">
        <RentalContractForm onCreate={handleCreateContract} />

        <section className="contracts-section">
          <div className="contracts-section__header">
            <h2>Contratos</h2>
            {!loading && !error && (
              <span className="count-badge">{contracts.length}</span>
            )}
          </div>

          {error && <p className="state-message state-message--error">{error}</p>}

          {loading && <p className="state-message">Buscando contratos…</p>}

          {!error && !loading && contracts.length === 0 && (
            <div className="empty-state">
              <IconInbox className="empty-state__icon" />
              <p className="empty-state__title">Nenhum contrato por aqui</p>
              <p className="empty-state__hint">
                Cadastre o primeiro contrato usando o formulário acima.
              </p>
            </div>
          )}

          {contracts.length > 0 && (
            <div className="contracts-grid">
              {contracts.map((c) => (
                <RentalContractCard
                  key={c.id}
                  contract={c}
                  onSaveEdit={handleSaveEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
