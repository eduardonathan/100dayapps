import { useEffect, useState } from "react";
import type { DeliveryOrder } from "../types/DeliveryOrder";
import { ListOrdersUseCase } from "../api/ListOrdersUseCase";
import { OrderCard } from "../components/OrderCard";
import { UpdateOrderUseCase } from "../api/UpdateOrderUseCase";
import { DeleteOrderUseCase } from "../api/DeleteOrderUseCase";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";

export function HomePage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function loadOrders() {
      try {
        setError(null);
        const data = await new ListOrdersUseCase().handle();
        if (!canceled) {
          setOrders(data);
        }
      } catch (error) {
        console.log("Error to load orders", error);
        if (!canceled) {
          setError("Erro ao buscar pedidos");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSaveEdit(
    id: string,
    status: string,
    deliveryFee: number,
  ) {
    try {
      const orderEdited = await new UpdateOrderUseCase().handle({
        id,
        status,
        deliveryFee,
      });
      setOrders((actualOrders) =>
        actualOrders.map((o) => (o.id === id ? orderEdited : o)),
      );
    } catch (error) {
      console.log("Error to update this order", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteOrderUseCase().handle(id);
      setOrders((actualOrders) => actualOrders.filter((o) => o.id !== id));
    } catch (error) {
      console.log("Error to delete this order", error);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-head">
          <div className="page-head-text">
            <div className="eyebrow">Painel de pedidos</div>
            <h1>Seus pedidos</h1>
            <p>
              {orders.length > 0
                ? `${orders.length} pedido${orders.length > 1 ? "s" : ""} no total`
                : "Acompanhe cada entrega do início ao fim"}
            </p>
          </div>
          <Link to="/orders/new" className="btn btn-primary">
            + Novo pedido
          </Link>
        </div>

        {error && <div className="banner banner-error">{error}</div>}

        {loading && (
          <div className="state-list">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        )}

        {!error && !loading && orders.length === 0 && (
          <div className="empty-state">
            <Logo withWordmark={false} size={56} />
            <h2>Nenhum pedido por aqui</h2>
            <p>
              Quando um novo pedido chegar, ele aparece aqui para você
              acompanhar a entrega.
            </p>
            <Link to="/orders/new" className="btn btn-primary">
              + Criar o primeiro pedido
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="orders-grid">
            {orders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                onSaveEdit={handleSaveEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
