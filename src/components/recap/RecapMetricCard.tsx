import { motion } from 'framer-motion';
import type { RecapMetric } from '@/types';
import { cardEntrance } from '@/animations/variants';
import { Card } from '@/components/ui/Card';
import { cn } from '@/hooks/utils';

const accentClasses: Record<RecapMetric['accent'], string> = {
  red: 'text-rakuten-red',
  orange: 'text-[#C24A00]',
  green: 'text-success',
  amber: 'text-warning',
};

/** Single metric tile in the monthly recap grid. */
export function RecapMetricCard({ metric }: { metric: RecapMetric }) {
  return (
    <motion.div variants={cardEntrance}>
      <Card className="h-full p-3.5">
        <span className="text-xl" aria-hidden>
          {metric.icon}
        </span>
        <p className={cn('mt-1 text-2xl font-extrabold', accentClasses[metric.accent])}>
          {metric.value}
        </p>
        <p className="text-xs font-bold text-ink">{metric.label}</p>
        <p className="text-[11px] leading-snug text-muted">{metric.caption}</p>
      </Card>
    </motion.div>
  );
}
