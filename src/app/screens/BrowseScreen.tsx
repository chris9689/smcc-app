import { useMemo, useState } from 'react';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { SearchBar } from '@/components/shopping/SearchBar';
import { ProductGrid } from '@/components/shopping/ProductGrid';
import { ProductImage } from '@/components/shopping/ProductImage';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { products, productById } from '@/mock-data/products';
import { formatYen } from '@/hooks/utils';
import type { Product } from '@/types';

/** Chapter 3 — Browse home electronics. Reads as a normal commerce screen. */
export function BrowseScreen() {
  const { goToChapter } = useDemo();
  const [query, setQuery] = useState('Electric kettle');
  const featured = productById('p-kettle');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // The search field seeds the intent; the grid shows the full catalogue
    // minus the featured item unless the query narrows it.
    return products.filter((p) => {
      if (p.id === 'p-kettle') return false;
      return q === 'electric kettle' || p.name.toLowerCase().includes(q);
    });
  }, [query]);

  const handleSelect = (_p: Product) => goToChapter(3);

  return (
    <Screen chapterId={2}>
      <div className="flex flex-col gap-5 pt-2">
        <SearchBar value={query} onChange={setQuery} placeholder="Electric kettle" />

        <div>
          <h2 className="font-heading text-2xl font-bold text-on-surface">
            Electronics for your home
          </h2>
          <p className="text-sm text-on-surface-variant">Curated quality for modern living</p>
        </div>

        {/* Featured recommended pick */}
        {featured && (
          <div className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-card">
            <div className="relative">
              <ProductImage product={featured} className="aspect-[16/9] w-full" />
              <span className="absolute left-3 top-3 rounded-full bg-secondary-container px-3 py-1 text-[11px] font-bold text-on-secondary-container">
                Recommended pick
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading text-lg font-bold text-on-surface">Electric Kettle</p>
                  <p className="text-sm text-on-surface-variant">Recommended household pick</p>
                </div>
                <p className="font-heading text-lg font-bold text-primary">
                  {formatYen(featured.price)}
                </p>
              </div>
              <Button fullWidth size="md" className="mt-3" onClick={() => goToChapter(4)}>
                Add to Cart
              </Button>
            </div>
          </div>
        )}

        {/* Product grid */}
        <section className="rounded-2xl border border-primary/25 bg-secondary-fixed/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Benefits picked for you</p>
          <h3 className="mt-1 font-heading text-lg font-bold text-on-surface">
            New household offers are available
          </h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Complete your new home setup with selected value available when you check out with
            your SMCC card.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button size="md" fullWidth onClick={() => goToChapter(4)}>
              View offer
            </Button>
            <Button variant="outline" size="md" fullWidth onClick={() => goToChapter(4)}>
              Save offer
            </Button>
          </div>
        </section>

        <ProductGrid products={filtered} onSelect={handleSelect} />

        {/* Accessories row */}
        <button
          type="button"
          onClick={() => goToChapter(4)}
          className="flex items-center gap-4 rounded-2xl bg-surface-container p-4 text-left"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest text-3xl">
            🧰
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-lg font-bold leading-tight text-on-surface">
              Appliance Accessories
            </p>
            <p className="text-sm text-on-surface-variant">Maintenance and upgrades</p>
          </div>
          <Icon name="chevron_right" className="text-primary" />
        </button>
      </div>
    </Screen>
  );
}
