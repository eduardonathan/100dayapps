const STATUS_EMOJI: Record<string, string> = {
  novo: "✨",
  usado: "🎶",
  riscado: "💥",
};

export function statusEmoji(status: string) {
  return STATUS_EMOJI[status.trim().toLowerCase()] ?? "💿";
}
