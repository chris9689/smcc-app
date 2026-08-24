import type { AppUserId, AppUserProfile, LoyaltyStatus } from '@/types';
import { loyaltyStatus } from './loyalty';

/** Build a per-user loyalty status by overriding the shared base. */
const makeLoyalty = (overrides: Partial<LoyaltyStatus>): LoyaltyStatus => ({
  ...loyaltyStatus,
  ...overrides,
});

/**
 * Home-experience definitions for the two demo personas.
 *
 * Each profile drives:
 *  - the greeting/context on the home screen,
 *  - the "Available balance", "Loyalty status" and "Spending Insight" cards,
 *  - the main "Recommended for you" offer card,
 *  - the "Why shown now" panel (narrative + reasons + alternatives),
 *  - the Presenter-mode narrative used to explain the personalisation.
 *
 * The two personas demonstrate the core message: any offer, benefit, reward,
 * cashback opportunity or support experience can be personalised, explained
 * and surfaced at the right moment based on customer context.
 *
 *  1 — New Cardholder      · recently onboarded, welcome phase, support-led
 *  2 — Singapore Traveller · travel intent from a Marina Bay hotel booking
 */
export const appUserProfiles: Record<AppUserId, AppUserProfile> = {
  // Persona 1 — Aoi Suzuki · new cardholder, welcome phase
  1: {
    id: 1,
    name: 'Aoi Suzuki',
    greeting: 'Welcome',
    context: 'Joined 8 days ago · Card just activated · Still exploring benefits.',
    pointsBalance: 500,
    cardImage: '/smcc-card-sand.svg',
    loyalty: makeLoyalty({
      rank: 'Basic',
      nextRank: 'Advanced',
      progressToNext: 15,
      monthlyActivitiesCounted: 2,
      monthlyActivitiesTarget: 10,
    }),
    spendingInsight:
      "You're in your welcome period. Activating your first cashback offer is the quickest way to start earning — and Shopping Muse can answer any question about how your card works.",
    offers: [
      {
        source: 'SMCC Offer',
        merchant: 'SMCC',
        category: 'Welcome',
        type: 'cashback',
        title: 'Welcome to SMCC — your first-purchase boost',
        header: 'Earn 5% cashback on your first purchase this month.',
        cta: 'Activate welcome offer',
        image: '/pickup_uniqlo.png',
        logo: '/smbc-logo.svg',
      },
      {
        source: 'Cashback',
        merchant: 'SMCC',
        category: 'Welcome',
        type: 'cashback',
        title: 'A head start for new members',
        header: 'Activate 3% everyday cashback for your first 90 days.',
        cta: 'Activate cashback',
        image: '/products/rice_cooker.webp',
        logo: '/smbc-logo.svg',
      },
    ],
    gridOffers: [
      { merchant: 'SMCC', title: 'First purchase reward', type: 'cashback', image: '/products/electric_kettle.webp', logo: '/smbc-logo.svg' },
      { merchant: 'SMCC Mall', title: 'Welcome points bonus', type: 'points', image: '/products/warm_lightening_set.webp', logo: '/smbc-logo.svg' },
      { merchant: 'Shopping Muse', title: 'How cashback works', type: 'guide', icon: 'help' },
      { merchant: 'SMCC', title: 'Everyday dining cashback', type: 'cashback', image: '/products/air_purifier.webp', logo: '/smbc-logo.svg' },
    ],
    gridTitle: 'Get started with your card',
    whyShownNow:
      "You're seeing these offers because you recently activated your card and are still within your welcome period. These cashback opportunities are designed for new cardholders and are prioritised based on your profile and likely shopping interests.",
    why: [
      {
        icon: 'celebration',
        label: 'Recently joined',
        detail: 'You joined the SMCC programme just over a week ago.',
      },
      {
        icon: 'credit_score',
        label: 'Card just activated',
        detail: 'Your card was activated recently and is ready to use.',
      },
      {
        icon: 'history_toggle_off',
        label: 'No purchase history yet',
        detail: 'With little spend so far, welcome-phase offers are prioritised.',
      },
      {
        icon: 'person',
        label: 'Profile signals',
        detail: 'Profile and demographic signals help rank beginner-friendly offers.',
      },
    ],
    alternatives: [
      {
        source: 'SMCC Offer',
        label: 'Support on hand',
        title: 'Shopping Muse · FAQs',
        cta: 'New to cashback? Ask Muse how earning, timing and eligible merchants work.',
      },
    ],
    pointsNudge: {
      icon: 'military_tech',
      eyebrow: 'V Points · Status boost',
      title: "You're 8 activities from Advanced",
      body: 'Earn V Points on everyday spend to reach Advanced status — and unlock more personalised offers and richer benefits.',
      cta: 'Ways to earn points',
    },
    presenter: {
      role: 'New Cardholder',
      headline: 'Recently onboarded member, still in the welcome period, looking for guidance.',
      signals: [
        'Joined the programme 8 days ago',
        'Card activated, minimal transaction history',
        'Browsing benefits and FAQ content',
        'Profile & demographic signals only (no spend pattern yet)',
      ],
      rationale:
        'With no meaningful spend history, personalisation leans on onboarding stage and profile signals — so welcome, first-purchase and activation offers are prioritised, alongside proactive support.',
      objectives: [
        'Show welcome & first-purchase cashback feel personalised, not generic',
        'Demonstrate Shopping Muse answering FAQs and card questions',
        'Show support and offers coexisting in one experience',
      ],
      keyOffers: [
        'Welcome: 5% cashback on first purchase',
        'New-member 3% everyday cashback (first 90 days)',
        'Welcome points bonus & first-purchase reward',
      ],
      musePrompts: [
        'How do I earn cashback?',
        'What benefits come with my card?',
        'Which merchants offer cashback?',
        'How long does cashback take to appear?',
        'Can I use my card abroad?',
      ],
      whyNow:
        'Recently activated card and no significant purchase history mean this customer is in the welcome phase. We prioritise beginner-friendly cashback and support, ranked using profile and demographic signals.',
    },
  },

  // Persona 2 — Kenji Nakamura · Singapore traveller
  2: {
    id: 2,
    name: 'Kenji Nakamura',
    context: 'Just booked a Marina Bay hotel · Singapore trip in 3 weeks.',
    pointsBalance: 28900,
    cardImage: '/smcc-card-graphite.svg',
    loyalty: makeLoyalty({
      rank: 'VIP',
      nextRank: 'Super VIP',
      progressToNext: 62,
      monthlyActivitiesCounted: 22,
      monthlyActivitiesTarget: 30,
    }),
    spendingInsight:
      'We noticed a Singapore hotel booking on your card. Singapore travel, dining and cashback offers are prioritised for you until your trip.',
    offers: [
      {
        source: 'Travel Offer',
        merchant: 'SMCC Travel',
        category: 'Travel',
        type: 'cashback',
        title: 'Get set for Singapore',
        header: 'Activate 10% cashback on Marina Bay dining for your trip',
        cta: 'Activate cashback',
        image: '/marinabay-dining.webp',
        logo: '/smbc-logo.svg',
      },
    ],
    gridOffers: [
      { merchant: 'SMCC Mall', title: 'Singapore shopping', type: 'cashback', image: '/singapore-shopping-mall.jpg', logo: '/smbc-logo.svg' },
      { merchant: 'SMCC Travel', title: 'Airport transfer', type: 'travel', image: '/singapore-airport-transfer.webp', logo: '/smbc-logo.svg' },
      { merchant: 'Klook', title: 'Attraction tickets', type: 'cashback', image: '/singapore-tickets.jpg', logo: '/klook-logo.png' },
      { merchant: 'SMCC Travel', title: 'Lounge access', type: 'travel', image: '/Changi-Lounge.jpg', logo: '/smbc-logo.svg' },
    ],
    gridTitle: 'Make the most of Singapore',
    whyShownNow:
      'We detected a recent travel-related purchase and a hotel booking associated with Singapore. These offers are being prioritised because they are relevant to your upcoming trip and likely spending needs.',
    why: [
      {
        icon: 'hotel',
        label: 'Singapore hotel booking',
        detail: 'A Marina Bay hotel booking was detected on the card.',
      },
      {
        icon: 'flight_takeoff',
        label: 'Travel intent · Singapore',
        detail: 'Destination inferred as Singapore; content re-ranked to match.',
      },
      {
        icon: 'restaurant',
        label: 'Travel spending patterns',
        detail: 'Dining, retail and airport offers suit likely trip spending.',
      },
      {
        icon: 'schedule',
        label: 'Trip window',
        detail: 'Offers are timed to his upcoming three-week trip window.',
      },
    ],
    alternatives: [
      {
        source: 'Travel Offer',
        label: 'Lounge benefit',
        cta: 'Complimentary Changi lounge access to start the trip comfortably.',
      },
      {
        source: 'Cashback',
        label: 'Dining cashback',
        cta: 'Extra cashback on Singapore dining while Kenji is in town.',
      },
    ],
    pointsNudge: {
      icon: 'health_and_safety',
      eyebrow: 'V Points · Travel benefit',
      title: 'Upgrade your travel insurance',
      body: 'Heading to Singapore? Redeem V Points to upgrade to premium travel cover — more protection for your trip, for less.',
      cta: 'Upgrade with points',
    },
    presenter: {
      role: 'Singapore Traveller',
      headline: 'Established cardholder with a strong travel-intent signal for an upcoming Singapore trip.',
      signals: [
        'Recent Marina Bay hotel booking on the card',
        'Travel-related purchase / spend signal detected',
        'Destination inferred as Singapore',
        'Trip window: ~3 weeks out',
      ],
      rationale:
        'A concrete travel transaction lets us confidently re-rank the whole experience around Singapore — travel, dining, airport and retail offers plus relevant card benefits — timed to the trip.',
      objectives: [
        'Show travel intent dynamically changing recommendations',
        'Demonstrate multi-source offers unified (travel, dining, cashback, benefits)',
        'Show Shopping Muse as a travel-commerce marketplace with cashback',
      ],
      keyOffers: [
        '10% cashback on Marina Bay dining',
        'Marina Bay hotels & Changi lounge access',
        'MRT / airport transfers & Singapore retail',
      ],
      musePrompts: [
        'Best things to do in Singapore',
        'Where should I stay near Marina Bay?',
        'What travel benefits do I have with my card?',
        'Can I earn cashback on dining in Singapore?',
        'Show me luxury shopping offers in Singapore',
      ],
      whyNow:
        'A recent hotel booking and travel purchase tied to Singapore tell us a trip is coming. We prioritise Singapore travel, dining and cashback offers so they are useful before and during the trip.',
    },
  },
};

export const appUserProfileById = (id: AppUserId): AppUserProfile =>
  appUserProfiles[id];
