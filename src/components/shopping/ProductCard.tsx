import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { cardEntrance } from '@/animations/variants';
import { formatYen } from '@/hooks/utils';
import { Icon } from '@/components/ui/Icon';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onSelect?: (p: Product) => void;
}

/** Product tile with stock photo, price and rating. */
export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.button
      type="button"
      variants={cardEntrance}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(product)}
      aria-label={`View ${product.name}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest text-left shadow-card"
    >
      <ProductImage product={product} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 font-heading text-sm font-semibold leading-tight text-on-surface">
          {product.name}
        </p>
        <p className="font-heading text-base font-bold text-primary">{formatYen(product.price)}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-on-surface-variant">
            <Icon name="star" filled className="text-[14px] text-tertiary-fixed-dim" />
            {product.rating.toFixed(1)}
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-outline/40 text-on-surface-variant">
            <Icon name="add" className="text-[16px]" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
