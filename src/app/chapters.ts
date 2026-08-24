import type { Chapter } from '@/types';

/**
 * Customer-facing app steps. These are the only screens the customer sees.
 * All decisioning/orchestration lives in the hidden presenter "Behind the
 * scenes" view, never in these screens.
 */
export const chapters: Chapter[] = [
  {
    id: 1,
    key: 'home',
    title: 'Home',
    copy: 'Your SMCC loyalty status today.',
    icon: '🏠',
  },
  {
    id: 2,
    key: 'browse',
    title: 'Shop',
    copy: 'Marketplace — shop and earn cashback.',
    icon: '🛒',
  },
  {
    id: 3,
    key: 'offer',
    title: 'Offer',
    copy: 'Complete your new home setup.',
    icon: '🎁',
  },
  {
    id: 4,
    key: 'points',
    title: 'Points',
    copy: 'New ways to use your points.',
    icon: '✨',
  },
  {
    id: 5,
    key: 'recap',
    title: 'Recap',
    copy: 'Your monthly loyalty progress.',
    icon: '📈',
  },
  {
    id: 6,
    key: 'saved',
    title: 'Cashback',
    copy: 'Your cashback and benefits.',
    icon: '💰',
  },
  {
    id: 7,
    key: 'muse',
    title: 'Muse',
    copy: 'Shop with cashback and get answers.',
    icon: '💬',
  },
];

export const chapterById = (id: number): Chapter =>
  chapters.find((c) => c.id === id) ?? chapters[0];

export const totalChapters = chapters.length;

