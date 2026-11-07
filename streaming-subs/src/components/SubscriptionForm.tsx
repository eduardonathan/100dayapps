import { useEffect, useState, type FormEvent } from "react";
import { getBrand } from "../lib/brands";

interface SubscriptionFormProps {
  onCreate: (
    serviceName: string,
    plan: string,
    price: number,
    renewDate: string,
  ) => Promise<boolean>;
  onClose: () => void;
}

export function SubscriptionForm({ onCreate, onClose }: SubscriptionFormProps) {
  const [serviceName, setServiceName] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [renewDate, setRenewDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const priceNumber = Number(price.replace(",", "."));
  const isValid =
    serviceName.trim() !== "" &&
    plan.trim() !== "" &&
    price.trim() !== "" &&
    Number.isFinite(priceNumber) &&
    priceNumber > 0 &&
    renewDate !== "";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    const ok = await onCreate(
      serviceName.trim(),
      plan.trim(),
      priceNumber,
      renewDate,
    );
    setSubmitting(false);
    if (ok) onClose();
  }

  const brand = getBrand(serviceName);

  return (
    <div
      className="backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-head">
          <h2 id="dialog-title">Nova assinatura</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Fechar"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="dialog-preview">
          <span
            className="tile"
            style={{ background: brand.color, color: brand.ink }}
            aria-hidden="true"
          >
            {brand.monogram}
          </span>
          <div className="dialog-preview-text">
            <p className="dialog-preview-name">
              {serviceName.trim() || "Nome do serviço"}
            </p>
            <p className="dialog-preview-plan">{plan.trim() || "Plano"}</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field-label">
            Serviço
            <input
              className="field"
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
              placeholder="Netflix, Spotify, Max…"
              autoFocus
            />
          </label>

          <label className="field-label">
            Plano
            <input
              className="field"
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
              placeholder="Premium, Individual, Padrão com anúncios…"
            />
          </label>

          <div className="form-row">
            <label className="field-label">
              Preço mensal
              <span className="field-wrap">
                <span className="field-prefix">R$</span>
                <input
                  className="field field-has-prefix"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  inputMode="decimal"
                  placeholder="39,90"
                />
              </span>
            </label>

            <label className="field-label">
              Renova em
              <input
                className="field"
                type="date"
                value={renewDate}
                onChange={(event) => setRenewDate(event.target.value)}
              />
            </label>
          </div>

          <div className="dialog-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || submitting}
            >
              {submitting ? "Adicionando…" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
