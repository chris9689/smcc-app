import { cn } from '@/hooks/utils';

/**
 * SMBC (SMCC) brand logo. Uses the official SMBC brand asset from /public with
 * a graceful fallback if the image is unavailable.
 */
export function BrandLogo({ className, alt = 'SMBC' }: { className?: string; alt?: string }) {
  return (
    <img
      src="/logo_smbc_01.jpg"
      alt={alt}
      className={cn('block w-auto max-w-none object-contain', className)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
