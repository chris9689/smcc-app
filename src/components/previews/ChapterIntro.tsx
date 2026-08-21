import { motion } from 'framer-motion';
import type { Chapter } from '@/types';

/**
 * Small header caption shown at the top of each chapter screen, carrying the
 * chapter number and its scripted copy line.
 */
export function ChapterIntro({ chapter }: { chapter: Chapter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-4"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg brand-gradient text-[11px] font-black text-white">
          {chapter.id}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted">
          {chapter.title}
        </span>
      </div>
      <h1 className="mt-1.5 text-2xl font-extrabold leading-tight text-ink">
        {chapter.copy}
      </h1>
    </motion.div>
  );
}
