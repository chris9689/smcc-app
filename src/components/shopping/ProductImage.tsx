import type { Product } from '@/types';
import { cn } from '@/hooks/utils';

interface ProductImageProps {
  product: Product;
  className?: string;
  /** Emoji size class when falling back. */
  emojiClass?: string;
}

/**
 * Product media tile — uses the product image when available, falls back to emoji.
 */
export function ProductImage({ product, className, emojiClass = 'text-5xl' }: ProductImageProps) {
  if (product.image) {
    return (
      <div className={cn('relative overflow-hidden bg-white', className)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-2"
        />
      </div>
    );
  }
  return (
    <div className={cn('relative overflow-hidden brand-gradient-soft', className)}>
      <div className={cn('flex h-full w-full items-center justify-center', emojiClass)}>
        <span aria-hidden>{product.emoji}</span>
      </div>
    </div>
  );
}
