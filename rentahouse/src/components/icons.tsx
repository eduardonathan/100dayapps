import type { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1v-4.5a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5V20a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function IconUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function IconCash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="6" width="19" height="12" rx="2.2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 6.5v0M18 17.5v0" />
    </svg>
  );
}

export function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconTag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M11.5 3.5h5a2 2 0 0 1 2 2v5a2 2 0 0 1-.6 1.4l-8 8a2 2 0 0 1-2.8 0l-5-5a2 2 0 0 1 0-2.8l8-8a2 2 0 0 1 1.4-.6Z" />
      <circle cx="15" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconEdit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 17.5V20h2.5L18.4 8.1a1.8 1.8 0 0 0 0-2.5l-.5-.5a1.8 1.8 0 0 0-2.5 0z" />
      <path d="M13.5 6.5 17.5 10.5" />
    </svg>
  );
}

export function IconTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 7h15" />
      <path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
      <path d="M6.5 7l.7 12a2 2 0 0 0 2 1.9h5.6a2 2 0 0 0 2-1.9L17.5 7" />
      <path d="M10.3 11v6M13.7 11v6" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconAlert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} width={14} height={14}>
      <path d="M10.9 3.6 2.7 18a1.5 1.5 0 0 0 1.3 2.2h16.4a1.5 1.5 0 0 0 1.3-2.2L13.1 3.6a1.3 1.3 0 0 0-2.2 0Z" />
      <path d="M12 9.5v4.2" />
      <circle cx="12" cy="17" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconInbox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} width={40} height={40} strokeWidth={1.4}>
      <path d="M4 12.5 6.8 5h10.4l2.8 7.5" />
      <path d="M4 12.5h5l1 2.5h4.2l1-2.5H20V18a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18Z" />
    </svg>
  );
}
