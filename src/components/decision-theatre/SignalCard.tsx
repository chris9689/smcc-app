import { motion } from 'framer-motion';
import type { Signal } from '@/types';
import { signalAssembly } from '@/animations/variants';
import { cn } from '@/hooks/utils';

const categoryTone: Record<Signal['category'], string> = {
  behaviour: 'bg-rakuten-red/10 text-rakuten-red',
  context: 'bg-mc-orange/12 text-[#C24A00]',
  membership: 'bg-black/[0.06] text-ink',
  intent: 'bg-success/12 text-success',
};

/** A single approved signal chip used in the Decision Theatre assembly. */
export function SignalCard({ signal }: { signal: Signal }) {
  return (
    <motion.div
      variants={signalAssembly}
      className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card ring-1 ring-black/[0.03]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-canvas text-xl" aria-hidden>
        {signal.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">{signal.label}</p>
        <p className="line-clamp-1 text-xs text-muted">{signal.detail}</p>
      </div>
      <span
        className={cn(
          'shrink-0 rounded-full px-2 py-1 text-[10px] font-bold capitalize',
          categoryTone[signal.category],
        )}
      >
        {signal.category}
      </span>
    </motion.div>
  );
}
