import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

// Sem botão de logout: não há AuthContext ainda (exercício).
export function Header() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="site-header-actions">
        {location.pathname !== "/record/new" && (
          <Link to="/record/new" className="btn btn-primary">
            <span aria-hidden="true">+</span> Novo disco
          </Link>
        )}
        <button onClick={handleLogout} className="btn btn-primary">
          Sair
        </button>
      </div>
    </header>
  );
}
