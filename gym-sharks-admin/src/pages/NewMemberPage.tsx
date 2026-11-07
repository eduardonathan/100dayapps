import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateMemberUseCase } from "../api/CreateMemberUseCase";
import { PLAN_OPTIONS, STATUS_OPTIONS, planLabel } from "../lib/memberStyle";
import { Fin } from "../components/Fin";

export function NewMemberPage() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const isValid = name.trim() !== "" && plan.trim() !== "" && status.trim() !== "";

  async function handleCreateMember(event: FormEvent) {
    event.preventDefault();
    if (!isValid) return;

    try {
      setError(null);
      await new CreateMemberUseCase().handle({
        name,
        plan,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create a new member", error);
      setError("Não foi possível cadastrar o aluno. Tente novamente.");
    }
  }

  return (
    <div className="page-center">
      <div className="page-center__inner">
        <Link to="/" className="brand brand--link">
          <Fin className="brand__fin" />
          <div>
            <span className="brand__name">
              GYM <b>SHARKS</b>
            </span>
            <span className="brand__tag">Novo aluno</span>
          </div>
        </Link>

        <section className="panel">
          <div className="panel__head">
            <h2>Cadastrar aluno</h2>
          </div>
          <div className="panel__body">
            <form className="form-grid" onSubmit={handleCreateMember}>
              <div className="field">
                <label htmlFor="f-name">Nome do aluno</label>
                <input
                  id="f-name"
                  className="control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Ana Souza"
                  autoComplete="off"
                />
              </div>

              <div className="row-2">
                <div className="field">
                  <label htmlFor="f-plan">Plano</label>
                  <select
                    id="f-plan"
                    className="control"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {PLAN_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {planLabel(p)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-status">Status</label>
                  <select
                    id="f-status"
                    className="control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="form-hint" style={{ color: "var(--blood)" }}>
                  {error}
                </p>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn--primary" disabled={!isValid}>
                  Cadastrar
                </button>
              </div>

              <p className="form-hint">
                O aluno entra na lista imediatamente após o cadastro.
              </p>
            </form>
          </div>
        </section>

        <Link to="/" className="back-link">
          ← Voltar para a lista
        </Link>
      </div>
    </div>
  );
}
