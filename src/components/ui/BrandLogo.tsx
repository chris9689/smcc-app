import { cn } from '@/hooks/utils';

/**
 * SMCC (Vpass) wordmark logo. Uses the SMCC brand asset from /public with a
 * graceful text fallback if the image is unavailable.
 */
export function BrandLogo({ className, alt = 'Vpass by SMCC' }: { className?: string; alt?: string }) {
  return (
    <img
      src="/smcc-logo.svg"
      alt={alt}
      className={cn('block w-auto max-w-none object-contain', className)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
