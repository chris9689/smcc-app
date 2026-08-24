import { useMemo, useState } from 'react';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { SearchBar } from '@/components/shopping/SearchBar';
import { CategoryTabs } from '@/components/shopping/CategoryTabs';
import { CheckoutModal } from '@/components/shopping/CheckoutModal';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { formatYen } from '@/hooks/utils';
import {
  marketplaceProducts,
  marketplaceCategories,
  recommendedProductIdsByUser,
  museProductById,
  vPointsFor,
  type MuseProduct,
} from '@/mock-data/muse';

/** Chapter 2 — In-app marketplace: shop products and earn cashback + V Points. */
export function BrowseScreen() {
  const { appUser } = useDemo();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<MuseProduct | null>(null);

  const recommended = useMemo(
    () =>
      (recommendedProductIdsByUser[appUser] ?? [])
        .map(museProductById)
        .filter((p): p is MuseProduct => Boolean(p)),
    [appUser],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return marketplaceProducts.filter((p) => {
      const inCat = category === 'All' || p.category === category;
      const inQ = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [query, category]);

  const showRecommended = query.trim() === '' && category === 'All';

  return (
    <Screen chapterId={2}>
      <div className="flex flex-col gap-5 pt-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-on-surface">Marketplace</h2>
          <p className="text-sm text-on-surface-variant">
            Shop thousands of products and earn cashback + V Points with your SMCC card.
          </p>
        </div>

        <SearchBar value={query} onChange={setQuery} placeholder="Search SMCC cashback & offers" />

        {/* Cashback hero — the core narrative */}
        <section className="brand-gradient relative overflow-hidden rounded-2xl p-4 text-white shadow-card">
          <Icon
            name="savings"
            filled
            className="pointer-events-none absolute -right-3 -top-3 text-[96px] opacity-20"
          />
          <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
            Cashback marketplace
          </p>
          <h3 className="mt-1 font-heading text-lg font-bold leading-tight">
            Earn cashback on every purchase
          </h3>
          <p className="mt-1 text-xs leading-relaxed opacity-90">
            Pay with your SMCC card and cashback is applied automatically — plus V Points on
            everything you buy.
          </p>
        </section>

        {/* Persona-aware recommendations */}
        {showRecommended && recommended.length > 0 && (
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-on-surface">Recommended for you</h3>
              <span className="text-[10px] font-semibold text-muted">Based on your activity</span>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {recommended.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCart(p)}
                  aria-label={`Buy ${p.name}`}
                  className="w-36 shrink-0 overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest text-left shadow-card transition-transform active:scale-95"
                >
                  <div className="relative">
                    <ProductThumb product={p} className="aspect-square w-full" />
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

        {/* Category filter */}
        <CategoryTabs categories={marketplaceCategories} active={category} onChange={setCategory} />

        {/* Product grid */}
        <section className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setCart(p)}
              aria-label={`Buy ${p.name}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest text-left shadow-card transition-transform active:scale-[0.98]"
            >
              <div className="relative">
                <ProductThumb product={p} className="aspect-[4/3] w-full" />
                <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  <Icon name="savings" filled className="text-[13px]" />
                  {p.cashbackPct}% back
                </span>
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-ink backdrop-blur-sm">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="line-clamp-1 font-heading text-sm font-bold leading-tight text-on-surface">
                  {p.name}
                </p>
                <p className="line-clamp-1 text-[11px] text-on-surface-variant">{p.brand}</p>
                <div className="mt-1 flex items-end justify-between">
                  <div>
                    <p className="font-heading text-base font-bold text-primary">{formatYen(p.price)}</p>
                    <p className="flex items-center gap-0.5 text-[10px] font-semibold text-secondary">
                      <Icon name="account_balance_wallet" filled className="text-[12px]" />
                      +{vPointsFor(p.price).toLocaleString()} V Points
                    </p>
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                    <Icon name="add" className="text-[18px]" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </section>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center">
            <p className="text-sm text-on-surface-variant">No products match your search.</p>
          </div>
        )}

        <Disclaimer>
          Products, prices and cashback rates are illustrative and for demonstration only.
        </Disclaimer>
      </div>

      {/* In-app checkout */}
      <CheckoutModal product={cart} onClose={() => setCart(null)} />
    </Screen>
  );
}

/** Product image tile with a graceful emoji fallback. */
function ProductThumb({ product, className }: { product: MuseProduct; className?: string }) {
  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden bg-surface-container-low text-4xl ${className ?? ''}`}
    >
      {product.emoji}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
    </span>
  );
}

