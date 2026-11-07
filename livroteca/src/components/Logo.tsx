interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <span className={`logo logo-${size}`}>
      <BookIcon className="logo-mark" />
      <span className="logo-word">
        livro<span className="logo-a">teca</span>
      </span>
    </span>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 8c3.4-1.9 7.6-1.9 10 0v17c-2.4-1.9-6.6-1.9-10 0Z" />
      <path d="M26 8c-3.4-1.9-7.6-1.9-10 0v17c2.4-1.9 6.6-1.9 10 0Z" />
    </svg>
  );
}
