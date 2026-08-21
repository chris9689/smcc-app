import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';

/**
 * Left-side "Why shown now" panel. Opens when the customer taps the main
 * recommended offer, and explains the reasons behind the recommendation for
 * the currently selected app user.
 */
export function WhyShownPanel({ onClose }: { onClose?: () => void }) {
  const { appUserProfile } = useDemo();
  const { name, context, why, whyShownNow, alternatives } = appUserProfile;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-rakuten-red">
            Why shown now
          </p>
          <h2 className="text-lg font-extrabold text-ink">{name}</h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close why shown now"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {/* Persona context */}
      <p className="text-xs leading-relaxed text-muted">{context}</p>

      {/* Narrative summary */}
      <div className="rounded-2xl border border-rakuten-red/20 bg-rakuten-red/[0.05] p-3">
        <p className="text-xs font-bold text-rakuten-red">Why this, right now</p>
        <p className="mt-1 text-xs leading-relaxed text-ink">{whyShownNow}</p>
      </div>

      {/* Reasons */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
          Signals considered
        </p>
        {why.map((reason) => (
          <div
            key={reason.label}
            className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-surface-container-lowest p-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
              <Icon name={reason.icon} filled className="text-lg" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-ink">{reason.label}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                {reason.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alternatives considered */}
      {alternatives && alternatives.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
            Also considered
          </p>
          {alternatives.map((alt) => (
            <div
              key={`${alt.label}-${alt.cta}`}
              className="rounded-xl border border-dashed border-black/[0.12] bg-white/60 p-3"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-on-surface-variant">
                  {alt.source}
                </span>
                <span className="text-[11px] font-bold text-ink">{alt.label}</span>
              </div>
              {alt.title && (
                <p className="text-xs font-bold text-ink">{alt.title}</p>
              )}
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{alt.cta}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-auto text-[10px] leading-relaxed text-muted">
        Reasoning is illustrative and for demonstration only.
      </p>
    </div>
  );
}
