interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  variant?: "default" | "light";
  className?: string;
}

let maskId = 0;

export function Logo({
  size = 32,
  withWordmark = true,
  variant = "default",
  className,
}: LogoProps) {
  const id = `logo-bite-${maskId++}`;
  const classes = ["logo"];
  if (variant === "light") classes.push("logo-light");
  if (className) classes.push(className);

  return (
    <span className={classes.join(" ")}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-mark"
        aria-hidden="true"
      >
        <mask id={id}>
          <rect width="64" height="64" fill="black" />
          <path
            d="M32 57C32 57 6 40 6 21.5C6 10.7 14.3 4 23.5 4C29.3 4 32 9 32 13.5C32 9 34.7 4 40.5 4C49.7 4 58 10.7 58 21.5C58 40 32 57 32 57Z"
            fill="white"
          />
          <circle cx="55" cy="22" r="8.5" fill="black" />
        </mask>
        <rect width="64" height="64" fill="currentColor" mask={`url(#${id})`} />
        <circle cx="61.5" cy="30" r="2" fill="currentColor" />
      </svg>
      {withWordmark && (
        <span className="logo-wordmark">
          love<em>food</em>
        </span>
      )}
    </span>
  );
}
