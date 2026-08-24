import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo, type AppUser } from '@/app/DemoContext';
import { appUserProfileById } from '@/mock-data/appUsers';
import { DemoChapterStepper } from './DemoChapterStepper';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/hooks/utils';

const appUsers: { key: AppUser; role: string; name: string }[] = ([1, 2] as AppUser[]).map((id) => {
  const p = appUserProfileById(id);
  return { key: id, role: p.presenter.role, name: p.name };
});

/** The presenter control panel used on desktop side rail and mobile sheet. */
export function PresenterControls({ onClose }: { onClose?: () => void }) {
  const { toggleBehind, nextChapter, prevChapter, resetDemo, appUser, setAppUser, appUserProfile } =
    useDemo();
  const presenter = appUserProfile.presenter;
  const [showStory, setShowStory] = useState(false);

  // The New Cardholder (persona 1) has the full guided downstream chapter
  // journey; the Traveller's story centres on Home + Shopping Muse.
  const chaptersLocked = appUser !== 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5 no-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-rakuten-red">
            Presenter mode
          </p>
          <h2 className="text-lg font-extrabold text-ink">Demo controls</h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close presenter controls"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.06] text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {/* Persona switcher — two personas */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Persona</span>
        <div className="grid grid-cols-2 gap-1.5">
          {appUsers.map((m) => {
            const active = appUser === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setAppUser(m.key)}
                aria-pressed={active}
                className={cn(
                  'flex flex-col gap-0.5 rounded-xl px-3 py-2 text-left transition-colors',
                  active ? 'bg-ink text-white' : 'bg-surface-container-low text-ink hover:bg-surface-container',
                )}
              >
                <span className="text-xs font-bold leading-tight">{m.role}</span>
                <span className={cn('text-[10px]', active ? 'text-white/70' : 'text-muted')}>
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Persona story — helps the presenter explain the personalisation */}
      <div className="rounded-2xl border border-black/[0.08] bg-white/75">
        <button
          type="button"
          onClick={() => setShowStory((open) => !open)}
          aria-expanded={showStory}
          className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left"
        >
          <span className="text-[11px] font-bold uppercase tracking-wide text-muted">
            Persona story
          </span>
          <span className="text-xs font-bold text-rakuten-red">{showStory ? 'Hide' : 'Show'}</span>
        </button>

        <AnimatePresence initial={false}>
          {showStory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 px-3 pb-3">
                <p className="text-xs leading-relaxed text-ink">{presenter.headline}</p>

                <StoryBlock icon="sensors" title="Key signals">
                  <ul className="flex flex-col gap-1">
                    {presenter.signals.map((s) => (
                      <li key={s} className="flex gap-1.5 text-[11px] leading-snug text-muted">
                        <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-rakuten-red" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </StoryBlock>

                <StoryBlock icon="psychology" title="Why personalised this way">
                  <p className="text-[11px] leading-snug text-muted">{presenter.rationale}</p>
                </StoryBlock>

                <StoryBlock icon="flag" title="Demo objectives">
                  <ul className="flex flex-col gap-1">
                    {presenter.objectives.map((o) => (
                      <li key={o} className="flex gap-1.5 text-[11px] leading-snug text-muted">
                        <Icon name="check_circle" filled className="mt-[1px] text-[13px] text-success" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </StoryBlock>

                <StoryBlock icon="sell" title="Key offers shown">
                  <ul className="flex flex-col gap-1">
                    {presenter.keyOffers.map((o) => (
                      <li key={o} className="flex gap-1.5 text-[11px] leading-snug text-muted">
                        <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </StoryBlock>

                <StoryBlock icon="auto_awesome" title="Key Muse prompts">
                  <div className="flex flex-wrap gap-1">
                    {presenter.musePrompts.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-primary/25 bg-primary/[0.05] px-2 py-0.5 text-[10px] font-semibold text-primary"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </StoryBlock>

                <div className="rounded-xl border border-rakuten-red/20 bg-rakuten-red/[0.05] p-2.5">
                  <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-rakuten-red">
                    <Icon name="visibility" filled className="text-[13px]" />
                    Why shown now
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-ink">{presenter.whyNow}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <div className={cn('flex flex-col gap-4', chaptersLocked && 'pointer-events-none')}>
          <DemoChapterStepper />

          <div className="grid grid-cols-2 gap-1.5">
            <Button variant="outline" size="sm" onClick={prevChapter} aria-label="Previous step">
              ← Prev
            </Button>
            <Button variant="outline" size="sm" onClick={nextChapter} aria-label="Next step">
              Next →
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <Button variant="primary" size="sm" onClick={toggleBehind}>
              Reasoning
            </Button>
          </div>
        </div>

        {chaptersLocked && (
          <div className="absolute -inset-x-5 inset-y-0 flex items-start justify-center bg-white/75 pt-2 backdrop-blur-[1px]">
            <span className="rounded-full bg-ink/85 px-3 py-1 text-center text-[10px] font-bold text-white">
              Guided chapters follow the New Cardholder · story here is Home + Muse
            </span>
          </div>
        )}
      </div>

      <Button variant="outline" size="sm" fullWidth onClick={resetDemo} aria-label="Reset demo to start">
        ↺ Reset demo
      </Button>
    </div>
  );
}

function StoryBlock({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-ink">
        <Icon name={icon} filled className="text-[13px] text-rakuten-red" />
        {title}
      </p>
      {children}
    </div>
  );
}
