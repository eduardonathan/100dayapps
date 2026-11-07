import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const location = useLocation();

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    login();
    navigate("/login");
  }

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="site-header-actions">
        {location.pathname !== "/plant/new" && (
          <Link to="/plant/new" className="btn btn-primary">
            <span aria-hidden="true">+</span> Nova planta
          </Link>
        )}
        <button onClick={handleLogout} className="btn btn-primary">
          Sair
        </button>
      </div>
    </header>
  );
}
