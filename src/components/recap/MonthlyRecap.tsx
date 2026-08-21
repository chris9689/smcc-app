import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Card';
import { settings } from '@/mock-data/settings';

/** Monthly loyalty recap: progress, metrics and next recommended action. */
export function MonthlyRecap() {
  const { loyalty, goToChapter } = useDemo();

  return (
    <div className="flex flex-col gap-5 pt-2">
      <h2 className="font-heading text-2xl font-bold text-on-surface">
        Your monthly loyalty progress
      </h2>

      {/* Status card */}
      <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Current status</p>
            <h3 className="mt-1 font-heading text-2xl font-bold text-on-surface">
              {loyalty.rank} Member
            </h3>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-fixed">
            <Icon name="workspace_premium" filled className="text-primary" />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-on-surface-variant">{loyalty.progressToNext}% to next milestone</span>
          <span className="font-heading font-bold text-primary">Level Up Soon</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <motion.div
            className="loyalty-gradient h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${loyalty.progressToNext}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-3 text-sm italic text-on-surface-variant">
          Maintain your activity to secure your benefits for next month.
        </p>
      </section>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 text-center shadow-card">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container">
            <Icon name="bar_chart" className="text-on-surface-variant" />
          </span>
          <p className="mt-1 text-xs text-on-surface-variant">Activities counted</p>
          <p className="font-heading text-3xl font-bold text-on-surface">
            {loyalty.monthlyActivitiesCounted}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 text-center shadow-card">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container">
            <Icon name="savings" className="text-tertiary-container" />
          </span>
          <p className="mt-1 text-xs text-on-surface-variant">Points expected</p>
          <p className="font-heading text-3xl font-bold text-on-surface">1,200</p>
        </div>
      </div>

      {/* Benefits row */}
      <button
        type="button"
        onClick={() => goToChapter(6)}
        className="flex items-center gap-4 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 text-left shadow-card"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
          <Icon name="redeem" filled />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-bold text-on-surface">4 Benefits available</p>
          <p className="text-sm text-on-surface-variant">Exclusive rewards ready for you</p>
        </div>
        <Icon name="chevron_right" className="text-on-surface-variant" />
      </button>

      {/* Recommended next action */}
      <section>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">
          Recommended
        </p>
        <button
          type="button"
          onClick={() => goToChapter(3)}
          className="flex w-full items-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-4 text-left"
        >
          <Icon name="tips_and_updates" filled className="text-primary" />
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-semibold text-on-surface">
              Next action recommended
            </p>
            <p className="font-heading text-sm font-bold text-primary">
              Review your saved home offer
            </p>
          </div>
          <Icon name="arrow_forward" className="text-on-surface-variant" />
        </button>
      </section>

      <div className="flex flex-col gap-2">
        <Button size="lg" fullWidth onClick={() => goToChapter(6)}>
          View benefits
        </Button>
        <Button variant="outline" size="md" fullWidth onClick={() => goToChapter(4)}>
          History &amp; Insights
        </Button>
      </div>

      <Disclaimer>
        {settings.disclaimers.pointsTiming} {settings.disclaimers.illustrative}
      </Disclaimer>
    </div>
  );
}
