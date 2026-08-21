import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/hooks/utils';

interface Tab {
  label: string;
  icon: string;
  chapter: number;
  /** Chapters that keep this tab highlighted. */
  range: number[];
}

const tabs: Tab[] = [
  { label: 'Home', icon: 'home', chapter: 1, range: [1] },
  { label: 'Shop', icon: 'shopping_bag', chapter: 2, range: [2, 3] },
  { label: 'Muse', icon: 'auto_awesome', chapter: 7, range: [7] },
  { label: 'Benefits', icon: 'card_giftcard', chapter: 6, range: [6] },
  { label: 'Points', icon: 'account_balance_wallet', chapter: 4, range: [4, 5] },
];

/** Bottom tab bar (glassmorphism). Tabs map to key chapters in the journey. */
export function BottomNav() {
  const { chapter, goToChapter } = useDemo();

  return (
    <nav
      aria-label="Primary"
      className="relative z-30 glass px-2 pb-4 pt-2 shadow-sm"
    >
      <ul className="flex items-stretch justify-between">
        {tabs.map((tab) => {
          const active = tab.range.includes(chapter);
          const isMuse = tab.label === 'Muse';

          if (isMuse) {
            return (
              <li key={tab.label} className="flex-1">
                <button
                  type="button"
                  onClick={() => goToChapter(tab.chapter)}
                  aria-current={active ? 'page' : undefined}
                  className="flex w-full flex-col items-center gap-1"
                >
                  <span
                    className={cn(
                      '-mt-5 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-float ring-4 ring-surface transition-transform active:scale-95',
                      'brand-gradient',
                      active && 'scale-105',
                    )}
                  >
                    <Icon name={tab.icon} filled className="text-[24px]" />
                  </span>
                  <span
                    className={cn(
                      'font-heading text-[10px] font-semibold',
                      active ? 'text-primary' : 'text-on-surface-variant',
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={tab.label} className="flex-1">
              <button
                type="button"
                onClick={() => goToChapter(tab.chapter)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition-colors',
                  active ? 'text-primary' : 'text-on-surface-variant hover:text-primary',
                )}
              >
                <Icon name={tab.icon} filled={active} className="text-[24px]" />
                <span className="font-heading text-[10px] font-semibold">{tab.label}</span>
                <span
                  className={cn(
                    'h-1 w-1 rounded-full transition-colors',
                    active ? 'bg-primary' : 'bg-transparent',
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
