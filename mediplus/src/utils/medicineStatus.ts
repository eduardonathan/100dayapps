export type StockLevel = "ok" | "low" | "out";
export type ExpiryState = "ok" | "soon" | "expired";

const LOW_STOCK_THRESHOLD = 50;
const EXPIRY_WARNING_DAYS = 90;
const MS_PER_DAY = 86_400_000;

/** Interpreta datas no formato "dd/mm/aaaa" usado pela API. */
export function parseBrDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function stockLevel(quantity: number): StockLevel {
  if (quantity <= 0) return "out";
  if (quantity < LOW_STOCK_THRESHOLD) return "low";
  return "ok";
}

export function daysUntilExpiry(
  expirationDate: string,
  now: Date = new Date(),
): number | null {
  const date = parseBrDate(expirationDate);
  if (!date) return null;
  return Math.ceil((date.getTime() - now.getTime()) / MS_PER_DAY);
}

export function expiryState(
  expirationDate: string,
  now: Date = new Date(),
): ExpiryState {
  const days = daysUntilExpiry(expirationDate, now);
  if (days === null) return "ok";
  if (days < 0) return "expired";
  if (days <= EXPIRY_WARNING_DAYS) return "soon";
  return "ok";
}
