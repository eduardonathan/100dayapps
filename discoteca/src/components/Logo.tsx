interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <span className={`logo logo-${size}`}>
      <VinylIcon className="logo-mark" />
      <span className="logo-word">
        disco<span className="logo-a">teca</span>
      </span>
    </span>
  );
}

function VinylIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" />
      <circle cx="16" cy="16" r="10" fill="var(--paper)" opacity="0.15" />
      <circle cx="16" cy="16" r="4.5" fill="var(--paper)" />
      <circle cx="16" cy="16" r="1.6" />
    </svg>
  );
}
