import type { Offer } from '@/types';

/**
 * Candidate loyalty actions considered by the mock decision engine.
 * All value framing is illustrative and subject to programme rules.
 */
export const offers: Offer[] = [
  {
    id: 'offer-household',
    kind: 'household',
    title: 'Complete your new home setup',
    subtitle: 'Household & electronics bundle value',
    description:
      'Curated household and electronics value aligned to a home-setup moment, from kettles to lighting and storage.',
    valueLabel: 'Up to 10% back in points',
    emoji: '🏠',
    baseScore: 74,
    cashbackLinked: true,
    requiresLinked: true,
    disclaimer: 'Illustrative value. Subject to programme rules.',
  },
  {
    id: 'offer-tv',
    kind: 'electronics',
    title: '40-inch TV offer',
    subtitle: 'Living room upgrade',
    description:
      'Elevated point-back on a 40-inch smart TV to complement a new living space.',
    valueLabel: 'Up to 8% back in points',
    emoji: '📺',
    baseScore: 61,
    cashbackLinked: true,
    requiresLinked: true,
    disclaimer: 'Illustrative value. Subject to programme rules.',
  },
  {
    id: 'offer-activity',
    kind: 'activity',
    title: 'Your next eligible activity',
    subtitle: 'Keep your V Point program momentum',
    description:
      'A simple next activity that helps maintain monthly V Point program engagement.',
    valueLabel: 'Progress toward your monthly status',
    emoji: '🎯',
    baseScore: 48,
    cashbackLinked: false,
    requiresLinked: true,
    disclaimer: 'Progress shown is illustrative. Subject to programme rules.',
  },
  {
    id: 'offer-points',
    kind: 'points-utility',
    title: 'Make your points work harder',
    subtitle: 'Points utility education',
    description:
      'Learn how points may help cover selected banking payments and everyday services.',
    valueLabel: 'Use points toward selected services',
    emoji: '✨',
    baseScore: 42,
    cashbackLinked: true,
    requiresLinked: false,
    disclaimer: 'Availability of point usage is subject to programme rules.',
  },
  {
    id: 'offer-recap',
    kind: 'recap-action',
    title: 'Your recommended next action',
    subtitle: 'Monthly recap follow-up',
    description:
      'A recommended next step based on your monthly loyalty progress.',
    valueLabel: 'Personalised next step',
    emoji: '📈',
    baseScore: 35,
    cashbackLinked: false,
    requiresLinked: false,
    disclaimer: 'Recommendations are illustrative.',
  },
];

export const offerById = (id: string): Offer | undefined =>
  offers.find((o) => o.id === id);

export const householdOffer = offers[0];
