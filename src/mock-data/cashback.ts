import type { AppUserId } from '@/types';

/** A single activated / saved cashback entry shown on the Cashback screen. */
export interface CashbackItem {
  merchant: string;
  title: string;
  /** Value framing, e.g. "10% back", "¥320" or "Benefit". */
  amount: string;
  status: 'Active' | 'Pending' | 'Earned';
  image?: string;
  logo?: string;
  icon?: string;
  note: string;
}

/** Persona cashback wallet: summary, activated items and a next-step nudge. */
export interface CashbackData {
  earnedThisMonth: string;
  pending: string;
  vPoints: string;
  items: CashbackItem[];
  nudge: { title: string; body: string; cta: string; chapter: number };
}

/**
 * Illustrative per-persona cashback wallet. Reuses the offer/product imagery
 * already in /public. All values are for demonstration only.
 */
export const cashbackByUser: Record<AppUserId, CashbackData> = {
  // New Cardholder — small welcome-phase amounts, everyday focus
  1: {
    earnedThisMonth: '¥180',
    pending: '¥620',
    vPoints: '500',
    items: [
      {
        merchant: 'SMCC',
        title: 'Welcome first-purchase boost',
        amount: '20% back',
        status: 'Active',
        image: '/main_offer_asset1.webp',
        logo: '/smbc-logo.svg',
        note: 'On your first purchase this month.',
      },
      {
        merchant: 'SMCC',
        title: 'New-member everyday cashback',
        amount: '3% back',
        status: 'Active',
        image: '/second_offer-2.jpg',
        logo: '/smbc-logo.svg',
        note: 'On every purchase for your first 90 days.',
      },
      {
        merchant: 'Zojirushi',
        title: 'Insulated travel mug',
        amount: '¥320',
        status: 'Pending',
        image: '/muse/mug.webp',
        logo: '/smbc-logo.svg',
        note: 'Cashback confirming from your recent buy.',
      },
      {
        merchant: 'Dining',
        title: 'Everyday dining cashback',
        amount: '5% back',
        status: 'Active',
        icon: 'restaurant',
        note: 'At participating cafés and restaurants.',
      },
    ],
    nudge: {
      title: 'Start earning more cashback',
      body: 'Shop the marketplace to earn cashback and V Points on everyday buys.',
      cta: 'Go to marketplace',
      chapter: 2,
    },
  },

  // Singapore Traveller — travel cashback amounts, trip focus
  2: {
    earnedThisMonth: '¥2,450',
    pending: '¥1,800',
    vPoints: '28,900',
    items: [
      {
        merchant: 'SMCC Travel',
        title: 'Marina Bay dining',
        amount: '10% back',
        status: 'Active',
        image: '/marinabay-dining.webp',
        logo: '/smbc-logo.svg',
        note: 'Dining cashback during your Singapore trip.',
      },
      {
        merchant: 'Klook',
        title: 'Attraction tickets',
        amount: '10% back',
        status: 'Active',
        image: '/singapore-tickets.jpg',
        logo: '/klook-logo.png',
        note: 'Book experiences and earn as you go.',
      },
      {
        merchant: 'SMCC Travel',
        title: 'Airport transfers',
        amount: '¥1,800',
        status: 'Pending',
        image: '/singapore-airport-transfer.webp',
        logo: '/smbc-logo.svg',
        note: 'Cashback confirming for MRT & transfers.',
      },
      {
        merchant: 'SMCC Travel',
        title: 'Changi lounge access',
        amount: 'Benefit',
        status: 'Earned',
        image: '/Changi-Lounge.jpg',
        logo: '/smbc-logo.svg',
        note: 'Complimentary lounge access unlocked.',
      },
    ],
    nudge: {
      title: 'Get set for Singapore',
      body: 'Activate travel cashback and shop trip essentials before you fly.',
      cta: 'Shop travel picks',
      chapter: 2,
    },
  },
};

export const cashbackDataFor = (id: AppUserId): CashbackData => cashbackByUser[id];
