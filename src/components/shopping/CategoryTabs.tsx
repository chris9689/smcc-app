import { motion } from 'framer-motion';
import { cn } from '@/hooks/utils';

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}

/** Horizontal scrollable category filter tabs with animated active pill. */
export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1" role="tablist" aria-label="Product categories">
      {categories.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c)}
            className={cn(
              'relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
              isActive ? 'text-white' : 'text-muted hover:text-ink',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-on-surface"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        );
      })}
    </div>
  );
}
