interface StatusBadgeProps {
  status: string;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  "saudável": { label: "Saudável", className: "badge-forest" },
  saudavel: { label: "Saudável", className: "badge-forest" },
  "com sede": { label: "Com sede", className: "badge-mustard" },
  "recuperação": { label: "Recuperação", className: "badge-berry" },
  recuperacao: { label: "Recuperação", className: "badge-berry" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.trim().toLowerCase();
  const info = STATUS_MAP[key] ?? { label: status, className: "badge-neutral" };

  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
