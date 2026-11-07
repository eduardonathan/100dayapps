import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="app-header-logo">
          <Logo size={30} />
        </Link>
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
