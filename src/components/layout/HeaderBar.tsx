import { useState } from 'react';
import { notifications } from '@/mock-data/notifications';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Icon } from '@/components/ui/Icon';
import { Drawer } from '@/components/ui/Drawer';

/** Top app bar: SMCC wordmark and notifications. Consumer-facing only. */
export function HeaderBar() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <header className="relative z-30 flex items-center justify-between bg-surface px-4 pb-3 pt-4">
        <BrandLogo className="h-5" />
        <button
          type="button"
          onClick={() => setNotifOpen(true)}
          aria-label="Open notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-opacity hover:opacity-80 active:scale-95"
        >
          <Icon name="notifications" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <Drawer open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications">
        <ul className="space-y-2.5">
          {notifications.map((n) => (
            <li key={n.id} className="flex gap-3 rounded-2xl bg-surface-container-low p-3">
              <span className="text-xl" aria-hidden>
                {n.icon}
              </span>
              <div className="min-w-0">
                <p className="font-heading text-sm font-bold text-on-surface">{n.title}</p>
                <p className="text-xs text-on-surface-variant">{n.body}</p>
                <p className="mt-1 text-[10px] font-semibold text-on-surface-variant">{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
