import { motion } from 'framer-motion';
import type { RankedOffer } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface NextActionCardProps {
  ranked: RankedOffer;
  onAction?: () => void;
}

/** Recommended next action card shown at the end of the monthly recap. */
export function NextActionCard({ ranked, onAction }: NextActionCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-2xl text-white" aria-hidden>
            {ranked.offer.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-rakuten-red">
              Next recommended action
            </p>
            <p className="text-sm font-extrabold leading-tight text-ink">{ranked.offer.title}</p>
            <p className="line-clamp-1 text-xs text-muted">{ranked.offer.subtitle}</p>
          </div>
        </div>
        <Button fullWidth size="md" className="mt-3" onClick={onAction}>
          Continue this action
        </Button>
      </Card>
    </motion.div>
  );
}
