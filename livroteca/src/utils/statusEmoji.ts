const STATUS_EMOJI: Record<string, string> = {
  "disponível": "📗",
  disponivel: "📗",
  emprestado: "📕",
  atrasado: "📙",
};

export function statusEmoji(status: string) {
  return STATUS_EMOJI[status.trim().toLowerCase()] ?? "📘";
}
