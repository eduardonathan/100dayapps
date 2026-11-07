import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { RepairOrderForm } from "./components/RepairOrderForm";
import type { RepairOrder } from "./types/RepairOrder";
import { createRepairOrder } from "./api/createRepairOrderApi";
import { fetchRepairOrders } from "./api/fetchRepairOrdersApi";
import { RepairOrderCard } from "./components/RepairOrderCard";
import { updateRepairOrder } from "./api/updateRepairOrderApi";
import { deleteRepairOrder } from "./api/deleteRepairOrderApi";
import { formatCurrency } from "./lib/format";

function App() {
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleCreateRepairOrder(
    customerName: string,
    deviceModel: string,
    issue: string,
    cost: number,
    status: string,
  ) {
    try {
      const newRepairOrder = await createRepairOrder(
        customerName,
        deviceModel,
        issue,
        cost,
        status,
      );
      setOrders((actualOrders) => [...actualOrders, newRepairOrder]);
    } catch (error) {
      console.log("Error to create repair order", error);
    }
  }

  async function handleSaveEdit(id: string, cost: number, status: string) {
    try {
      const repairOrderEdited = await updateRepairOrder(id, cost, status);
      setOrders((actualOrders) =>
        actualOrders.map((o) => (o.id === id ? repairOrderEdited : o)),
      );
    } catch (error) {
      console.log("Error to save edit", error);
    }
  }

  async function handleDeleteOrderRepair(id: string) {
    try {
      await deleteRepairOrder(id);
      setOrders((actualOrders) => actualOrders.filter((o) => o.id !== id));
    } catch (error) {
      console.log("Error to delete repair order", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadRepairOrders() {
      try {
        setError(null);
        const data = await fetchRepairOrders();
        if (!canceled) {
          setOrders(data);
        }
      } catch (error) {
        console.log("Error to load repair orders", error);
        if (!canceled) {
          setError("Erro ao buscar as suas manutenções");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadRepairOrders();

    return () => {
      canceled = true;
    };
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (Number(o.cost) || 0), 0),
    [orders],
  );

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="brand">
            <span className="brand__dot" aria-hidden="true" />
            <div className="brand__text">
              <h1>Manutenção de Celulares</h1>
              <p>Controle de ordens de reparo</p>
            </div>
          </div>

          {!loading && !error && orders.length > 0 && (
            <p className="app__summary">
              <strong>{orders.length}</strong>{" "}
              {orders.length === 1 ? "ordem" : "ordens"} ·{" "}
              <strong>{formatCurrency(totalRevenue)}</strong> em serviços
            </p>
          )}
        </div>
      </header>

      <main className="app__main">
        <RepairOrderForm onCreate={handleCreateRepairOrder} />

        <section className="orders">
          <div className="orders__head">
            <h2>Ordens</h2>
            {!loading && !error && orders.length > 0 && (
              <span className="orders__count">
                {orders.length} {orders.length === 1 ? "aparelho" : "aparelhos"}
              </span>
            )}
          </div>

          {error && (
            <p className="state state--error">
              Erro ao buscar manutenções. Tente novamente.
            </p>
          )}
          {loading && <p className="state">Buscando manutenções…</p>}
          {!error && !loading && orders.length === 0 && (
            <p className="state">
              Nenhuma manutenção registrada ainda. Crie a primeira ao lado.
            </p>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="orders__list">
              {orders.map((o) => (
                <RepairOrderCard
                  key={o.id}
                  repairOrder={o}
                  onSaveEdit={handleSaveEdit}
                  onDelete={handleDeleteOrderRepair}
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
