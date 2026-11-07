const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  agendado: { color: "var(--gold-strong)", bg: "var(--gold-bg)" },
  confirmado: { color: "var(--info)", bg: "var(--info-bg)" },
  feito: { color: "var(--success)", bg: "var(--success-bg)" },
  cancelado: { color: "var(--danger)", bg: "var(--danger-bg)" },
};

const DEFAULT_STYLE = { color: "var(--text-muted)", bg: "var(--bg-elevated-2)" };

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status.trim().toLowerCase()] ?? DEFAULT_STYLE;

  return (
    <span
      className="badge"
      style={{ color: style.color, background: style.bg }}
    >
      {status || "Sem status"}
    </span>
  );
}
