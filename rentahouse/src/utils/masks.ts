export const STATUS_OPTIONS = ["Ativo", "Pendente", "Atrasado", "Encerrado"];

export function maskDate(rawValue: string) {
  const digits = rawValue.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return [day, month, year].filter(Boolean).join("/");
}

export function isCompleteDate(value: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function maskCurrencyDigits(rawValue: string) {
  return rawValue.replace(/\D/g, "").slice(0, 12);
}

export function formatCentsDigits(digits: string) {
  if (!digits) return "";
  return currencyFormatter.format(Number(digits) / 100);
}

export function centsDigitsToNumber(digits: string) {
  return digits ? Number(digits) / 100 : 0;
}

export function numberToCentsDigits(value: number) {
  return Math.round(value * 100).toString();
}
