import { cn } from '@/hooks/utils';
import { Icon } from '@/components/ui/Icon';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

/** Controlled search input styled as a rounded field. */
export function SearchBar({ value, onChange, placeholder, className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Icon
        name="search"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search electronics…'}
        aria-label="Search products"
        className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest py-3.5 pl-11 pr-11 text-sm font-medium text-on-surface shadow-card outline-none placeholder:text-on-surface-variant focus:border-primary"
      />
      <Icon
        name="tune"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
      />
    </div>
  );
}
