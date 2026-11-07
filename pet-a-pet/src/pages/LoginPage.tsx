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
    <div className="auth-screen">
      <div className="auth-card">
        <Logo size="lg" />
        <p className="auth-tagline">par a par, o match perfeito.</p>
        <h1 className="auth-title">Bem-vindo(a) de volta</h1>
        <p className="hero-subtitle">
          Entre para ver e cadastrar pets esperando por um lar.
        </p>
        <button className="btn btn-primary btn-lg" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
