interface StatusBadgeProps {
  status: string;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  "disponível": { label: "Disponível", className: "badge-brand" },
  disponivel: { label: "Disponível", className: "badge-brand" },
  pendente: { label: "Pendente", className: "badge-mustard" },
  adotado: { label: "Adotado", className: "badge-forest" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.trim().toLowerCase();
  const info = STATUS_MAP[key] ?? { label: status, className: "badge-neutral" };

  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
