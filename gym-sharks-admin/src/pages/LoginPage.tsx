import { useNavigate } from "react-router-dom";
import { Fin } from "../components/Fin";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    login();
    navigate("/");
  }

  return (
    <div className="page-center">
      <div className="page-center__inner">
        <div className="brand">
          <Fin className="brand__fin" />
          <div>
            <span className="brand__name">
              GYM <b>SHARKS</b>
            </span>
            <span className="brand__tag">Painel administrativo</span>
          </div>
        </div>

        <section className="panel">
          <div className="panel__head">
            <h2>Acessar o painel</h2>
          </div>
          <div className="panel__body">
            <form className="form-grid" onSubmit={handleLogin}>
              <div className="field">
                <label htmlFor="f-email">E-mail</label>
                <input
                  id="f-email"
                  type="email"
                  className="control"
                  placeholder="voce@gymsharks.com"
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="f-password">Senha</label>
                <input
                  id="f-password"
                  type="password"
                  className="control"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  Entrar
                </button>
              </div>
              <p className="form-hint">
                Acesso restrito ao time de recepção e administração.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
