import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <div className="app-glow" aria-hidden="true" />
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-icon">⚔</span>
          <span className="brand-text">
            Fichas<span className="brand-accent">RPG</span>
          </span>
        </Link>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>Forjado em pixels para aventureiros</span>
      </footer>
    </div>
  );
}
