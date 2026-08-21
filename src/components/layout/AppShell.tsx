import { AnimatePresence, motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { screenByChapter } from '@/app/screens';
import { screenVariants } from '@/animations/variants';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { HeaderBar } from '@/components/layout/HeaderBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { BehindTheScenes } from '@/components/presenter/BehindTheScenes';
import { PresenterControls } from '@/components/presenter/PresenterControls';
import { WhyShownPanel } from '@/components/presenter/WhyShownPanel';
import { Drawer } from '@/components/ui/Drawer';
import { BrandLogo } from '@/components/ui/BrandLogo';

/**
 * Top-level shell: renders the phone frame with the active chapter screen,
 * a clean chapter navigator, and a single reasoning drawer CTA.
 */
export function AppShell() {
  useKeyboardShortcuts();
  const { chapter, presenterOpen, setPresenterOpen, whyOpen, closeWhy } = useDemo();
  const Screen = screenByChapter[chapter];

  return (
    <div className="min-h-full w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-6 px-4 py-6 lg:flex-row lg:items-start lg:justify-center lg:py-10">
        {/* Why shown now — left rail */}
        <AnimatePresence>
          {whyOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hidden w-[320px] shrink-0 self-stretch lg:block"
            >
              <div className="sticky top-10 flex max-h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-3xl bg-canvas shadow-card ring-1 ring-black/[0.04]">
                <WhyShownPanel onClose={closeWhy} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Phone */}
        <div className="flex flex-1 flex-col items-center">
          <BrandIntro />
          <div className="mb-4 w-full max-w-[420px]" />
          <MobileFrame>
            <HeaderBar />

            <AnimatePresence mode="wait">
              <motion.main
                key={chapter}
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-1 flex-col overflow-hidden"
              >
                <Screen />
              </motion.main>
            </AnimatePresence>

            <BottomNav />
          </MobileFrame>
        </div>

        <AnimatePresence>
          {presenterOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hidden w-[320px] shrink-0 self-stretch lg:block"
            >
              <div className="sticky top-10 flex max-h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-3xl bg-canvas shadow-card ring-1 ring-black/[0.04]">
                <PresenterControls onClose={() => setPresenterOpen(false)} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:hidden">
        <Drawer
          open={presenterOpen}
          onClose={() => setPresenterOpen(false)}
          title="Presenter controls"
          contained={false}
        >
          <PresenterControls onClose={() => setPresenterOpen(false)} />
        </Drawer>

        <Drawer
          open={whyOpen}
          onClose={closeWhy}
          title="Why shown now"
          contained={false}
        >
          <WhyShownPanel onClose={closeWhy} />
        </Drawer>
      </div>

      {/* Decisioning view lives outside customer app screens. */}
      <BehindTheScenes />
    </div>
  );
}

function BrandIntro() {
  return (
    <div className="mb-4 flex max-w-[420px] flex-col items-center text-center">
      <div className="flex items-center gap-2">
        <BrandLogo className="h-7" />
        <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Card
        </span>
      </div>
    </div>
  );
}
