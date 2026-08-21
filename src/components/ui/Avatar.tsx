import { useState } from 'react';
import { media } from '@/mock-data/media';
import { cn } from '@/hooks/utils';

interface AvatarProps {
  initials: string;
  className?: string;
  src?: string;
}

/** Circular avatar. Uses a portrait photo, falling back to initials. */
export function Avatar({ initials, className, src = media.avatar }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-full border-2 border-surface-container-high bg-primary-fixed',
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-heading text-xs font-black text-primary">{initials}</span>
      )}
    </div>
  );
}
