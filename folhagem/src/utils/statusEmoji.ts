const STATUS_EMOJI: Record<string, string> = {
  "saudável": "🌿",
  saudavel: "🌿",
  "com sede": "🥀",
  "recuperação": "🌱",
  recuperacao: "🌱",
};

export function statusEmoji(status: string) {
  return STATUS_EMOJI[status.trim().toLowerCase()] ?? "🪴";
}
