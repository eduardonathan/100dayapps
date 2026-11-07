import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FAMOUS_CLIENTS,
  PROFESSIONALS,
  SALON_INFO,
} from "../constants/salon";
import { LogoMark, MapPinIcon, StarIcon } from "../components/icons";
import "./LoginPage.css";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <section className="login-brand">
          <span className="brand-mark login-brand-mark">
            <LogoMark width={34} height={34} />
          </span>
          <h1 className="login-title">{SALON_INFO.name}</h1>
          <p className="login-tagline">
            “Tradição e modernização andam juntos, profissionais altamente
            qualificados.”
          </p>

          <div className="login-meta">
            <span className="login-rating">
              <StarIcon width={15} height={15} />
              {SALON_INFO.rating.toString().replace(".", ",")}
              <span className="login-rating-count">
                ({SALON_INFO.reviewsCount.toLocaleString("pt-BR")} avaliações)
              </span>
            </span>
            <span className="login-address">
              <MapPinIcon width={15} height={15} />
              {SALON_INFO.address}
            </span>
          </div>

          <div className="login-professionals">
            <span className="login-section-label">Nossos profissionais</span>
            <div className="login-professionals-list">
              {PROFESSIONALS.map((name) => (
                <span key={name} className="login-chip">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="login-clients">
            <span className="login-section-label">Já passaram por aqui</span>
            <p className="login-clients-list">
              {FAMOUS_CLIENTS.join(" · ")}
            </p>
          </div>
        </section>

        <section className="card login-card">
          <h2>Acesso da equipe</h2>
          <p className="login-card-subtitle">
            Entre para gerenciar os agendamentos do salão.
          </p>
          <button
            className="btn btn-primary login-submit"
            onClick={handleLogin}
            type="button"
          >
            Entrar no painel
          </button>
        </section>
      </div>
    </div>
  );
}
