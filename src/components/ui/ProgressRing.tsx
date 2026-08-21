import { useReducedMotion } from 'framer-motion';

interface ProgressRingProps {
  /** 0-100 */
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}

/** Circular progress indicator with animated stroke and centre label. */
export function ProgressRing({
  value,
  size = 96,
  stroke = 9,
  label,
  sublabel,
}: ProgressRingProps) {
  const reduce = useReducedMotion();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped}% ${label ?? 'progress'}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(23,23,23,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: reduce ? 'none' : 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#920000" />
            <stop offset="60%" stopColor="#bf0000" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading text-lg font-extrabold text-on-surface">{label ?? `${clamped}%`}</span>
        {sublabel && <span className="text-[10px] font-medium text-on-surface-variant">{sublabel}</span>}
      </div>
    </div>
  );
}
