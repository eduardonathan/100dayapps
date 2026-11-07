interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <span className={`logo logo-${size}`}>
      <LeafIcon className="logo-mark" />
      <span className="logo-word">
        folha<span className="logo-a">gem</span>
      </span>
    </span>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 17C16 9 11 5 4 5c0 8 4 12 12 12Z" />
      <path d="M16 21c0-7 4-11 12-11 0 7-4 11-12 11Z" />
      <rect x="15" y="15" width="2" height="13" rx="1" />
    </svg>
  );
}
