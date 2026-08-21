import { motion } from 'framer-motion';
import { signals } from '@/mock-data/analytics';
import { staggerContainer } from '@/animations/variants';
import { SignalCard } from './SignalCard';

/**
 * Animated vertical timeline that assembles approved signals one by one.
 * Keyed by replayToken so the presenter can re-trigger the animation.
 */
export function SignalTimeline({ replayKey }: { replayKey: number }) {
  return (
    <motion.div
      key={replayKey}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="relative space-y-2.5 pl-4"
    >
      <span className="absolute left-1 top-2 bottom-2 w-0.5 rounded-full bg-black/10" aria-hidden />
      {signals.map((signal) => (
        <div key={signal.id} className="relative">
          <span className="absolute -left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full brand-gradient" aria-hidden />
          <SignalCard signal={signal} />
        </div>
      ))}
    </motion.div>
  );
}
