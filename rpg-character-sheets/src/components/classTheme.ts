type PixelColors = {
  /** primary armor / robe */
  c: string;
  /** collar / shoulder shade */
  d: string;
  /** trim / metal */
  e: string;
  /** eye glow */
  f: string;
  /** skin */
  b: string;
};

export interface ClassTheme extends PixelColors {
  name: string;
  glow: string;
}

const THEMES: Record<string, ClassTheme> = {
  guerreiro: {
    name: "Guerreiro",
    c: "#7c1f1f",
    d: "#3a1414",
    e: "#c8aa6e",
    f: "#ff8a5c",
    b: "#e3b48a",
    glow: "#ff6b4a",
  },
  mago: {
    name: "Mago",
    c: "#2b1f5c",
    d: "#1a1238",
    e: "#9c7cf6",
    f: "#7ef9ff",
    b: "#e3b48a",
    glow: "#7ef9ff",
  },
  arqueiro: {
    name: "Arqueiro",
    c: "#1f4d2e",
    d: "#12301c",
    e: "#b08d57",
    f: "#c9ff8a",
    b: "#e3b48a",
    glow: "#8fdb6a",
  },
  ladino: {
    name: "Ladino",
    c: "#1c1c24",
    d: "#0d0d12",
    e: "#8a3fbf",
    f: "#ff5ca8",
    b: "#d9a677",
    glow: "#c46bff",
  },
  paladino: {
    name: "Paladino",
    c: "#e9e2c9",
    d: "#c8aa6e",
    e: "#f0d98c",
    f: "#7ef9ff",
    b: "#e3b48a",
    glow: "#f0d98c",
  },
  clerigo: {
    name: "Clérigo",
    c: "#e9e2c9",
    d: "#c8aa6e",
    e: "#f0d98c",
    f: "#ffe27a",
    b: "#e3b48a",
    glow: "#f0d98c",
  },
  necromante: {
    name: "Necromante",
    c: "#1b2b1e",
    d: "#0d150e",
    e: "#5c8a5c",
    f: "#8aff6b",
    b: "#9fbf9f",
    glow: "#6bff8a",
  },
  bardo: {
    name: "Bardo",
    c: "#7a1f5c",
    d: "#3a0f2c",
    e: "#c8aa6e",
    f: "#ffd76b",
    b: "#e3b48a",
    glow: "#ffb6e6",
  },
  druida: {
    name: "Druida",
    c: "#3f5c2b",
    d: "#22320f",
    e: "#8a6a3d",
    f: "#d7ff6b",
    b: "#c9a06a",
    glow: "#b7ff6b",
  },
  barbaro: {
    name: "Bárbaro",
    c: "#5c2a12",
    d: "#2b1206",
    e: "#c8aa6e",
    f: "#ff6b3c",
    b: "#d19a6a",
    glow: "#ff6b3c",
  },
};

const KEYWORD_MAP: Array<[string[], keyof typeof THEMES]> = [
  [["guerreiro", "warrior", "cavaleiro", "knight", "fighter", "lutador"], "guerreiro"],
  [["mago", "mage", "feitic", "sorcer", "wizard", "bruxo", "bruxa"], "mago"],
  [["arqueiro", "ranger", "cacador", "caçador", "hunter", "atirador"], "arqueiro"],
  [["ladino", "rogue", "assassin", "ninja", "thief", "nightshade"], "ladino"],
  [["paladino", "paladin"], "paladino"],
  [["clerigo", "clérigo", "cleric", "sacerdote", "priest", "sister", "irma", "irmã"], "clerigo"],
  [["necromante", "necromancer"], "necromante"],
  [["bardo", "bard", "menestrel"], "bardo"],
  [["druida", "druid"], "druida"],
  [["barbaro", "bárbaro", "barbarian"], "barbaro"],
];

const FALLBACK_THEMES: ClassTheme[] = [
  { name: "Hextech", c: "#0ac8b9", d: "#065f57", e: "#c8aa6e", f: "#ffffff", b: "#e3b48a", glow: "#0ac8b9" },
  { name: "Arcano", c: "#2b3a7a", d: "#141d40", e: "#8a5cf6", f: "#7ef9ff", b: "#e3b48a", glow: "#8a5cf6" },
  { name: "Demacia", c: "#1e3a8a", d: "#101f45", e: "#c8aa6e", f: "#f0d98c", b: "#e3b48a", glow: "#c8aa6e" },
  { name: "Noxus", c: "#4a0f0f", d: "#200606", e: "#8a8a8a", f: "#ff4a4a", b: "#d19a6a", glow: "#ff4a4a" },
  { name: "Ionia", c: "#0f5c4a", d: "#082e26", e: "#e9e2c9", f: "#ffffff", b: "#e3b48a", glow: "#0f5c4a" },
];

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function getClassTheme(characterClass: string, seed = ""): ClassTheme {
  const normalized = normalize(characterClass || "");

  for (const [keywords, key] of KEYWORD_MAP) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return THEMES[key];
    }
  }

  const pick = hash(normalized + seed) % FALLBACK_THEMES.length;
  return FALLBACK_THEMES[pick];
}
