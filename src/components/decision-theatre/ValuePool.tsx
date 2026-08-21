import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, cardEntrance } from '@/animations/variants';
import { Card } from '@/components/ui/Card';
import { cn } from '@/hooks/utils';

type PoolStatus = 'eligible' | 'available' | 'notPriority';

interface ValuePoolItem {
  id: string;
  title: string;
  detail: string;
  icon: string;
  status: PoolStatus;
}

const pool: ValuePoolItem[] = [
  {
    id: 'vp-merchant',
    title: 'Partner merchant offers',
    detail: 'Eligible SMCC Mall merchant value for home & electronics.',
    icon: '🏬',
    status: 'eligible',
  },
  {
    id: 'vp-happy',
    title: 'V Point program mechanics',
    detail: 'Status progress and qualifying activity value.',
    icon: '⭐',
    status: 'available',
  },
  {
    id: 'vp-points',
    title: 'V Points utility',
    detail: 'Ways points may be used, subject to programme rules.',
    icon: '✨',
    status: 'notPriority',
  },
  {
    id: 'vp-mastercard',
    title: 'Card-linked cashback',
    detail: 'Personalised value unlocked with SMCC card.',
    icon: '💳',
    status: 'eligible',
  },
];

const statusLabel: Record<PoolStatus, string> = {
  eligible: '✓ Eligible',
  available: '✓ Available',
  notPriority: 'Not priority now',
};

const statusTone: Record<PoolStatus, string> = {
  eligible: 'bg-success/12 text-success',
  available: 'bg-mc-orange/12 text-[#C24A00]',
  notPriority: 'bg-black/[0.06] text-muted',
};

/**
 * Grid of candidate value sources. Each card first shows a "Checking…" state,
 * then resolves to its eligibility status so the audience sees the Hub
 * assembling and evaluating value before deciding.
 */
export function ValuePool({ replayKey }: { replayKey?: number }) {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(false);
    const t = window.setTimeout(() => setResolved(true), 1100);
    return () => window.clearTimeout(t);
  }, [replayKey]);

  return (
    <motion.div
      key={replayKey}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-3"
    >
      {pool.map((item) => (
        <motion.div key={item.id} variants={cardEntrance}>
          <Card className="flex h-full flex-col p-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl brand-gradient-soft text-xl" aria-hidden>
              {item.icon}
            </span>
            <p className="mt-2 text-sm font-bold leading-tight text-ink">{item.title}</p>
            <p className="mt-1 flex-1 text-[11px] leading-snug text-muted">{item.detail}</p>
            <div className="mt-2">
              {!resolved ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] px-2 py-1 text-[10px] font-bold text-muted">
                  <motion.span
                    className="inline-block h-2.5 w-2.5 rounded-full border-2 border-rakuten-red border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    aria-hidden
                  />
                  Checking…
                </span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    'inline-block rounded-full px-2 py-1 text-[10px] font-bold',
                    statusTone[item.status],
                  )}
                >
                  {statusLabel[item.status]}
                </motion.span>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
