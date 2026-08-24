import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { cn } from '@/hooks/utils';
import { cashbackDataFor, type CashbackItem } from '@/mock-data/cashback';
import { settings } from '@/mock-data/settings';

const statusStyles: Record<CashbackItem['status'], string> = {
  Active: 'bg-primary/10 text-primary',
  Pending: 'bg-tertiary-fixed text-tertiary',
  Earned: 'bg-success/15 text-success',
};

/** Chapter 6 — "Your cashback": activated cashback, benefits and V Points. */
export function SavedBenefitsScreen() {
  const { appUser, goToChapter } = useDemo();
  const data = cashbackDataFor(appUser);

  return (
    <Screen chapterId={6}>
      <div className="flex flex-col gap-5 pt-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-on-surface">Your cashback</h2>
          <p className="text-sm text-on-surface-variant">
            Cashback and benefits you've activated, all in one place.
          </p>
        </div>

        {/* Summary hero */}
        <section className="brand-gradient relative overflow-hidden rounded-2xl p-5 text-white shadow-card">
          <Icon
            name="savings"
            filled
            className="pointer-events-none absolute -right-3 -top-3 text-[100px] opacity-20"
          />
          <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
            Cashback earned this month
          </p>
          <p className="mt-1 font-heading text-4xl font-bold">{data.earnedThisMonth}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 rounded-xl bg-white/15 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide opacity-90">Pending</p>
              <p className="font-heading text-base font-bold">{data.pending}</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/15 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide opacity-90">V Points</p>
              <p className="font-heading text-base font-bold">{data.vPoints}</p>
            </div>
          </div>
        </section>

        {/* Activated cashback + benefits */}
        <section className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-bold text-on-surface">Activated & saved</h3>
          {data.items.map((item) => (
            <div
              key={`${item.merchant}-${item.title}`}
              className="flex items-center gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3 shadow-card"
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-container-low text-on-surface-variant">
                {item.image ? (
                  <img src={item.image} alt={item.merchant} className="h-full w-full object-cover" />
                ) : (
                  <Icon name={item.icon ?? 'savings'} filled className="text-2xl" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-heading text-sm font-bold leading-tight text-on-surface">
                  {item.title}
                </p>
                {item.logo ? (
                  <img src={item.logo} alt={item.merchant} className="mt-1 h-4 w-auto object-contain" />
                ) : (
                  <p className="mt-0.5 text-[11px] text-on-surface-variant">{item.merchant}</p>
                )}
                <p className="mt-0.5 text-[11px] leading-snug text-on-surface-variant">{item.note}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-heading text-sm font-extrabold text-primary">{item.amount}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide',
                    statusStyles[item.status],
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Next-step nudge */}
        <button
          type="button"
          onClick={() => goToChapter(data.nudge.chapter)}
          className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl brand-gradient text-white">
            <Icon name="storefront" filled className="text-xl" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-bold text-on-surface">{data.nudge.title}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-on-surface-variant">{data.nudge.body}</p>
          </div>
          <span className="flex items-center gap-1 shrink-0 text-xs font-bold text-primary">
            {data.nudge.cta}
            <Icon name="chevron_right" className="text-sm" />
          </span>
        </button>

        <Disclaimer>{settings.disclaimers.programmeRules}</Disclaimer>
      </div>
    </Screen>
  );
}
