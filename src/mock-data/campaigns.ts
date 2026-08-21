import type { Campaign } from '@/types';

/**
 * Illustrative Dynamic Yield campaign metadata to convey how the Hub
 * orchestrates decisioning. Experience IDs are fictional.
 */
export const campaigns: Campaign[] = [
  {
    id: 'camp-home-setup',
    name: 'Home Setup Next-Best-Action',
    channel: 'App · Rewards Hub',
    audience: 'Home-intent, linked V Point program',
    status: 'live',
    dyExperienceId: 'DY-EXP-10241',
  },
  {
    id: 'camp-points-utility',
    name: 'Points Utility Education',
    channel: 'App · Rewards Hub',
    audience: 'Cardholders with point balance',
    status: 'live',
    dyExperienceId: 'DY-EXP-10258',
  },
  {
    id: 'camp-activation',
    name: 'V Point program Activation',
    channel: 'App · Onboarding',
    audience: 'Unlinked members',
    status: 'live',
    dyExperienceId: 'DY-EXP-10190',
  },
  {
    id: 'camp-recap',
    name: 'Monthly Loyalty Recap',
    channel: 'App · Recap',
    audience: 'Active loyalty members',
    status: 'scheduled',
    dyExperienceId: 'DY-EXP-10312',
  },
];
