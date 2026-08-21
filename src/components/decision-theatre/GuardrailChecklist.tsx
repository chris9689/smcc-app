import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { guardrails } from '@/mock-data/analytics';
import { staggerContainer, checkItem } from '@/animations/variants';
import { Card } from '@/components/ui/Card';
import { cn } from '@/hooks/utils';

/**
 * Animated checklist that evaluates guardrails for the active persona.
 * Only when all pass does usable value get shown to the customer.
 */
export function GuardrailChecklist({ replayKey }: { replayKey?: number }) {
  const { persona } = useDemo();

  return (
    <motion.ul
      key={replayKey}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-2.5"
    >
      {guardrails.map((g) => {
        const passes = g.passes(persona);
        return (
          <motion.li key={g.id} variants={checkItem}>
            <Card
              className={cn(
                'flex items-center gap-3 p-3.5',
                !passes && 'ring-warning/40',
              )}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.15 }}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white',
                  passes ? 'bg-success' : 'bg-warning',
                )}
                aria-hidden
              >
                {passes ? '✓' : '!'}
              </motion.span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{g.label}</p>
                <p className="text-xs text-muted">{g.detail}</p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-1 text-[10px] font-bold',
                  passes ? 'bg-success/12 text-success' : 'bg-warning/12 text-warning',
                )}
              >
                {passes ? 'Pass' : 'Blocked'}
              </span>
            </Card>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
