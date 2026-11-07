export const CATEGORIES = [
  "Hardware",
  "Software",
  "Rede",
  "Acesso",
  "E-mail",
] as const;

export const PRIORITIES = ["Baixa", "Média", "Alta", "Crítica"] as const;

export const STATUSES = ["Aberto", "Em andamento", "Resolvido"] as const;

export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];

/** slug estável para usar em seletores CSS: toneOf("Crítica") -> "critica" */
export function toneOf(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
