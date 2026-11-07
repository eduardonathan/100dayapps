import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BrandMark } from "./BrandMark";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar__inner">
          <Link to="/" className="brand">
            <BrandMark size={34} />
            <span className="brand__name">MediPlus</span>
          </Link>

          <nav className="topbar__nav">
            <Link
              to="/"
              className={`navlink${pathname === "/" ? " is-active" : ""}`}
            >
              Estoque
            </Link>
            <Link
              to="/medicines/new"
              className={`navlink${
                pathname === "/medicines/new" ? " is-active" : ""
              }`}
            >
              Novo medicamento
            </Link>
          </nav>

          <button className="btn btn--ghost btn--sm" onClick={logout}>
            Sair
          </button>
        </div>
      </header>

      <main className="page">{children}</main>
    </div>
  );
}
