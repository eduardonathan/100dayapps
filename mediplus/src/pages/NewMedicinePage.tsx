import { useState, type FormEvent } from "react";
import { CreateMedicineUseCase } from "../api/CreateMedicineUseCase";
import { Link, useNavigate } from "react-router-dom";

export function NewMedicinePage() {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const navigate = useNavigate();

  async function handleCreateMedicine(event: FormEvent) {
    event.preventDefault();

    if (
      name.trim() === "" ||
      manufacturer.trim() === "" ||
      quantity.trim() === "" ||
      expirationDate.trim() === ""
    )
      return;

    const quantityN = Number(quantity);

    try {
      await new CreateMedicineUseCase().handle({
        name,
        manufacturer,
        quantity: quantityN,
        expirationDate,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create medicine", error);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head__title">
          <h1>Novo medicamento</h1>
          <p className="page-head__sub">
            Informe os dados do item para incluí-lo no estoque.
          </p>
        </div>
      </div>

      <form className="card form-card" onSubmit={handleCreateMedicine}>
        <div className="form-grid">
          <label className="field">
            <span className="field__label">Nome do medicamento</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Paracetamol 750mg"
            />
          </label>

          <label className="field">
            <span className="field__label">Fabricante</span>
            <input
              className="input"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Ex.: Neo Química"
            />
          </label>

          <label className="field">
            <span className="field__label">Quantidade em estoque</span>
            <input
              className="input"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex.: 120"
            />
          </label>

          <label className="field">
            <span className="field__label">Data de validade</span>
            <input
              className="input"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="dd/mm/aaaa"
            />
            <span className="field__hint">Formato: dia/mês/ano</span>
          </label>
        </div>

        <div className="form-actions">
          <Link to="/" className="btn">
            Cancelar
          </Link>
          <button type="submit" className="btn btn--primary">
            Cadastrar medicamento
          </button>
        </div>
      </form>
    </div>
  );
}
