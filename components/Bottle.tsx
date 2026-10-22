export default function Bottle({ hue, label, variant = "bottle" }: { hue: string; label: string; variant?: "bottle" | "box" }) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={label} className="h-full w-full">
      <defs>
        <linearGradient id={`g-${hue.slice(1)}`} x1="0" x2="1">
          <stop offset="0" stopColor={hue} stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="222" rx="62" ry="8" fill="#4A2878" opacity=".12" />
      {variant === "box" ? (
        <g>
          <rect x="40" y="90" width="120" height="124" rx="8" fill={`url(#g-${hue.slice(1)})`} stroke="#B8964E" strokeWidth="1.5" />
          <rect x="40" y="90" width="120" height="22" rx="8" fill="#fff" opacity=".5" />
          <rect x="94" y="90" width="12" height="124" fill="#B8964E" opacity=".85" />
          <path d="M100 90c-16-24-34-14-22-2 8 8 22 2 22 2zm0 0c16-24 34-14 22-2-8 8-22 2-22 2z" fill="none" stroke="#B8964E" strokeWidth="3" />
        </g>
      ) : (
        <g>
          <rect x="88" y="34" width="24" height="30" rx="3" fill="#B8964E" />
          <rect x="94" y="62" width="12" height="12" fill="#E3D3A8" />
          <rect x="52" y="74" width="96" height="140" rx="22" fill={`url(#g-${hue.slice(1)})`} stroke="#fff" strokeWidth="2" />
          <rect x="68" y="120" width="64" height="48" rx="6" fill="#fff" opacity=".8" />
          <rect x="78" y="134" width="44" height="3" fill="#B8964E" />
          <rect x="84" y="144" width="32" height="2" fill="#6B4A98" opacity=".5" />
          <path d="M64 92c0 40 2 90 6 112" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" fill="none" />
        </g>
      )}
    </svg>
  );
}