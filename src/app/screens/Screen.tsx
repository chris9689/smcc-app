import type { ReactNode } from 'react';
import { chapterById } from '@/app/chapters';
import { ChapterIntro } from '@/components/previews/ChapterIntro';

/**
 * Scrollable content region for a chapter, with the standard chapter intro
 * header. Screens compose their body inside this wrapper.
 */
export function Screen({
  chapterId,
  children,
  showIntro = false,
}: {
  chapterId: number;
  children: ReactNode;
  showIntro?: boolean;
}) {
  const chapter = chapterById(chapterId);
  return (
    <div className="flex-1 overflow-y-auto bg-surface px-4 pb-6 pt-2 no-scrollbar">
      {showIntro && <ChapterIntro chapter={chapter} />}
      {children}
    </div>
  );
}
