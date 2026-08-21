import type { Settings } from '@/types';

/**
 * Global demo settings and compliant disclaimer copy.
 */
export const settings: Settings = {
  appName: 'Vpass',
  tagline: 'Your card, made rewarding',
  poweredBy: '',
  currency: '¥',
  disclaimers: {
    illustrative:
      'All values, balances, points, stages and counts shown are illustrative and for demonstration only.',
    programmeRules:
      'Benefits and offers are subject to programme rules.',
    pointsTiming:
      'Points and status updates are not instant and may take time to reflect. Subject to programme rules.',
    cardLinked:
      'Paying with your SMCC card may unlock selected cashback and offers. Subject to programme rules.',
  },
};
