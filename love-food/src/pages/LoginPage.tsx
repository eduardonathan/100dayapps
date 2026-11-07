import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/");
  }

  return (
    <div className="login-shell">
      <section className="login-visual">
        <Logo size={340} withWordmark={false} className="login-visual-mark" />
        <div className="login-visual-top">
          <Logo size={30} variant="light" />
        </div>
        <div className="login-visual-quote">
          <p>&ldquo;Todo pedido carrega um pouco de carinho até a porta.&rdquo;</p>
          <span>Painel de entregas LoveFood</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="eyebrow login-card-eyebrow">Área do time</div>
          <h1>Bem-vindo de volta</h1>
          <p>Entre para acompanhar e organizar os pedidos de hoje.</p>
          <button className="btn btn-primary btn-block" onClick={handleLogin}>
            Entrar
          </button>
          <p className="login-card-note">
            Acesso restrito à equipe LoveFood.
          </p>
        </div>
      </section>
    </div>
  );
}
