import type { CSSProperties } from "react";
import { getClassTheme } from "./classTheme";

// 16x16 pixel-art bust: hood/helmet (C), trim (E), skin (B), eye glow (F),
// collar (D) and armored shoulders (C/E). '.' is transparent.
const SPRITE = [
  "................",
  ".....AAAAAA.....",
  "...AACCCCCCAA...",
  "..AECCCCCCCCEA..",
  ".AECCCEEEECCCEA.",
  ".AEBBBBBBBBBBEA.",
  ".ABBFBBBBBBFBBA.",
  ".ABBBBBBBBBBBBA.",
  ".AABBBBBBBBBBAA.",
  "..AABBBBBBBBAA..",
  "...AADDDDDDAA...",
  "..ADDDCCCCDDDA..",
  ".ADDCCCCCCCCDDA.",
  "AEDCCCCEECCCCDEA",
  "AEDCCCCCCCCCCDEA",
  ".AAAAAAAAAAAAAA.",
];

const OUTLINE = "#08060d";

interface PixelAvatarProps {
  characterClass: string;
  seed?: string;
  size?: number;
  className?: string;
}

export function PixelAvatar({ characterClass, seed = "", size = 96, className }: PixelAvatarProps) {
  const theme = getClassTheme(characterClass, seed);
  const colorFor = (char: string): string | null => {
    switch (char) {
      case "A":
        return OUTLINE;
      case "B":
        return theme.b;
      case "C":
        return theme.c;
      case "D":
        return theme.d;
      case "E":
        return theme.e;
      case "F":
        return theme.f;
      default:
        return null;
    }
  };

  return (
    <div
      className={`pixel-avatar${className ? ` ${className}` : ""}`}
      style={{ "--avatar-glow": theme.glow, "--avatar-bg": theme.d } as CSSProperties}
    >
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        shapeRendering="crispEdges"
        role="img"
        aria-label={`Retrato pixel art de classe ${theme.name}`}
      >
        {SPRITE.map((row, y) =>
          row.split("").map((char, x) => {
            const fill = colorFor(char);
            if (!fill) return null;
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
          }),
        )}
      </svg>
    </div>
  );
}
