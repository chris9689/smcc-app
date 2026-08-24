import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { PointsUtilityCard } from '@/components/offers/PointsUtilityCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** Chapter 5 — Points utility. */
export function PointsScreen() {
  const { goToChapter } = useDemo();
  return (
    <Screen chapterId={4}>
      <div className="pt-2">
        <PointsUtilityCard />

        {/* Earn-as-you-shop nudge — ties V Points to the marketplace */}
        <button
          type="button"
          onClick={() => goToChapter(2)}
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary-fixed/40 p-4 text-left shadow-card transition-transform active:scale-[0.98]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl brand-gradient text-white">
            <Icon name="storefront" filled className="text-xl" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-bold text-on-surface">Earn V Points as you shop</p>
            <p className="mt-0.5 text-[12px] leading-snug text-on-surface-variant">
              Every marketplace purchase earns V Points on top of cashback.
            </p>
          </div>
          <Icon name="chevron_right" className="shrink-0 text-secondary" />
        </button>

        <Button variant="outline" className="mt-4" fullWidth onClick={() => goToChapter(5)}>
          View my monthly progress
        </Button>
      </div>
    </Screen>
  );
}
