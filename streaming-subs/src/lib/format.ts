const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

export function brl(value: number): string {
  return brlFormatter.format(Number.isFinite(value) ? value : 0);
}

/** Accepts `yyyy-mm-dd`, `dd/mm/yyyy` or anything `Date` understands. */
export function parseDate(value: string): Date | null {
  if (!value) return null;

  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const date = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const br = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) {
    const date = new Date(Number(br[3]), Number(br[2]) - 1, Number(br[1]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const loose = new Date(value);
  return Number.isNaN(loose.getTime()) ? null : loose;
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function daysUntil(value: string): number | null {
  const date = parseDate(value);
  if (!date) return null;
  const diff = startOfDay(date) - startOfDay(new Date());
  return Math.round(diff / 86_400_000);
}

export function formatDateShort(value: string): string {
  const date = parseDate(value);
  if (!date) return value || "—";
  return shortDateFormatter.format(date).replace(".", "");
}

export type RenewTone = "urgent" | "soon" | "normal" | "past";

export function renewalInfo(value: string): { label: string; tone: RenewTone } {
  const days = daysUntil(value);
  if (days === null) return { label: "Sem data", tone: "normal" };

  if (days < 0) {
    const n = Math.abs(days);
    return {
      label: n === 1 ? "Renovou ontem" : `Renovou há ${n} dias`,
      tone: "past",
    };
  }
  if (days === 0) return { label: "Renova hoje", tone: "urgent" };
  if (days === 1) return { label: "Renova amanhã", tone: "urgent" };
  if (days <= 5) return { label: `Renova em ${days} dias`, tone: "soon" };
  if (days <= 30) return { label: `Renova em ${days} dias`, tone: "normal" };
  return { label: `Renova ${formatDateShort(value)}`, tone: "normal" };
}
