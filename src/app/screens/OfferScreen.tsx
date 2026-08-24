import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { CheckoutModal } from '@/components/shopping/CheckoutModal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { formatYen } from '@/hooks/utils';
import {
  marketplaceProducts,
  museProductById,
  recommendedProductIdsByUser,
  vPointsFor,
  type MuseProduct,
} from '@/mock-data/muse';

/** The unified narrative: any incentive, whatever its source, in one place. */
const sources = [
  { icon: 'storefront', title: 'Merchant-funded', detail: 'Cashback funded by brands & partners' },
  { icon: 'account_balance', title: 'Card programme', detail: 'SMCC card-linked cashback & benefits' },
  { icon: 'flight', title: 'Travel & marketplace', detail: 'Travel, dining and partner offers' },
];

/**
 * Chapter 3 — Featured cashback offer. A spotlight product from the
 * marketplace with its cashback and V Points, plus the unified-source story.
 */
export function OfferScreen() {
  const { appUser, goToChapter } = useDemo();
  const [cart, setCart] = useState<MuseProduct | null>(null);

  const ids = recommendedProductIdsByUser[appUser] ?? [];
  const featured = museProductById(ids[0]) ?? marketplaceProducts[0];
  const more = ids
    .slice(1, 4)
    .map(museProductById)
    .filter((p): p is MuseProduct => Boolean(p));

  const cashbackYen = Math.round((featured.price * featured.cashbackPct) / 100);

  return (
    <Screen chapterId={3}>
      <div className="flex flex-col gap-5 pt-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Featured cashback offer</p>
          <h2 className="font-heading text-2xl font-bold text-on-surface">This week's top pick</h2>
        </div>

        {/* Featured offer card */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-card"
        >
          <div className="relative">
            <span className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-surface-container-low text-6xl">
              {featured.emoji}
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </span>
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink backdrop-blur-sm">
              {featured.brand}
            </span>
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <Icon name="savings" filled className="text-[14px]" />
              {featured.cashbackPct}% cashback
            </span>
          </div>

          <div className="p-5">
            <h3 className="font-heading text-xl font-bold text-on-surface">{featured.name}</h3>
            <p className="mt-1 text-sm text-on-surface-variant">{featured.blurb}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-primary/[0.05] p-3">
                <Icon name="savings" filled className="text-primary" />
                <div>
                  <p className="font-heading text-sm font-bold text-primary">+{formatYen(cashbackYen)}</p>
                  <p className="text-[10px] text-on-surface-variant">Cashback back</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary-fixed/40 p-3">
                <Icon name="account_balance_wallet" filled className="text-secondary" />
                <div>
                  <p className="font-heading text-sm font-bold text-secondary">+{vPointsFor(featured.price).toLocaleString()}</p>
                  <p className="text-[10px] text-on-surface-variant">V Points earned</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-heading text-xl font-bold text-on-surface">{formatYen(featured.price)}</p>
              <span className="text-xs text-on-surface-variant">No minimum spend</span>
            </div>

            <Button fullWidth size="lg" className="mt-4" onClick={() => setCart(featured)}>
              Buy &amp; earn cashback
            </Button>
            <button
              type="button"
              onClick={() => goToChapter(2)}
              className="mt-2 flex w-full items-center justify-center gap-2 py-2 font-heading text-sm font-bold text-on-surface"
            >
              <Icon name="storefront" className="text-lg" />
              Browse the marketplace
            </button>
          </div>
        </motion.section>

        {/* Unified sources — any incentive, one experience */}
        <section>
          <h3 className="mb-1 font-heading text-lg font-bold text-on-surface">Any offer, one experience</h3>
          <p className="mb-3 text-sm text-on-surface-variant">
            Cashback, rewards and benefits from every source — surfaced and personalised in one place.
          </p>
          <div className="flex flex-col gap-2">
            {sources.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                  <Icon name={s.icon} filled />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold text-on-surface">{s.title}</p>
                  <p className="text-xs text-on-surface-variant">{s.detail}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Cashback</span>
              </div>
            ))}
          </div>
        </section>

        {/* More cashback picks */}
        {more.length > 0 && (
          <section className="flex flex-col gap-2">
            <h3 className="font-heading text-base font-bold text-on-surface">More cashback picks</h3>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {more.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCart(p)}
                  aria-label={`Buy ${p.name}`}
                  className="w-36 shrink-0 overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest text-left shadow-card transition-transform active:scale-95"
                >
                  <div className="relative">
                    <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-surface-container-low text-4xl">
                      {p.emoji}
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </span>
                    <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                      <Icon name="savings" filled className="text-[12px]" />
                      {p.cashbackPct}%
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="line-clamp-1 font-heading text-xs font-bold text-on-surface">{p.name}</p>
                    <p className="mt-0.5 font-heading text-sm font-bold text-primary">{formatYen(p.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <Button variant="outline" fullWidth onClick={() => goToChapter(4)}>
          Continue
        </Button>

        <Disclaimer>
          Offer availability and cashback are illustrative and subject to programme rules.
        </Disclaimer>
      </div>

      <CheckoutModal product={cart} onClose={() => setCart(null)} />
    </Screen>
  );
}
