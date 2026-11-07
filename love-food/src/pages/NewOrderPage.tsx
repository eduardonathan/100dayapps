import { useState, type FormEvent } from "react";
import { CreateOrderUseCase } from "../api/CreateOrderUseCase";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { STATUS_OPTIONS } from "../utils/orderStatus";

export function NewOrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [deliveryFee, setDeliveryFee] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleCreateOrder(event: FormEvent) {
    event.preventDefault();
    if (
      customerName.trim() === "" ||
      restaurant.trim() === "" ||
      status.trim() === "" ||
      deliveryFee.trim() === ""
    )
      return;

    const deliveryFeeN = Number(deliveryFee);

    try {
      setSubmitting(true);
      await new CreateOrderUseCase().handle({
        customerName,
        restaurant,
        status,
        deliveryFee: deliveryFeeN,
      });
      setCustomerName("");
      setRestaurant("");
      setStatus(STATUS_OPTIONS[0]);
      setDeliveryFee("");
      navigate("/");
    } catch (error) {
      console.log("Error to create a new order.", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <Link to="/" className="back-link">
          ← Voltar para os pedidos
        </Link>

        <div className="form-card">
          <div className="form-card-head">
            <div className="eyebrow">Novo pedido</div>
            <h1>Registrar entrega</h1>
            <p>Preencha os dados para adicionar o pedido à lista.</p>
          </div>

          <form className="form-grid" onSubmit={handleCreateOrder}>
            <div className="field">
              <label htmlFor="customerName">Nome do cliente</label>
              <input
                id="customerName"
                className="input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: Ana Souza"
              />
            </div>

            <div className="field">
              <label htmlFor="restaurant">Restaurante</label>
              <input
                id="restaurant"
                className="input"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                placeholder="Ex: Mequi"
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  className="input"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="deliveryFee">Taxa de entrega</label>
                <div className="fee-input-wrap">
                  <input
                    id="deliveryFee"
                    className="input"
                    type="number"
                    step="0.01"
                    min="0"
                    inputMode="decimal"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? "Criando..." : "Criar pedido"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
