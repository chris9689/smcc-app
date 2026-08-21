import type { ReactNode } from 'react';
import { cn } from '@/hooks/utils';

type Tone = 'red' | 'orange' | 'green' | 'amber' | 'neutral' | 'mastercard';

const toneClasses: Record<Tone, string> = {
  red: 'bg-rakuten-red/10 text-rakuten-red',
  orange: 'bg-mc-orange/12 text-[#C24A00]',
  green: 'bg-success/12 text-success',
  amber: 'bg-warning/12 text-warning',
  neutral: 'bg-black/[0.06] text-muted',
  mastercard: 'bg-black/[0.04] text-ink',
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  icon?: ReactNode;
}

/** Small status pill. Communicates status with text + optional icon, not colour alone. */
export function Badge({ children, tone = 'neutral', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** A compact visual mark evoking a dual-circle payment scheme (non-branded). */
export function SchemeMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('relative inline-flex h-5 w-9 items-center', className)}
    >
      <span className="absolute left-0 h-5 w-5 rounded-full bg-mc-red" />
      <span className="absolute left-3 h-5 w-5 rounded-full bg-mc-orange/90 mix-blend-multiply" />
    </span>
  );
}
