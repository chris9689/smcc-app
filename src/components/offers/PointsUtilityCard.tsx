import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { staggerContainer, cardEntrance } from '@/animations/variants';

interface UtilityItem {
  icon: string;
  label: string;
}

const utilities: UtilityItem[] = [
  { icon: 'account_balance', label: 'Selected banking payments' },
  { icon: 'currency_exchange', label: 'Transfer-related services' },
  { icon: 'receipt_long', label: 'Eligible fee-related value' },
  { icon: 'rocket_launch', label: 'Future recommended uses' },
];

/** Points education content: hero, utility grid, CTA and expert tip. */
export function PointsUtilityCard() {
  const { user } = useDemo();

  return (
    <div className="flex flex-col gap-5">
      {/* Hero */}
      <div className="loyalty-gradient relative overflow-hidden rounded-2xl p-5 text-white shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
          Points overview
        </p>
        <p className="mt-1 text-xs opacity-90">
          Available balance{' '}
          <span className="font-heading font-bold">{user.pointsBalance.toLocaleString()} Points</span>
        </p>
        <h2 className="mt-8 font-heading text-2xl font-bold leading-tight">
          Your points can work harder
        </h2>
        <Icon
          name="savings"
          filled
          className="pointer-events-none absolute -right-3 -top-3 text-[110px] opacity-20"
        />
      </div>

      <p className="text-base text-on-surface-variant">
        V Points can help with selected services and payments, subject to programme rules. See
        where your points may be useful next.
      </p>

      <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
        Ways to use your points
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-4"
      >
        {utilities.map((u) => (
          <motion.div
            key={u.label}
            variants={cardEntrance}
            className="flex flex-col gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-card"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed">
              <Icon name={u.icon} className="text-primary" />
            </span>
            <p className="font-heading text-sm font-bold leading-tight text-on-surface">{u.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <Button fullWidth size="lg">
        Explore points options
        <Icon name="arrow_forward" className="text-lg" />
      </Button>

      <div className="rounded-2xl bg-tertiary-fixed/50 p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-tertiary">
          <Icon name="info" className="text-[16px]" /> Expert tip
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          Some benefits and counts are reflected after programme processing windows.
        </p>
      </div>
    </div>
  );
}
