export interface Modality {
  value: string;
  label: string;
  color: string;
}

export const MODALITIES: Modality[] = [
  { value: "Musculação", label: "Musculação", color: "var(--m-musculacao)" },
  { value: "Funcional", label: "Funcional", color: "var(--m-funcional)" },
  { value: "Cross", label: "Cross Training", color: "var(--m-cross)" },
  { value: "Spinning", label: "Spinning", color: "var(--m-spinning)" },
  { value: "Pilates", label: "Pilates", color: "var(--m-pilates)" },
  { value: "Yoga", label: "Yoga", color: "var(--m-yoga)" },
  { value: "Boxe", label: "Boxe / Muay Thai", color: "var(--m-boxe)" },
  { value: "Jiu-Jitsu", label: "Jiu-Jitsu", color: "var(--m-jiujitsu)" },
  { value: "Natação", label: "Natação", color: "var(--m-natacao)" },
];

const FALLBACK_COLOR = "var(--tooth)";

/** Cor associada a uma modalidade (case-insensitive), com fallback para texto livre. */
export function modalityColor(name: string): string {
  const hit = MODALITIES.find(
    (m) => m.value.toLowerCase() === name.trim().toLowerCase(),
  );
  return hit?.color ?? FALLBACK_COLOR;
}
