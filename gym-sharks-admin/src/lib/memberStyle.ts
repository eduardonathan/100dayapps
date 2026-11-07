export const STATUS_OPTIONS = ["ativo", "inativo", "suspenso"] as const;
export const PLAN_OPTIONS = [
  "mensal",
  "trimestral",
  "anual",
  "super galaxy baby ultra",
] as const;

const STATUS_COLORS: Record<string, string> = {
  ativo: "var(--st-ativo)",
  inativo: "var(--st-inativo)",
  suspenso: "var(--st-suspenso)",
};

const PLAN_COLORS: Record<string, string> = {
  mensal: "var(--pl-mensal)",
  trimestral: "var(--pl-trimestral)",
  anual: "var(--pl-anual)",
  "super galaxy baby ultra": "var(--pl-galaxy)",
};

const PLAN_LABELS: Record<string, string> = {
  "super galaxy baby ultra": "✨ Super Galaxy Baby Ultra",
};

const FALLBACK_COLOR = "var(--tooth)";

/** Cor associada a um status (case-insensitive), com fallback para texto livre. */
export function statusColor(status: string): string {
  return STATUS_COLORS[status.trim().toLowerCase()] ?? FALLBACK_COLOR;
}

/** Cor associada a um plano (case-insensitive), com fallback para texto livre. */
export function planColor(plan: string): string {
  return PLAN_COLORS[plan.trim().toLowerCase()] ?? FALLBACK_COLOR;
}

/** Rótulo de exibição de um plano; a maioria usa o próprio valor. */
export function planLabel(plan: string): string {
  return PLAN_LABELS[plan.trim().toLowerCase()] ?? plan;
}

/** Se o plano deve ganhar o brilho especial (efeito "galáctico"). */
export function isGalaxyPlan(plan: string): boolean {
  return plan.trim().toLowerCase() === "super galaxy baby ultra";
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
