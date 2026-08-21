import type { RecapMetric, Signal, Guardrail } from '@/types';

/**
 * Approved, illustrative signals assembled in the Decision Theatre.
 * Only safe, consented signal categories are represented.
 */
export const signals: Signal[] = [
  {
    id: 'sig-home',
    label: 'Recent home purchases',
    detail: 'Dishwasher, cleaner, lights, furniture, curtains',
    category: 'behaviour',
    icon: '🛋️',
    weight: 22,
  },
  {
    id: 'sig-ichiba',
    label: 'Weekly SMCC Mall shopping',
    detail: 'Consistent weekly engagement on SMCC Mall',
    category: 'behaviour',
    icon: '🛒',
    weight: 16,
  },
  {
    id: 'sig-browse',
    label: 'Electronics browsing',
    detail: 'Currently browsing electric kettles',
    category: 'intent',
    icon: '🔎',
    weight: 20,
  },
  {
    id: 'sig-card',
    label: 'SMCC card holder',
    detail: 'Eligible for Card-linked cashback',
    category: 'membership',
    icon: '💳',
    weight: 18,
  },
  {
    id: 'sig-happy',
    label: 'Linked V Point program status',
    detail: 'Premium rank, enrolled and active',
    category: 'membership',
    icon: '⭐',
    weight: 14,
  },
  {
    id: 'sig-consent',
    label: 'Consent available',
    detail: 'Personalisation consent on file',
    category: 'context',
    icon: '✅',
    weight: 6,
  },
  {
    id: 'sig-suppression',
    label: 'No suppression flag',
    detail: 'No frequency-cap or suppression active',
    category: 'context',
    icon: '🛡️',
    weight: 4,
  },
];

/**
 * Guardrails that must pass before value is shown to the customer.
 * Each rule evaluates against the active persona state.
 */
export const guardrails: Guardrail[] = [
  {
    id: 'gr-consent',
    label: 'Consent on file',
    detail: 'Customer has provided marketing and personalisation consent.',
    passes: () => true,
  },
  {
    id: 'gr-linked',
    label: 'Linked account',
    detail: 'SMCC member account linked to V Point program.',
    passes: (persona) => persona !== 'notLinked',
  },
  {
    id: 'gr-rule',
    label: 'Programme rule check',
    detail: 'Offer is valid under current programme rules.',
    passes: () => true,
  },
  {
    id: 'gr-eligibility',
    label: 'Eligibility',
    detail: 'Customer meets eligibility flags for this value.',
    passes: (persona) => persona !== 'notLinked',
  },
  {
    id: 'gr-suppression',
    label: 'No suppression',
    detail: 'No suppression or frequency-cap flag is active.',
    passes: () => true,
  },
];

/** Illustrative monthly recap metrics. */
export const recapMetrics: RecapMetric[] = [
  {
    id: 'rm-activities',
    label: 'Activities counted',
    value: '13',
    caption: 'Qualifying activities this month',
    icon: '✅',
    accent: 'green',
  },
  {
    id: 'rm-points',
    label: 'Points expected',
    value: '~1,200',
    caption: 'Estimated, not yet finalised',
    icon: '✨',
    accent: 'orange',
  },
  {
    id: 'rm-benefits',
    label: 'Benefits available',
    value: '4',
    caption: 'Perks ready to use',
    icon: '🎁',
    accent: 'red',
  },
  {
    id: 'rm-status',
    label: 'Status progress',
    value: '76%',
    caption: 'Toward VIP',
    icon: '📈',
    accent: 'amber',
  },
];
