/**
 * Shared domain types for the Digital Rewards Hub prototype.
 * All values are illustrative and for demonstration only.
 */

export type PersonaState = 'linked' | 'notLinked' | 'underEngaged';

export type HappyProgramRank =
  | 'Basic'
  | 'Advanced'
  | 'Premium'
  | 'VIP'
  | 'Super VIP';

export interface User {
  id: string;
  name: string;
  ageBand: string;
  household: string;
  cardholderType: string;
  weeklyShopper: boolean;
  recentHomePurchases: string[];
  currentIntent: string;
  hypothesis: string;
  consent: boolean;
  linkedHappyProgram: boolean;
  suppressionFlag: boolean;
  happyProgramRank: HappyProgramRank;
  /** Illustrative point balance. Not a real balance. */
  pointsBalance: number;
  avatarInitials: string;
}

export type ProductCategory =
  | 'Kitchen'
  | 'Living'
  | 'Home'
  | 'Appliances'
  | 'Lighting';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  /** Illustrative point-back rate as a percentage. */
  pointRate: number;
  emoji: string;
  /** Optional stock photo URL. Falls back to the emoji tile if it fails. */
  image?: string;
  tag?: string;
  rating: number;
  intentSignal?: boolean;
}

export type OfferKind =
  | 'household'
  | 'electronics'
  | 'activity'
  | 'points-utility'
  | 'recap-action';

export interface Offer {
  id: string;
  kind: OfferKind;
  title: string;
  subtitle: string;
  description: string;
  /** Illustrative value framing e.g. "Up to 10% back in points". */
  valueLabel: string;
  emoji: string;
  /** Relevance score 0-100 produced by the mock decision engine. */
  baseScore: number;
  cashbackLinked: boolean;
  requiresLinked: boolean;
  disclaimer: string;
}

export interface HappyProgramMechanic {
  id: string;
  label: string;
  description: string;
  progress: number; // 0-100
  target: string;
}

export interface LoyaltyStatus {
  rank: HappyProgramRank;
  nextRank: HappyProgramRank;
  progressToNext: number; // 0-100
  monthlyActivitiesCounted: number;
  monthlyActivitiesTarget: number;
  benefits: LoyaltyBenefit[];
  mechanics: HappyProgramMechanic[];
}

export interface LoyaltyBenefit {
  id: string;
  label: string;
  detail: string;
  available: boolean;
  icon: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  audience: string;
  status: 'live' | 'draft' | 'scheduled';
  dyExperienceId: string;
}

export interface Recommendation {
  id: string;
  productId: string;
  reason: string;
}

export type SignalCategory = 'behaviour' | 'context' | 'membership' | 'intent';

export interface Signal {
  id: string;
  label: string;
  detail: string;
  category: SignalCategory;
  icon: string;
  /** Weight contributed to the winning decision (illustrative). */
  weight: number;
}

export interface Guardrail {
  id: string;
  label: string;
  detail: string;
  /** Whether the guardrail passes for the current persona. */
  passes: (persona: PersonaState) => boolean;
}

export interface RankedOffer {
  offer: Offer;
  score: number;
  reasons: string[];
}

export interface RecapMetric {
  id: string;
  label: string;
  value: string;
  caption: string;
  icon: string;
  accent: 'red' | 'orange' | 'green' | 'amber';
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: string;
}

export interface Settings {
  appName: string;
  tagline: string;
  poweredBy: string;
  currency: string;
  disclaimers: {
    illustrative: string;
    programmeRules: string;
    pointsTiming: string;
    cardLinked: string;
  };
}

export interface Chapter {
  id: number;
  key: string;
  title: string;
  copy: string;
  /** Icon shown in the presenter stepper. */
  icon: string;
}

/** Selectable app-user id driving the home experience variant (1-4). */
export type AppUserId = 1 | 2 | 3 | 4;

