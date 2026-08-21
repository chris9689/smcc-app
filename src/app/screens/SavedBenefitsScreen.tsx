import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { householdOffer } from '@/mock-data/offers';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { settings } from '@/mock-data/settings';

/** Dedicated view for saved offers and benefits. */
export function SavedBenefitsScreen() {
  const { goToChapter } = useDemo();

  return (
    <Screen chapterId={6}>
      <div className="flex flex-col gap-4 pt-2">
        <h2 className="font-heading text-2xl font-bold text-on-surface">Your saved benefits</h2>
        <p className="text-sm text-on-surface-variant">
          Your household offer is ready and available whenever you need it.
        </p>

        <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
              <Icon name="bookmark" filled />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-base font-bold text-on-surface">{householdOffer.title}</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                Explore selected household value available with your SMCC card.
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button size="md" fullWidth onClick={() => goToChapter(2)}>
              Continue shopping
            </Button>
            <Button variant="outline" size="md" fullWidth onClick={() => goToChapter(4)}>
              View points options
            </Button>
          </div>
        </section>

        <button
          type="button"
          onClick={() => goToChapter(5)}
          className="flex items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 text-left shadow-card"
        >
          <div>
            <p className="font-heading text-base font-bold text-on-surface">See next recommended action</p>
            <p className="text-sm text-on-surface-variant">View your monthly loyalty progress</p>
          </div>
          <Icon name="chevron_right" className="text-on-surface-variant" />
        </button>

        <Disclaimer>{settings.disclaimers.programmeRules}</Disclaimer>
      </div>
    </Screen>
  );
}
