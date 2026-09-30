import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { CardFace } from '@/components/loyalty/CardFace';
import { SearchBar } from '@/components/shopping/SearchBar';
import { PersonalizedFeed } from '@/components/shopping/PersonalizedFeed';
import { CheckoutModal } from '@/components/shopping/CheckoutModal';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { settings } from '@/mock-data/settings';
import type { MuseProduct } from '@/mock-data/muse';

/** Chapter 1 — Home / loyalty overview. */
export function StatusScreen() {
  const { user, goToChapter, appUser, appUserProfile, openWhy } = useDemo();
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<MuseProduct | null>(null);
  const { offers, gridOffers, gridTitle, spendingInsight, pointsNudge } = appUserProfile;

  const museProactive: Record<number, string> = {
    1: 'You’re still in your welcome period — want to see the cashback offers you can activate now, or ask how your card works?',
    2: 'You’re heading to Singapore — I’ve lined up travel cashback, things to do and dining picks for the trip.',
  };

  return (
    <Screen chapterId={1}>
      <div className="flex flex-col gap-6 pt-2">

        {/* Greeting */}
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-sm font-semibold text-secondary">
              {appUserProfile.greeting ?? 'Good morning'}, {appUserProfile.name.split(' ')[0]}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-on-surface">
              Welcome back.
            </h2>
            <p className="text-sm text-on-surface-variant">
              See personalised benefits available for you.
            </p>
          </div>
          <SearchBar value={query} onChange={setQuery} placeholder="Search SMCC cashback & offers" />
        </section>

        {/* Proactive SMCC Agent nudge — context-aware engagement */}
        <button
          type="button"
          onClick={() => goToChapter(7)}
          className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-3 text-left shadow-sm transition-transform active:scale-[0.98]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full brand-gradient text-white">
            <Icon name="auto_awesome" filled className="text-lg" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-xs font-bold text-primary">SMCC Agent</p>
            <p className="text-[12px] leading-snug text-on-surface">
              {museProactive[appUser] ?? museProactive[1]}
            </p>
          </div>
          <Icon name="chevron_right" className="shrink-0 text-primary" />
        </button>

        {/* Points balance card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="points-card relative flex flex-col gap-2 overflow-hidden rounded-2xl p-5 text-white shadow-sm"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[11px] font-medium uppercase tracking-widest opacity-90">
              Available balance
            </p>
            <CardFace name={appUserProfile.name} image={appUserProfile.cardImage} compact className="w-24 shrink-0 shadow-md ring-1 ring-white/30" />
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-heading text-3xl font-bold">
              {user.pointsBalance.toLocaleString()}
            </span>
            <span className="font-heading text-sm font-bold">Points</span>
          </div>
        </motion.section>

        {/* For you, right now — personalised feed that re-ranks live on context */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-on-surface">For you, right now</h3>
            </div>
            <button
              type="button"
              onClick={() => goToChapter(2)}
              className="shrink-0 text-sm font-semibold text-primary"
            >
              See All
            </button>
          </div>
          <PersonalizedFeed onSelect={setCart} />
        </section>

        {/* Recommended for you — the main targeted offer(s) for this app user */}
        {offers.map((offer, offerIndex) => (
          <section key={`${offer.header}-${offerIndex}`} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-on-surface">
                {offer.title}
              </h3>
              <button
                type="button"
                onClick={() => goToChapter(2)}
                className="shrink-0 text-sm font-semibold text-primary"
              >
                See All
              </button>
            </div>

            <div className="group relative w-full overflow-hidden rounded-2xl text-left shadow-card">
              <img
                src={offer.image}
                alt={offer.merchant}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Full-card tap target opens the "Why shown now" panel */}
              <button
                type="button"
                onClick={openWhy}
                className="absolute inset-0 z-10"
                aria-label="Why is this shown now?"
              />

              {/* Top-left: offer source badge */}
              {!offer.hideSource && (
                <div className="absolute left-3 top-3 z-20">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink backdrop-blur-sm">
                    {offer.source}
                  </span>
                </div>
              )}

              {/* Top-right: offer type pill */}
              <div className="absolute right-3 top-3 z-20">
                <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {offer.type === 'cashback' && <Icon name="savings" filled className="text-[13px]" />}
                  {offer.type}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 z-20 w-full text-white">
                <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="relative p-4">
                  {/* Logo row */}
                  {offer.logo && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-white/95 px-1.5 py-1 shadow-sm">
                        <img
                          src={offer.logo}
                          alt={offer.merchant}
                          className="h-5 w-auto object-contain"
                        />
                      </span>
                    </div>
                  )}

                  <h4 className="font-heading text-base font-bold leading-tight">
                    {offer.header}
                  </h4>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); goToChapter(offer.ctaChapter ?? 3); }}
                      className="relative z-30 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-ink"
                    >
                      {offer.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Offers grid — 2x2 (complements the main offer's category) */}
        <section className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-bold text-on-surface">
            {gridTitle ?? 'Offers for you'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {gridOffers.map((grid, i) => (
              <div
                key={`${grid.merchant}-${grid.title}-${i}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-card"
              >
                {/* Media / icon header */}
                <div className="relative flex h-20 shrink-0 items-center justify-center bg-surface-container-low">
                  {grid.image ? (
                    <img
                      src={grid.image}
                      alt={grid.merchant}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon
                      name={grid.icon ?? 'local_offer'}
                      className="text-3xl text-on-surface-variant"
                    />
                  )}
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <p className="line-clamp-2 min-h-[2.4rem] font-heading text-sm font-bold leading-tight text-on-surface">
                      {grid.title}
                    </p>
                    {grid.logo ? (
                      <img
                        src={grid.logo}
                        alt={grid.merchant}
                        className="mt-1 h-4 w-auto object-contain"
                      />
                    ) : (
                      <p className="mt-0.5 text-[11px] text-on-surface-variant">
                        {grid.merchant}
                      </p>
                    )}
                  </div>
                  <span className="mt-2 flex items-center gap-1 text-primary">
                    <span className="text-[11px] font-semibold">{grid.cta ?? 'View offers'}</span>
                    <Icon name="chevron_right" className="text-sm" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* V Points nudge — persona-specific (status earn vs. product cross-sell) */}
        <section className="overflow-hidden rounded-2xl border border-secondary/25 bg-secondary-fixed/40 p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl brand-gradient text-white">
              <Icon name={pointsNudge.icon} filled className="text-xl" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">
                {pointsNudge.eyebrow}
              </p>
              <p className="mt-0.5 font-heading text-sm font-bold text-on-surface">
                {pointsNudge.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                {pointsNudge.body}
              </p>
              <button
                type="button"
                onClick={() => goToChapter(4)}
                className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition-transform active:scale-95"
              >
                {pointsNudge.cta}
                <Icon name="arrow_forward" className="text-sm" />
              </button>
            </div>
          </div>
        </section>

        {/* Spending Insight card — moved below the offers, per-user copy */}
        <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-card">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Spending Insight</p>
          <p className="mt-1.5 text-sm leading-relaxed text-on-surface">
            {spendingInsight}
          </p>
          <button
            type="button"
            onClick={() => goToChapter(3)}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-primary"
          >
            Explore your member benefits
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </section>

        {/* Active benefits + Trends — bottom of page */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => goToChapter(6)}
            className="flex flex-col gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 text-left shadow-card transition-transform active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-fixed">
              <Icon name="card_giftcard" filled className="text-secondary" />
            </span>
            <div>
              <p className="font-heading text-xl font-bold text-on-surface">3</p>
              <p className="text-[11px] text-on-surface-variant">cashback offers active</p>
            </div>
            <span className="flex items-center gap-1 text-primary">
              <span className="text-[11px] font-semibold">View all</span>
              <Icon name="chevron_right" className="text-sm" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => goToChapter(5)}
            className="flex flex-col gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 text-left shadow-card transition-transform active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high">
              <Icon name="trending_up" filled className="text-on-surface-variant" />
            </span>
            <div>
              <p className="font-heading text-xl font-bold text-on-surface">+12%</p>
              <p className="text-[11px] text-on-surface-variant">vs. last month</p>
            </div>
            <span className="flex items-center gap-1 text-on-surface-variant">
              <span className="text-[11px] font-semibold">Trends</span>
              <Icon name="show_chart" className="text-sm" />
            </span>
          </button>
        </div>

        <Disclaimer>{settings.disclaimers.illustrative}</Disclaimer>
      </div>

      <CheckoutModal product={cart} onClose={() => setCart(null)} />
    </Screen>
  );
}
