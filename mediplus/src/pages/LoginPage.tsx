import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BrandMark } from "../components/BrandMark";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/");
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <aside className="auth__brand">
          <BrandMark size={44} />
          <div>
            <p className="auth__brand-name">MediPlus</p>
            <p className="auth__brand-tag">
              Controle de estoque de medicamentos
            </p>
          </div>
          <ul className="auth__points">
            <li>Quantidades em estoque sempre atualizadas</li>
            <li>Avisos de estoque baixo e validade próxima</li>
            <li>Cadastro rápido de novos medicamentos</li>
          </ul>
        </aside>

        <div className="auth__form">
          <h1>Entrar</h1>
          <p className="auth__lead">
            Acesse o painel para gerenciar o estoque da farmácia.
          </p>
          <button
            className="btn btn--primary btn--block"
            onClick={handleLogin}
          >
            Entrar no sistema
          </button>
          <p className="auth__note">
            Acesso de demonstração — nenhuma senha necessária.
          </p>
        </div>
      </div>
    </div>
  );
}
