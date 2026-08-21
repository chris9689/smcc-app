import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { drawerVariants } from '@/animations/variants';
import { SignalTimeline } from '@/components/decision-theatre/SignalTimeline';
import { ValuePool } from '@/components/decision-theatre/ValuePool';
import { GuardrailChecklist } from '@/components/decision-theatre/GuardrailChecklist';
import { RankingBoard } from '@/components/decision-theatre/RankingBoard';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { winningOffer } from '@/services/decisionEngine';
import { settings } from '@/mock-data/settings';
import { campaigns } from '@/mock-data/campaigns';

/**
 * "Reasoning" decisioning view. This is the ONLY place
 * the orchestration story (signals, value pool, guardrails, ranking) is shown.
 * It never appears in the customer-facing app screens.
 */
export function BehindTheScenes() {
  const { behindOpen, setBehindOpen, replayDecision, replayToken, persona } = useDemo();
  const winner = useMemo(() => winningOffer(persona), [persona]);
  const activeCampaign = campaigns[0]; // Home Setup Next-Best-Action

  return (
    <AnimatePresence>
      {behindOpen && (
        <div className="fixed inset-0 z-[70] flex items-stretch justify-end">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBehindOpen(false)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Reasoning decisioning"
            variants={drawerVariants}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-canvas shadow-float"
          >
            <header className="flex items-center justify-between border-b border-black/5 bg-ink px-5 py-4 text-white">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-white/60">
                  Reasoning details
                </p>
                <h2 className="text-lg font-extrabold">Reasoning</h2>
              </div>
              <button
                type="button"
                onClick={() => setBehindOpen(false)}
                aria-label="Close reasoning"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto p-5 no-scrollbar">
              {/* Prologue: AI insight trigger */}
              <section>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-ink text-[11px] font-black text-white">✦</span>
                  <h3 className="text-sm font-extrabold text-ink">How it starts — spending insight detected</h3>
                </div>
                <div className="rounded-2xl border border-black/10 bg-surface-container-low p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-base" aria-hidden>📊</span>
                    <p className="text-xs font-bold text-ink">SMCC card · Spending Summary</p>
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    <span className="font-semibold text-ink">Pattern detected:</span> Hanako has spent ¥42,000 on home setup items over the past 60 days — kitchen appliances, lighting, furniture, curtains.
                  </p>
                  <p className="mt-1.5 text-[11px] italic text-muted">
                    Hypothesis: possible recent move or home renovation in progress.
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-primary">
                    <Icon name="arrow_downward" className="text-sm" />
                    <p className="text-[11px] font-bold">This insight feeds the signal assembly below</p>
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle step="1" title="Understanding Hanako's moment" />
                <p className="mb-3 text-xs text-muted">
                  Safe, approved signals only — no sensitive payment or PCI data.
                </p>
                <SignalTimeline replayKey={replayToken} />
              </section>

              <section>
                <SectionTitle step="2" title="Checking eligible loyalty value" />
                <ValuePool replayKey={replayToken} />
              </section>

              <section>
                <SectionTitle step="3" title="Guardrails — only usable value appears" />
                <GuardrailChecklist replayKey={replayToken} />
              </section>

              <section>
                <SectionTitle step="4" title="Ranking the next best action" />
                <RankingBoard replayKey={replayToken} />
                <div className="mt-3 flex items-start gap-2 rounded-2xl brand-gradient-soft p-3">
                  <span aria-hidden>💡</span>
                  <p className="text-[11px] leading-snug text-ink">
                    <span className="font-bold">Winning action:</span> {winner.offer.title} —
                    selected because Hanako's recent activity suggests a home setup moment.
                  </p>
                </div>

                {/* DY Campaign metadata */}
                <div className="mt-3 rounded-2xl border border-black/10 bg-surface-container-lowest p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted">DY Campaign Active</p>
                    <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                      ● Live
                    </span>
                  </div>
                  <p className="mt-1 font-heading text-sm font-bold text-ink">{activeCampaign.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{activeCampaign.dyExperienceId}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-canvas px-2 py-0.5 text-[10px] font-semibold text-muted">{activeCampaign.channel}</span>
                    <span className="rounded-full bg-canvas px-2 py-0.5 text-[10px] font-semibold text-muted">{activeCampaign.audience}</span>
                  </div>
                </div>

                {/* Multi-touchpoint callout */}
                <div className="mt-3 flex items-start gap-2 rounded-2xl bg-surface-container-low p-3">
                  <span aria-hidden>📱</span>
                  <p className="text-[11px] leading-snug text-muted">
                    <span className="font-bold text-ink">Available everywhere:</span> Dynamic Yield can deliver this same experience via push notification, email, or web — consistent personalisation across all SMCC touchpoints.
                  </p>
                </div>
              </section>

              <Button variant="secondary" fullWidth onClick={replayDecision}>
                ↻ Replay decisioning
              </Button>

              <Disclaimer>
                {settings.disclaimers.illustrative} {settings.disclaimers.programmeRules}
              </Disclaimer>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg brand-gradient text-[11px] font-black text-white">
        {step}
      </span>
      <h3 className="text-sm font-extrabold text-ink">{title}</h3>
    </div>
  );
}
