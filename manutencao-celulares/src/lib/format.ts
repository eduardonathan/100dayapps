const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value: number): string {
  return currency.format(Number.isFinite(value) ? value : 0);
}

export const STATUS_OPTIONS = [
  "Aguardando",
  "Em análise",
  "Em reparo",
  "Concluído",
  "Entregue",
];

const DIACRITICS = /[̀-ͯ]/g;

const STATUS_RULES: [test: (s: string) => boolean, className: string][] = [
  [(s) => s.includes("aguard") || s.includes("fila"), "status--wait"],
  [(s) => s.includes("anali") || s.includes("orc"), "status--review"],
  [
    (s) => s.includes("repar") || s.includes("andamento") || s.includes("execu"),
    "status--repair",
  ],
  [(s) => s.includes("conclu") || s.includes("pront"), "status--done"],
  [(s) => s.includes("entreg"), "status--delivered"],
];

export function statusClass(status: string): string {
  const normalized = status
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "");

  for (const [test, className] of STATUS_RULES) {
    if (test(normalized)) return className;
  }
  return "status--default";
}
