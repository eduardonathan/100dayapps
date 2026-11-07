interface BrandMarkProps {
  size?: number;
}

export function BrandMark({ size = 32 }: BrandMarkProps) {
  return (
    <span className="brandmark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect className="brandmark__tile" x="1.5" y="1.5" width="21" height="21" rx="6" />
        <path
          className="brandmark__cross"
          d="M10.5 5h3v5.5H19v3h-5.5V19h-3v-5.5H5v-3h5.5V5Z"
        />
      </svg>
    </span>
  );
}
