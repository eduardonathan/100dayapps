import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SALON_INFO } from "../constants/salon";
import { LogoMark, LogoutIcon, MapPinIcon, StarIcon } from "./icons";
import "./AppLayout.css";

export function AppLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <LogoMark width={24} height={24} />
            </span>
            <span className="brand-name">{SALON_INFO.name}</span>
          </Link>

          <div className="app-header-right">
            <span className="rating-pill">
              <StarIcon width={13} height={13} />
              {SALON_INFO.rating.toString().replace(".", ",")}
              <span className="rating-pill-count">
                · {SALON_INFO.reviewsCount.toLocaleString("pt-BR")} avaliações
              </span>
            </span>
            <button className="btn btn-ghost" onClick={logout} type="button">
              <LogoutIcon width={16} height={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div className="container app-footer-inner">
          <p className="app-footer-address">
            <MapPinIcon width={15} height={15} />
            {SALON_INFO.address}
          </p>
          <a
            href={SALON_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            className="app-footer-link"
          >
            @estiloscabeleireiros_oficial
          </a>
        </div>
      </footer>
    </div>
  );
}
