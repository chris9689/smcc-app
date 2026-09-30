import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';
import { formatYen } from '@/hooks/utils';
import { vPointsFor, type MuseProduct } from '@/mock-data/muse';
import { buildFeedGroups, formatDistance, type RankedFeedItem } from '@/services/feedRanking';

/**
 * The personalised feed, shared by Home and Browse. It is split into two
 * context areas — a weather group that swaps live when the presenter changes
 * the weather, and a spotlight group that re-ranks around the last product
 * redeemed in Muse. The context rail is promoted to each area's headline, so
 * individual cards stay clean and legible.
 */
export function PersonalizedFeed({ onSelect }: { onSelect: (p: MuseProduct) => void }) {
  const { appUser, feedContext, objective, redeemedProductIds, presenterOpen } = useDemo();

  const groups = useMemo(
    () => buildFeedGroups(appUser, feedContext.weather, objective, redeemedProductIds),
    [appUser, feedContext.weather, objective, redeemedProductIds],
  );

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <section key={group.id} className="flex flex-col gap-2">
          {/* Context rail — promoted from the per-card reason to an area headline */}
          <div className="flex items-center gap-1.5 text-primary">
            <Icon name={group.icon} filled className="text-[15px]" />
            <h4 className="font-heading text-sm font-bold">{group.headline}</h4>
          </div>

          <div className="flex flex-col gap-2.5">
            {group.items.map((item) => (
              <FeedCard
                key={item.product.id}
                item={item}
                presenter={presenterOpen}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FeedCard({
  item,
  presenter,
  onSelect,
}: {
  item: RankedFeedItem;
  presenter: boolean;
  onSelect: (p: MuseProduct) => void;
}) {
  const p = item.product;
  return (
    <motion.button
      type="button"
      layout
      transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      onClick={() => onSelect(p)}
      aria-label={`Buy ${p.name}`}
      className="flex items-center gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-2.5 text-left shadow-card transition-transform active:scale-[0.98]"
    >
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-container-low text-2xl">
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

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="line-clamp-1 font-heading text-sm font-bold text-on-surface">{p.name}</p>
          {presenter && (
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${item.modelClassName}`}
            >
              {item.modelLabel}
            </span>
          )}
        </div>

        <p className="mt-0.5 line-clamp-1 text-[11px] text-on-surface-variant">{p.brand}</p>

        <div className="mt-1 flex items-center gap-2 text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-0.5">
            <Icon name="near_me" className="text-[12px]" />
            {formatDistance(item.distanceM)}
          </span>
          <span className="flex items-center gap-0.5">
            <Icon name="schedule" className="text-[12px]" />
            {item.expiry}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
          <Icon name="savings" filled className="text-[12px]" />
          {p.cashbackPct}%
        </span>
        <span className="font-heading text-sm font-bold text-primary">{formatYen(p.price)}</span>
        <span className="text-[9px] font-semibold text-secondary">
          +{vPointsFor(p.price).toLocaleString()} pts
        </span>
      </div>
    </motion.button>
  );
}
