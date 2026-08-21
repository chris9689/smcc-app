import { cn } from '@/hooks/utils';

interface StageProgressProps {
  /** Number of total stages. */
  total: number;
  /** Current active stage (1-based). */
  current: number;
  className?: string;
  labels?: string[];
}

/** Horizontal segmented progress used at the top of journey screens. */
export function StageProgress({ total, current, className, labels }: StageProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
        {Array.from({ length: total }).map((_, i) => {
          const active = i < current;
          return (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors duration-500',
                active ? 'bg-primary' : 'bg-surface-container-highest',
              )}
            />
          );
        })}
      </div>
      {labels && (
        <div className="mt-1 flex justify-between text-[10px] font-medium text-muted">
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}
