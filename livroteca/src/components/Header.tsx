import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

// Sem botão de logout aqui: não há AuthContext ainda.
// Depois de criar o AuthContext/AuthProvider, use um hook useAuth()
// pra pegar `logout` e mostrar um botão "Sair", como nos outros projetos.
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
        {location.pathname !== "/book/new" && (
          <Link to="/book/new" className="btn btn-primary">
            <span aria-hidden="true">+</span> Novo livro
          </Link>
        )}
        <button onClick={handleLogout} className="btn btn-primary">
          Sair
        </button>
      </div>
    </header>
  );
}
