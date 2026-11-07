import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        {location.pathname !== "/adoption/new" && (
          <Link to="/adoption/new" className="btn btn-primary">
            <span aria-hidden="true">+</span> Nova adoção
          </Link>
        )}
        <button className="btn btn-ghost" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
