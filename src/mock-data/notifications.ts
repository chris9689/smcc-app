import type { AppNotification } from '@/types';

/**
 * Illustrative in-app notifications for the demo header.
 */
export const notifications: AppNotification[] = [
  {
    id: 'n-1',
    title: 'Relevant for you',
    body: 'We spotted an offer for your card that may suit your needs.',
    time: 'Just now',
    icon: '🎁',
  },
  {
    id: 'n-2',
    title: 'Points reminder',
    body: 'Your points may help toward selected services. Subject to programme rules.',
    time: '2h ago',
    icon: '✨',
  },
  {
    id: 'n-3',
    title: 'Monthly recap ready',
    body: 'See your loyalty progress for this month.',
    time: 'Yesterday',
    icon: '📈',
  },
];
