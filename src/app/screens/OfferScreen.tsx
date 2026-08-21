import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { OfferConfirmation } from '@/components/offers/OfferConfirmation';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { householdOffer } from '@/mock-data/offers';

const categories = [
  { icon: 'kitchen', tint: 'bg-primary-fixed', color: 'text-primary', title: 'Home Appliances', detail: 'Refrigerators, Ovens & Cookware' },
  { icon: 'tv', tint: 'bg-tertiary-fixed', color: 'text-tertiary-container', title: 'Televisions', detail: '4K Smart TVs & OLED Displays' },
  { icon: 'light', tint: 'bg-surface-container-high', color: 'text-on-surface-variant', title: 'Lighting', detail: 'Designer Lamps & Smart Systems' },
];

/**
 * Chapter 4 — Contextual in-app offer.
 * Reads as a normal consumer offer page. No decisioning language is shown.
 */
export function OfferScreen() {
  const { goToChapter, offerAccepted, acceptOffer, resetOffer } = useDemo();

  return (
    <Screen chapterId={3}>
      <div className="flex flex-col gap-5 pt-2">
        {/* Contextual offer card */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-card"
        >
          <div className="relative">
            <img src="/products/40_inch_smarttv.webp" alt="" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white">
              SMCC Mall
            </span>
            <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-float">
              <Icon name="local_offer" filled />
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-heading text-xl font-bold text-on-surface">
              Extra cashback with your SMCC card
            </h3>
            <p className="mt-1 text-sm text-on-surface-variant">
              Enjoy bonus cashback on home appliances and televisions when you pay with your SMCC
              card. No minimum spend required.
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed">
                <Icon name="savings" filled className="text-primary" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-primary">Up to 10% cashback</p>
                <p className="text-xs text-on-surface-variant">On eligible home appliances and TVs</p>
              </div>
            </div>

            <Button fullWidth size="lg" className="mt-4" onClick={acceptOffer}>
              Save offer
            </Button>
            <button
              type="button"
              onClick={() => goToChapter(3)}
              className="mt-2 flex w-full items-center justify-center gap-2 py-2 font-heading text-sm font-bold text-on-surface"
            >
              <Icon name="shopping_bag" className="text-lg" />
              Continue shopping
            </button>
          </div>
        </motion.section>

        {/* Eligible household categories */}
        <section>
          <h3 className="mb-3 font-heading text-lg font-bold text-on-surface">
            Eligible household categories
          </h3>
          <div className="flex flex-col gap-3">
            {categories.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={acceptOffer}
                className="flex items-center gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3.5 text-left shadow-card"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-lg ${c.tint}`}>
                  <Icon name={c.icon} filled className={c.color} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold text-on-surface">{c.title}</p>
                  <p className="text-xs text-on-surface-variant">{c.detail}</p>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant" />
              </button>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-3">
          <Disclaimer className="italic">
            Offer availability and benefits are subject to programme rules. {householdOffer.disclaimer}
          </Disclaimer>
        </div>

        <Button variant="outline" fullWidth onClick={() => goToChapter(4)}>
          Continue
        </Button>
      </div>

      <OfferConfirmation
        open={offerAccepted}
        onContinueShopping={() => {
          resetOffer();
          goToChapter(2);
        }}
        onViewSavedBenefits={() => {
          resetOffer();
          goToChapter(6);
        }}
        title={householdOffer.title}
      />
    </Screen>
  );
}
