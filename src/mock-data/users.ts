import type { User } from '@/types';

/**
 * Primary demo persona. All attributes are illustrative and fictional.
 * No real customer or sensitive financial data is represented here.
 */
export const hanako: User = {
  id: 'user-hanako',
  name: 'Hanako Sato',
  ageBand: '30s',
  household: 'Husband and two children',
  cardholderType: 'SMCC card',
  weeklyShopper: true,
  recentHomePurchases: ['Dishwasher', 'Cleaner', 'Lights', 'Furniture', 'Curtains'],
  currentIntent: 'Browsing electric kettles',
  hypothesis: 'Potential home setup / recent move',
  consent: true,
  linkedHappyProgram: true,
  suppressionFlag: false,
  happyProgramRank: 'Premium',
  pointsBalance: 10000,
  avatarInitials: 'HS',
};

export const users: User[] = [hanako];
