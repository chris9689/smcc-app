import type { LoyaltyStatus } from '@/types';

/**
 * Illustrative V Point program status and mechanics for the demo persona.
 * Stages, counts and progress are for demonstration only and do not
 * imply instant status or point changes. Subject to programme rules.
 */
export const loyaltyStatus: LoyaltyStatus = {
  rank: 'Premium',
  nextRank: 'VIP',
  progressToNext: 80,
  monthlyActivitiesCounted: 16,
  monthlyActivitiesTarget: 20,
  benefits: [
    {
      id: 'b-pointup',
      label: 'Point-up rate',
      detail: 'Elevated point earning across eligible SMCC Mall purchases.',
      available: true,
      icon: '⬆️',
    },
    {
      id: 'b-birthday',
      label: 'Member perks',
      detail: 'Seasonal member perks and campaigns.',
      available: true,
      icon: '🎁',
    },
    {
      id: 'b-priority',
      label: 'Priority campaigns',
      detail: 'Earlier access to selected V Point program campaigns.',
      available: false,
      icon: '⭐',
    },
  ],
  mechanics: [
    {
      id: 'm-activities',
      label: 'Monthly activities',
      description: 'Qualifying activities counted this month.',
      progress: 80,
      target: '12 of 15 counted',
    },
    {
      id: 'm-spend',
      label: 'SMCC Mall engagement',
      description: 'Weekly shopping engagement on SMCC Mall.',
      progress: 72,
      target: 'On track this month',
    },
    {
      id: 'm-diversity',
      label: 'Service breadth',
      description: 'Range of SMCC services used this month.',
      progress: 55,
      target: '3 services used',
    },
  ],
};

/** Alternate status used when persona is under-engaged. */
export const underEngagedStatus: LoyaltyStatus = {
  ...loyaltyStatus,
  rank: 'Advanced',
  nextRank: 'Premium',
  progressToNext: 55,
  monthlyActivitiesCounted: 7,
  monthlyActivitiesTarget: 10,
  mechanics: loyaltyStatus.mechanics.map((m) => ({
    ...m,
    progress: Math.round(m.progress * 0.5),
    target:
      m.id === 'm-activities' ? '7 of 10 counted' : 'Needs attention this month',
  })),
};
