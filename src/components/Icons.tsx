/**
 * Icons.tsx — Inline SVG icon library for MedAdvise AI
 * All icons are MIT-licensed Heroicons (heroicons.com) adapted for this project.
 * Usage: <BoneIcon size={24} className="my-class" />
 */

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

const defaults = (props: IconProps) => ({
  width: props.size ?? 24,
  height: props.size ?? 24,
  fill: 'none',
  stroke: props.color ?? 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: props.className,
  style: props.style,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
});

/** Stethoscope — brand / medical indicator */
export function StethoscopeIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0v3.75a4.125 4.125 0 1 1-8.25 0v-3.75Z" />
      <path d="M12.75 6.375v5.25a6 6 0 0 0 12 0v-3" />
      <circle cx="21.75" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Bone / X-ray — KL grading feature */
export function BoneIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9.75 3.75a3 3 0 0 0-3 3c0 .92.418 1.74 1.075 2.286L4.5 12.36A3 3 0 1 0 8.654 16.5l3.324-3.325A3 3 0 1 0 15.75 8.25a2.993 2.993 0 0 0-1.5.404L10.925 5.32A3.001 3.001 0 0 0 9.75 3.75Z" />
    </svg>
  );
}

/** Lightning bolt — instant results / speed */
export function BoltIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  );
}

/** CPU / chip — AI / machine learning */
export function CpuChipIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
  );
}

/** Chart bar — research / metrics */
export function ChartBarIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

/** Academic cap — thesis / research */
export function AcademicCapIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}

/** Exclamation triangle — warnings */
export function ExclamationTriangleIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
}

/** Shield check — medical authority / disclaimer */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

/** Chat bubble — text consultation */
export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  );
}

/** X mark — close / dismiss */
export function XMarkIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

/** Paper airplane — send message */
export function PaperAirplaneIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  );
}

/** Magnifying glass / microscope — analysis */
export function MicroscopeIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

/** Check circle — no OA detected / success */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

/** Arrow right on rectangle — logout */
export function LogoutIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  );
}

/** Plus — new consultation */
export function PlusIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

/** X-ray frame — X-ray consultation type */
export function XRayIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

/** Beaker — science / research */
export function BeakerIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L4.2 13.9m15.6 1.4-1.415 4.244A2.25 2.25 0 0 1 16.243 21H7.757a2.25 2.25 0 0 1-2.142-1.356L4.2 15.3m15.6 0-3.4-9.3M4.2 15.3l3.4-9.3M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
  );
}

/** Information circle — info / details */
export function InformationCircleIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  );
}

/** Arrow right — navigation */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

/** Arrow left — navigation */
export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

/** Arrows pointing out — fullscreen */
export function ArrowsPointingOutIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

/** Arrows pointing in — exit fullscreen */
export function ArrowsPointingInIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
  );
}

/** Presentation chart — slides */
export function PresentationChartIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
  );
}

/** Clipboard document — consultation notes */
export function ClipboardDocumentIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
  );
}

/** Identification badge — model info */
export function IdentificationIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
    </svg>
  );
}

/** Clipboard list — clinical details */
export function ClipboardListIcon(props: IconProps) {
  return (
    <svg {...defaults(props)}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeWidth={1.5} />
    </svg>
  );
}
