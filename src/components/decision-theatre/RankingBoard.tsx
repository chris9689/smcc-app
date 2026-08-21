import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useDemo } from '@/app/DemoContext';
import { rankOffers } from '@/services/decisionEngine';
import { winnerHighlight } from '@/animations/variants';
import { cn } from '@/hooks/utils';

/**
 * Displays the mock decision engine's ranked offers as animated bars,
 * highlighting the winning action. Re-runs when persona or replay changes.
 */
export function RankingBoard({ replayKey }: { replayKey?: number }) {
  const { persona } = useDemo();
  const ranked = useMemo(() => rankOffers(persona), [persona, replayKey]);
  const max = ranked[0]?.score ?? 100;

  return (
    <div key={replayKey} className="space-y-2.5">
      {ranked.map((item, index) => {
        const isWinner = index === 0;
        return (
          <motion.div
            key={item.offer.id}
            variants={isWinner ? winnerHighlight : undefined}
            initial={isWinner ? 'initial' : { opacity: 0, y: 10 }}
            animate={isWinner ? 'animate' : { opacity: 1, y: 0 }}
            transition={isWinner ? undefined : { delay: 0.1 + index * 0.08 }}
            className={cn(
              'rounded-2xl p-3.5 ring-1',
              isWinner
                ? 'bg-white ring-rakuten-red/30'
                : 'bg-white/70 ring-black/[0.04]',
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                {item.offer.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-bold text-ink">{item.offer.title}</p>
                <p className="line-clamp-1 text-[11px] text-muted">{item.offer.subtitle}</p>
              </div>
              {isWinner && (
                <span className="shrink-0 rounded-full brand-gradient px-2 py-1 text-[10px] font-black text-white">
                  🏆 Winner
                </span>
              )}
              <span className="w-9 shrink-0 text-right text-sm font-extrabold text-ink">
                {item.score}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className={cn('h-full rounded-full', isWinner ? 'brand-gradient' : 'bg-black/25')}
                initial={{ width: 0 }}
                animate={{ width: `${(item.score / max) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.08 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