/**
 * Source/network an offer originates from. SMCC brings together offers from
 * any source, so these are generic and network-agnostic.
 * - 'SMCC Offer'    — first-party benefit or promotion
 * - 'Partner Offer' — merchant/marketplace partner offer
 * - 'Cashback'      — card-linked cashback opportunity
 * - 'Travel Offer'  — travel or partner-network offer
 */
export type OfferSource = 'SMCC Offer' | 'Partner Offer' | 'Cashback' | 'Travel Offer';

/**
 * A single "Why shown now" reason surfaced in the left panel when the
 * customer taps the recommended offer.
 */
export interface WhyReason {
  /** Material Symbols icon name. */
  icon: string;
  /** Short reason title. */
  label: string;
  /** Supporting one-line explanation. */
  detail: string;
}

/**
 * The main targeted offer rendered in the home "Recommended for you" card
 * for a given app user. The 2x2 grid is complemented by separately-defined
 * offers from the same {@link AppUserOffer.category}.
 */
export interface AppUserOffer {
  /** Offer source/network (SMCC / Partner / Cashback / Travel). */
  source: OfferSource;
  /** Merchant / partner name. */
  merchant: string;
  /** Offer category — used to complement the 2x2 grid offers. */
  category: string;
  /** Offer mechanic, e.g. 'points', 'discount', 'cashback', 'travel'. */
  type: string;
  /** Section title shown above the offer (e.g. "A top lunch pick..."). */
  title: string;
  /** Header line shown on the offer card (the dynamic CTA copy). */
  header: string;
  /** Short call-to-action button label. */
  cta: string;
  /** Hero image path served from /public. */
  image: string;
  /** Optional partner logo path served from /public. */
  logo?: string;
}

/**
 * An alternative or supporting offer considered by the decisioning, shown in
 * the "Why shown now" panel to narrate the ranking.
 */
export interface AlternativeOffer {
  source: OfferSource;
  /** Grouping label, e.g. "Alternative considered" or "Secondary offer". */
  label: string;
  /** Optional product / offer title. */
  title?: string;
  /** Dynamic CTA copy for the alternative. */
  cta: string;
}

/** Full home-experience definition for one of the four app users. */
export interface AppUserProfile {
  id: AppUserId;
  /** Persona display name, e.g. "Hanako Tanaka". */
  name: string;
  /** One-line situational context for the persona (time / activity). */
  context: string;
  /** Greeting prefix shown before the name (defaults to "Good morning"). */
  greeting?: string;
  /** Illustrative points balance shown in the "Available balance" card. */
  pointsBalance: number;
  /** Card artwork path (in /public) shown in the balance card. */
  cardImage: string;
  /** Per-user V Point program loyalty status (rank, progress, activities). */
  loyalty: LoyaltyStatus;
  /** Per-user "Spending Insight" body copy. */
  spendingInsight: string;
  /** The main targeted "Recommended for you" offers (one or more). */
  offers: AppUserOffer[];
  /**
   * Complementary offers rendered in the 2x2 "Offers for you" grid. Expect
   * four entries; typically from the same category as {@link offer}.
   */
  gridOffers: GridOffer[];
  /** Optional heading for the 2x2 grid section (defaults to "Offers for you"). */
  gridTitle?: string;
  /** Narrative summary shown at the top of the "Why shown now" panel. */
  whyShownNow: string;
  /** Ordered reasons shown in the "Why shown now" panel. */
  why: WhyReason[];
  /** Alternative / supporting offers considered, shown in the panel. */
  alternatives?: AlternativeOffer[];
}

/**
 * A complementary offer shown in the 2x2 home grid. Lighter-weight than the
 * main {@link AppUserOffer}; usually shares the main offer's category.
 */
export interface GridOffer {
  /** Merchant / partner name. */
  merchant: string;
  /** Short offer title. */
  title: string;
  /** Offer mechanic, e.g. 'points', 'discount', 'cashback', 'bundle'. */
  type: string;
  /** Optional thumbnail image path served from /public. */
  image?: string;
  /** Optional merchant logo path served from /public (shown in place of the merchant name). */
  logo?: string;
  /** Material Symbols icon name shown when no image is provided. */
  icon?: string;
}
