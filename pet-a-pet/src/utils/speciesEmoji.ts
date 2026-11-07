const SPECIES_EMOJI: Record<string, string> = {
  cachorro: "🐶",
  cao: "🐶",
  cão: "🐶",
  gato: "🐱",
  coelho: "🐰",
  passaro: "🐦",
  pássaro: "🐦",
  tartaruga: "🐢",
};

export function speciesEmoji(species: string) {
  return SPECIES_EMOJI[species.trim().toLowerCase()] ?? "🐾";
}
