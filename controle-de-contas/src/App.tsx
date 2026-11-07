import { useEffect, useState, type FormEvent } from "react";
import type { Bill } from "./types/Bill";
import { createBill } from "./api/createBillApi";
import { fetchBills } from "./api/fetchBillsApi";
import { updateBill } from "./api/updateBillApi";
import { deleteBill } from "./api/deleteBillApi";
import "./App.css";

function getStatusClass(status: string) {
  const normalized = status.trim().toLowerCase();
  if (normalized.includes("pag")) return "paid";
  if (normalized.includes("atras") || normalized.includes("venc"))
    return "overdue";
  if (normalized.includes("pend")) return "pending";
  return "";
}

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusEdited, setStatusEdited] = useState("");

  async function handleCreateBill(event: FormEvent) {
    event.preventDefault();

    if (
      dueDate.trim() === "" ||
      status.trim() === "" ||
      total.trim() === "" ||
      type.trim() === ""
    )
      return;

    try {
      const newBill = await createBill(dueDate, status, total, type);
      setBills((actualBills) => [...actualBills, newBill]);
      setDueDate("");
      setStatus("");
      setTotal("");
      setType("");
    } catch (error) {
      console.log("Error to create bill");
    }
  }

  useEffect(() => {
    let canceled = false;

    async function loadBills() {
      try {
        setError(null);
        const data = await fetchBills();
        if (!canceled) {
          setBills(data);
        }
      } catch (error) {
        console.log("Error to load your bills");
        if (!canceled) {
          setError("Erro ao buscar suas contas");
        }
      } finally {
        setLoading(false);
      }
    }

    loadBills();

    return () => {
      canceled = true;
    };
  }, []);

  function handleStartEdit(bill: Bill) {
    setEditingId(bill.id);
    setStatusEdited(bill.status);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setStatusEdited("");
  }

  async function handleSaveEdit(id: string) {
    if (statusEdited.trim() === "") return;

    try {
      const editedBill = await updateBill(id, statusEdited);
      setBills((actualBills) =>
        actualBills.map((a) => (id === a.id ? editedBill : a)),
      );
      setEditingId(null);
      setStatusEdited("");
    } catch (error) {
      console.log("Error to update bill");
    }
  }

  async function handleDeleteBill(id: string) {
    try {
      await deleteBill(id);
      setBills((actualBills) => actualBills.filter((a) => a.id != id));
    } catch (error) {
      console.log("Error to delete bill");
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <span className="kicker">Controle de contas</span>
        <h1>PagLogo</h1>
        <p>Organize e acompanhe o pagamento das suas contas</p>
      </header>

      <form className="bill-form" onSubmit={handleCreateBill}>
        <label className="field">
          <span>Tipo</span>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Ex: Conta de Luz"
          />
        </label>
        <label className="field">
          <span>Valor</span>
          <input
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="R$ 0,00"
          />
        </label>
        <label className="field">
          <span>Vencimento</span>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="01/01/2026"
          />
        </label>
        <label className="field">
          <span>Status</span>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="paga, pendente..."
          />
        </label>
        <button className="btn-primary" type="submit">
          Cadastrar Conta
        </button>
      </form>

      {error && <p className="state-message error">Erro ao carregar suas contas.</p>}
      {loading && <p className="state-message">Carregando suas contas!</p>}
      {!loading && !error && bills.length === 0 && (
        <p className="state-message">Não há contas cadastradas</p>
      )}

      {bills.length > 0 && (
        <div className="table-wrap">
          <table className="bill-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th aria-label="Ações"></th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b.id}>
                  <td className="col-type">{b.type}</td>
                  <td className="col-total">{b.total}</td>
                  <td className="col-date">{b.dueDate}</td>
                  <td className="col-status">
                    {editingId === b.id ? (
                      <input
                        value={statusEdited}
                        onChange={(e) => setStatusEdited(e.target.value)}
                      />
                    ) : (
                      <span className={`status ${getStatusClass(b.status)}`}>
                        {b.status}
                      </span>
                    )}
                  </td>
                  <td className="col-actions">
                    {editingId === b.id ? (
                      <>
                        <button
                          className="btn-text"
                          onClick={() => handleSaveEdit(b.id)}
                        >
                          Salvar
                        </button>
                        <button className="btn-text" onClick={handleCancelEdit}>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-text"
                          onClick={() => handleStartEdit(b)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-text danger"
                          onClick={() => handleDeleteBill(b.id)}
                        >
                          Deletar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
