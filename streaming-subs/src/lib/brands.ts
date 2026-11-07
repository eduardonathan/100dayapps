export interface Brand {
  /** Base brand color, ready to drop into CSS. */
  color: string;
  /** Text color that stays legible on top of `color`. */
  ink: string;
  /** 1–3 char monogram for the poster tile. */
  monogram: string;
}

interface BrandDef {
  keys: string[];
  color: string;
}

const BRANDS: BrandDef[] = [
  { keys: ["netflix"], color: "#e50914" },
  { keys: ["spotify"], color: "#1db954" },
  { keys: ["youtube", "youtubepremium", "ytpremium"], color: "#ff0033" },
  { keys: ["youtubemusic", "ytmusic"], color: "#ff0033" },
  { keys: ["disney", "disneyplus"], color: "#1a48e0" },
  { keys: ["max", "hbo", "hbomax"], color: "#3d2bff" },
  { keys: ["prime", "primevideo", "amazonprime", "amazon"], color: "#1fa2ff" },
  { keys: ["amazonmusic"], color: "#25d1da" },
  { keys: ["appletv", "apple", "appletvplus"], color: "#9aa0a6" },
  { keys: ["applemusic"], color: "#fa243c" },
  { keys: ["globoplay", "globo"], color: "#ff3b30" },
  { keys: ["paramount", "paramountplus"], color: "#0064ff" },
  { keys: ["crunchyroll"], color: "#f47521" },
  { keys: ["star", "starplus"], color: "#ffb100" },
  { keys: ["deezer"], color: "#ef5466" },
  { keys: ["tidal"], color: "#38e8ff" },
  { keys: ["mubi"], color: "#1f2be0" },
  { keys: ["twitch"], color: "#9146ff" },
  { keys: ["telecine"], color: "#1f6bff" },
  { keys: ["premiere"], color: "#00a859" },
  { keys: ["clarovideo", "claro"], color: "#da291c" },
  { keys: ["discovery", "discoveryplus"], color: "#0077ff" },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s._-]+/g, "")
    .trim();
}

function hashHue(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

function readableInk(color: string): string {
  if (!color.startsWith("#")) return "#ffffff";
  const clean = color.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#12121a" : "#ffffff";
}

export function getMonogram(serviceName: string): string {
  const trimmed = serviceName.trim();
  if (!trimmed) return "?";

  const hasPlus = /\+|\bplus\b/i.test(trimmed);
  const words = trimmed.split(/[\s._-]+/).filter(Boolean);

  let base =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : trimmed.slice(0, 2).toUpperCase();

  if (hasPlus && !base.includes("+")) {
    base = base[0] + "+";
  }
  return base;
}

export function getBrand(serviceName: string): Brand {
  const slug = normalize(serviceName);
  let color = "";

  if (slug) {
    const match = BRANDS.find((brand) =>
      brand.keys.some((key) => slug === key || slug.includes(key)),
    );
    if (match) color = match.color;
  }

  if (!color) {
    const hue = slug ? hashHue(slug) : 250;
    color = `hsl(${hue} 58% 56%)`;
  }

  return { color, ink: readableInk(color), monogram: getMonogram(serviceName) };
}
