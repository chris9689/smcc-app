import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';
import { cardEntrance } from '@/animations/variants';

/** White loyalty status card with medal, progress and next-benefit hint. */
export function LoyaltyStatusCard() {
  const { loyalty, isLinked } = useDemo();
  const remaining = Math.max(
    0,
    loyalty.monthlyActivitiesTarget - loyalty.monthlyActivitiesCounted,
  );

  return (
    <motion.section
      variants={cardEntrance}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-4 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[11px] font-medium text-on-surface-variant">
            Your SMCC loyalty status today
          </p>
          <h3 className="mt-1 font-heading text-xl font-bold text-primary">
            {isLinked ? `${loyalty.rank} Member` : 'Not linked'}
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-fixed">
          <Icon name="military_tech" filled className="text-on-tertiary-fixed" />
        </div>
      </div>

      {isLinked && (
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between">
            <p className="text-sm text-on-surface-variant">You're close to your next benefit</p>
            <p className="font-heading text-[11px] font-bold text-primary">
              {loyalty.progressToNext}%
            </p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${loyalty.progressToNext}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-[11px] text-outline">
            Only {remaining} more qualifying activities until {loyalty.nextRank} status.
          </p>
        </div>
      )}
    </motion.section>
  );
}
