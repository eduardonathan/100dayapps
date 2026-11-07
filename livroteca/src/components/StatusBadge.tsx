interface StatusBadgeProps {
  status: string;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  "disponível": { label: "Disponível", className: "badge-forest" },
  disponivel: { label: "Disponível", className: "badge-forest" },
  emprestado: { label: "Emprestado", className: "badge-mustard" },
  atrasado: { label: "Atrasado", className: "badge-berry" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.trim().toLowerCase();
  const info = STATUS_MAP[key] ?? { label: status, className: "badge-neutral" };

  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
