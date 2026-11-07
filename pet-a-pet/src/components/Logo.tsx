interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <span className={`logo logo-${size}`}>
      <PawIcon className="logo-mark" />
      <span className="logo-word">
        pet <span className="logo-a">a</span> pet
      </span>
    </span>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="21.5" rx="9.2" ry="7.6" />
      <ellipse
        cx="5.6"
        cy="13.4"
        rx="3.9"
        ry="5.1"
        transform="rotate(-18 5.6 13.4)"
      />
      <ellipse
        cx="12.4"
        cy="6.6"
        rx="4"
        ry="5.2"
        transform="rotate(-6 12.4 6.6)"
      />
      <ellipse
        cx="19.8"
        cy="6.6"
        rx="4"
        ry="5.2"
        transform="rotate(6 19.8 6.6)"
      />
      <ellipse
        cx="26.4"
        cy="13.4"
        rx="3.9"
        ry="5.1"
        transform="rotate(18 26.4 13.4)"
      />
    </svg>
  );
}
