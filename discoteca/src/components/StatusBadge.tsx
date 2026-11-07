interface StatusBadgeProps {
  status: string;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  novo: { label: "Novo", className: "badge-forest" },
  usado: { label: "Usado", className: "badge-mustard" },
  riscado: { label: "Riscado", className: "badge-berry" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.trim().toLowerCase();
  const info = STATUS_MAP[key] ?? { label: status, className: "badge-neutral" };

  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
