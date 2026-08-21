import { recommendations } from '@/mock-data/recommendations';
import { productById } from '@/mock-data/products';
import { formatYen } from '@/hooks/utils';
import { ProductImage } from './ProductImage';
import type { Product } from '@/types';

interface RecommendationCarouselProps {
  onSelect?: (p: Product) => void;
}

/** Horizontally scrollable "recommended for your home" carousel. */
export function RecommendationCarousel({ onSelect }: RecommendationCarouselProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-ink">Recommended for your home</h3>
        <span className="text-[10px] font-semibold text-muted">Based on your activity</span>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {recommendations.map((rec) => {
          const product = productById(rec.productId);
          if (!product) return null;
          return (
            <button
              key={rec.id}
              type="button"
              onClick={() => onSelect?.(product)}
              aria-label={`View ${product.name}`}
              className="w-40 shrink-0 overflow-hidden rounded-3xl bg-card text-left shadow-card ring-1 ring-black/[0.03]"
            >
              <ProductImage product={product} className="h-24 w-full" emojiClass="text-4xl" />
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-bold text-ink">{product.name}</p>
                <p className="line-clamp-1 text-[11px] text-muted">{rec.reason}</p>
                <p className="mt-1 text-sm font-extrabold text-ink">{formatYen(product.price)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
