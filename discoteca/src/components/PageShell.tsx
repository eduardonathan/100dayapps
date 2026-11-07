import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Header />
      <main className="page">{children}</main>
      <Footer />
    </div>
  );
}
