import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { staggerContainer } from '@/animations/variants';

interface ProductGridProps {
  products: Product[];
  onSelect?: (p: Product) => void;
}

/** Two-column responsive grid of product cards. */
export function ProductGrid({ products, onSelect }: ProductGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-3"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={onSelect} />
      ))}
      {products.length === 0 && (
        <p className="col-span-2 py-8 text-center text-sm text-muted">
          No products match your search.
        </p>
      )}
    </motion.div>
  );
}
