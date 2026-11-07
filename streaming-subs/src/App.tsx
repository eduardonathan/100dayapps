import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { SubscriptionForm } from "./components/SubscriptionForm";
import { SubscriptionCard } from "./components/SubscriptionCard";
import type { Subscription } from "./types/Subscription";
import { createSubscription } from "./api/createSubscriptionApi";
import { fetchSubscriptions } from "./api/fetchSubscriptionsApi";
import { updateSubscription } from "./api/updateSubscriptionApi";
import { deleteSubscription } from "./api/deleteSubscriptionApi";
import { getBrand } from "./lib/brands";
import { brl, daysUntil, renewalInfo } from "./lib/format";

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubscriptions();
      setSubscriptions(data);
    } catch {
      setError("Não foi possível carregar suas assinaturas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchSubscriptions();
        if (!cancelled) setSubscriptions(data);
      } catch {
        if (!cancelled) setError("Não foi possível carregar suas assinaturas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreateSubscription(
    serviceName: string,
    plan: string,
    price: number,
    renewDate: string,
  ): Promise<boolean> {
    try {
      const created = await createSubscription(serviceName, plan, price, renewDate);
      setSubscriptions((current) => [...current, created]);
      setNotice(null);
      return true;
    } catch {
      setNotice("Não foi possível adicionar a assinatura. Tente de novo.");
      return false;
    }
  }

  async function handleSaveEdit(id: string, plan: string, price: number) {
    try {
      const updated = await updateSubscription(id, plan, price);
      setSubscriptions((current) =>
        current.map((item) => (item.id === id ? updated : item)),
      );
    } catch {
      setNotice("Não foi possível salvar as alterações.");
    }
  }

  async function handleDeleteSubscription(id: string) {
    const snapshot = subscriptions;
    setSubscriptions((current) => current.filter((item) => item.id !== id));
    try {
      await deleteSubscription(id);
    } catch {
      setSubscriptions(snapshot);
      setNotice("Não foi possível excluir a assinatura.");
    }
  }

  const monthlyTotal = useMemo(
    () =>
      subscriptions.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
    [subscriptions],
  );

  const nextRenewal = useMemo(
    () =>
      subscriptions
        .map((item) => ({ item, days: daysUntil(item.renewDate) }))
        .filter(
          (entry): entry is { item: Subscription; days: number } =>
            entry.days !== null && entry.days >= 0,
        )
        .sort((a, b) => a.days - b.days)[0],
    [subscriptions],
  );

  const hasSubscriptions = subscriptions.length > 0;

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-dot" aria-hidden="true" />
            Elenco
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setFormOpen(true)}
          >
            Nova assinatura
          </button>
        </div>
      </header>

      <main className="content">
        <section className="summary">
          <div className="summary-headline">
            <span className="eyebrow">Total mensal</span>
            <p className="summary-value">
              {brl(monthlyTotal)}
              <span className="summary-unit">/mês</span>
            </p>
          </div>

          <div className="summary-stats">
            <div className="stat">
              <span className="stat-key">{subscriptions.length}</span>
              <span className="stat-label">
                {subscriptions.length === 1 ? "assinatura" : "assinaturas"}
              </span>
            </div>
            <div className="stat">
              <span className="stat-key">{brl(monthlyTotal * 12)}</span>
              <span className="stat-label">por ano</span>
            </div>
            <div className="stat">
              <span className="stat-key stat-key-sm">
                {nextRenewal ? nextRenewal.item.serviceName : "—"}
              </span>
              <span className="stat-label">
                {nextRenewal
                  ? renewalInfo(nextRenewal.item.renewDate).label.toLowerCase()
                  : "próxima renovação"}
              </span>
            </div>
          </div>
        </section>

        {hasSubscriptions && (
          <div
            className="spend-bar"
            role="img"
            aria-label="Distribuição do gasto mensal por serviço"
          >
            {subscriptions.map((item) => {
              const share =
                monthlyTotal > 0
                  ? ((Number(item.price) || 0) / monthlyTotal) * 100
                  : 100 / subscriptions.length;
              return (
                <span
                  key={item.id}
                  style={{
                    width: `${share}%`,
                    background: getBrand(item.serviceName).color,
                  }}
                  title={`${item.serviceName} · ${brl(Number(item.price) || 0)}`}
                />
              );
            })}
          </div>
        )}

        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label="Fechar aviso"
            >
              ×
            </button>
          </div>
        )}

        <section className="collection">
          <div className="collection-head">
            <h2>Suas assinaturas</h2>
            {hasSubscriptions && (
              <span className="collection-count">{subscriptions.length}</span>
            )}
          </div>

          {loading && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton" key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="state">
              <p className="state-title">{error}</p>
              <p className="state-text">
                Confira se a API está no ar em localhost:3001 e tente de novo.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => void reload()}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && !hasSubscriptions && (
            <div className="state">
              <div className="state-art" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="state-title">Nenhuma assinatura ainda</p>
              <p className="state-text">
                Adicione seus serviços de streaming para ver quanto eles somam
                por mês — e quando cada um renova.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setFormOpen(true)}
              >
                Adicionar a primeira
              </button>
            </div>
          )}

          {!loading && !error && hasSubscriptions && (
            <div className="grid">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onSaveEdit={handleSaveEdit}
                  onDelete={handleDeleteSubscription}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {formOpen && (
        <SubscriptionForm
          onCreate={handleCreateSubscription}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
