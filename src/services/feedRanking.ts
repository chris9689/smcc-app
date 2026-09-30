/**
 * Client-side personalised feed ranking.
 *
 * A deterministic, offline re-ranker that proves personalisation and real-time
 * context on-screen: changing the presenter-mode context (time / location /
 * weather) or the optimisation objective (cashback / margin / acquisition)
 * visibly reorders the feed and rewrites each item's reason line.
 *
 * All values are illustrative and for demonstration only.
 */

import { museProductById, type MuseProduct } from '@/mock-data/muse';
import type { AppUserId } from '@/types';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export type LocationCtx = 'home' | 'commute' | 'mall';
export type WeatherCtx = 'clear' | 'rain' | 'hot';
export type Objective = 'cashback' | 'margin' | 'acquisition';

export interface FeedContext {
  time: TimeOfDay;
  location: LocationCtx;
  weather: WeatherCtx;
}

/** The five decisioning models tagged on each card in presenter/console mode. */
export type ModelKind =
  | 'rule-based'
  | 'collaborative'
  | 'semantic'
  | 'ml-ranking'
  | 'bandit';

export const modelMeta: Record<ModelKind, { label: string; className: string }> = {
  'rule-based': { label: 'Rule based', className: 'bg-slate-100 text-slate-600' },
  collaborative: { label: 'Affinity based', className: 'bg-indigo-100 text-indigo-700' },
  semantic: { label: 'Context based', className: 'bg-teal-100 text-teal-700' },
  'ml-ranking': { label: 'ML based', className: 'bg-violet-100 text-violet-700' },
  bandit: { label: 'Location based', className: 'bg-amber-100 text-amber-700' },
};

export const objectiveMeta: Record<Objective, { label: string; short: string; icon: string }> = {
  cashback: { label: 'Maximise cashback', short: 'Cashback', icon: 'savings' },
  margin: { label: 'Maximise margin', short: 'Margin', icon: 'trending_up' },
  acquisition: { label: 'New-member acquisition', short: 'Acquisition', icon: 'person_add' },
};

/**
 * Illustrative A/B experiment + uplift readout shown in the console header.
 * The headline metrics track the selected objective so switching "Optimise feed
 * for" visibly moves the experiment story, not just the feed order.
 */
export const experimentReadoutByObjective: Record<
  Objective,
  { variant: string; primary: string; secondary: string }
> = {
  cashback: { variant: 'Variant B', primary: '+18% CTR', secondary: '+12% redemption' },
  margin: { variant: 'Variant C', primary: '+11% gross margin', secondary: '+6% basket value' },
  acquisition: { variant: 'Variant A', primary: '+24% new-member signups', secondary: '+19% CTR' },
};

interface FeedMeta {
  model: ModelKind;
  /** Default personal reason line ("Because ..."). */
  reason: string;
  /** Relative gross margin (0–100), drives the "margin" objective. */
  margin: number;
  /** New-member acquisition value (0–100), drives the "acquisition" objective. */
  acquisition: number;
  /** Distance to the nearest participating merchant, metres. */
  distanceM: number;
  /** Illustrative offer expiry copy. */
  expiry: string;
  /** Score bonus per active context value. */
  contextBoost: Partial<Record<TimeOfDay | LocationCtx | WeatherCtx, number>>;
  /** Reason line that replaces the default when a context value is dominant. */
  contextReason?: Partial<Record<TimeOfDay | LocationCtx | WeatherCtx, string>>;
}

/**
 * Per-product feed metadata. Persona 1 (New Cardholder) is fully authored;
 * other products fall back to sensible defaults so nothing breaks.
 */
const feedMetaById: Record<string, FeedMeta> = {
  'm-mug': {
    model: 'rule-based',
    reason: 'Popular first buy for new members like you',
    margin: 55,
    acquisition: 90,
    distanceM: 400,
    expiry: 'New-member offer',
    contextBoost: { morning: 9, hot: 3 },
    contextReason: {
      morning: 'On your morning coffee run — trending now',
      hot: 'Warm day nearby — keep drinks cold',
    },
  },
  'm-tote': {
    model: 'collaborative',
    reason: 'Members like you bought this next',
    margin: 80,
    acquisition: 60,
    distanceM: 650,
    expiry: 'Ends in 5 days',
    contextBoost: { mall: 8, afternoon: 3 },
    contextReason: { mall: 'You’re near the mall — grab-and-go pick' },
  },
  'm-notebook': {
    model: 'ml-ranking',
    reason: 'Ranked for how you’ve browsed so far',
    margin: 85,
    acquisition: 40,
    distanceM: 1200,
    expiry: 'Ends in 9 days',
    contextBoost: { home: 6, morning: 3 },
    contextReason: { home: 'A calm at-home essential' },
  },
  'm-sunglasses': {
    model: 'bandit',
    reason: 'Trending with new cardholders right now',
    margin: 40,
    acquisition: 30,
    distanceM: 300,
    expiry: 'Ends in 2 days',
    contextBoost: { clear: 11, hot: 7, afternoon: 5 },
    contextReason: {
      clear: 'Sunny near you right now — polarised picks',
      hot: 'Hot day nearby — sun-ready in minutes',
      afternoon: 'Afternoon sun near you',
    },
  },
  'm-powerbank': {
    model: 'semantic',
    reason: 'Matches the ‘everyday essentials’ you viewed',
    margin: 50,
    acquisition: 45,
    distanceM: 900,
    expiry: 'Ends in 6 days',
    contextBoost: { commute: 8, evening: 3 },
    contextReason: { commute: 'On the move — stay charged today' },
  },
  'm-polo': {
    model: 'collaborative',
    reason: 'Frequently bought by new cardholders',
    margin: 70,
    acquisition: 50,
    distanceM: 750,
    expiry: 'Ends in 4 days',
    contextBoost: { hot: 9, afternoon: 4 },
    contextReason: { hot: 'Hot and humid nearby — quick-dry pick' },
  },
  'm-cap': {
    model: 'collaborative',
    reason: 'Pairs with your sunny-day picks',
    margin: 45,
    acquisition: 40,
    distanceM: 350,
    expiry: 'Ends in 3 days',
    contextBoost: { clear: 10, hot: 6 },
  },
  'm-bottle': {
    model: 'semantic',
    reason: 'Stay hydrated on warm days',
    margin: 50,
    acquisition: 45,
    distanceM: 500,
    expiry: 'Ends in 5 days',
    contextBoost: { hot: 11, clear: 4 },
  },
  'm-umbrella': {
    model: 'bandit',
    reason: 'Rain forecast near you',
    margin: 55,
    acquisition: 35,
    distanceM: 250,
    expiry: 'Ends in 2 days',
    contextBoost: { rain: 12 },
  },
  'm-sunscreen': {
    model: 'ml-ranking',
    reason: 'Ranked for bright, sunny days',
    margin: 60,
    acquisition: 50,
    distanceM: 450,
    expiry: 'Ends in 4 days',
    contextBoost: { clear: 9, hot: 7 },
  },
  // Singapore Traveller (Kenji) picks
  'm-carryon': {
    model: 'ml-ranking',
    reason: 'Ranked for your upcoming trip',
    margin: 75,
    acquisition: 55,
    distanceM: 1100,
    expiry: 'Ends in 6 days',
    contextBoost: {},
  },
  'm-adapter': {
    model: 'rule-based',
    reason: 'Type G plug — essential for Singapore',
    margin: 40,
    acquisition: 85,
    distanceM: 600,
    expiry: 'Best cashback',
    contextBoost: {},
  },
  'm-earbuds': {
    model: 'collaborative',
    reason: 'Travellers like you bought these',
    margin: 65,
    acquisition: 45,
    distanceM: 900,
    expiry: 'Ends in 5 days',
    contextBoost: { rain: 5 },
  },
  'm-perfume': {
    model: 'semantic',
    reason: 'Matches your Orchard Road luxury picks',
    margin: 88,
    acquisition: 30,
    distanceM: 500,
    expiry: 'Ends in 7 days',
    contextBoost: {},
  },
  'm-watch': {
    model: 'bandit',
    reason: 'Trending at ION Orchard right now',
    margin: 90,
    acquisition: 25,
    distanceM: 450,
    expiry: 'Ends in 8 days',
    contextBoost: {},
  },
  'm-blazer': {
    model: 'semantic',
    reason: 'Breathable pick for humid evenings',
    margin: 70,
    acquisition: 50,
    distanceM: 700,
    expiry: 'Editor’s pick',
    contextBoost: { hot: 6 },
  },
  'm-sneakers': {
    model: 'collaborative',
    reason: 'Cushioned for long days of walking',
    margin: 60,
    acquisition: 55,
    distanceM: 820,
    expiry: 'Trending',
    contextBoost: { clear: 4 },
  },
};

const defaultMeta: FeedMeta = {
  model: 'ml-ranking',
  reason: 'Picked for you',
  margin: 50,
  acquisition: 40,
  distanceM: 800,
  expiry: 'Limited time',
  contextBoost: {},
};

/** Products that make up the personalised feed for each persona. */
export const feedProductIdsByUser: Record<AppUserId, string[]> = {
  1: ['m-mug', 'm-sunglasses', 'm-tote', 'm-notebook', 'm-powerbank', 'm-polo'],
  2: ['m-adapter', 'm-carryon', 'm-earbuds', 'm-powerbank', 'm-perfume', 'm-sunglasses'],
};

export const defaultFeedContext: FeedContext = {
  time: 'morning',
  location: 'home',
  weather: 'clear',
};

export interface RankedFeedItem {
  product: MuseProduct;
  score: number;
  reason: string;
  model: ModelKind;
  modelLabel: string;
  modelClassName: string;
  distanceM: number;
  expiry: string;
}

export function feedMetaFor(productId: string): {
  model: ModelKind;
  modelLabel: string;
  modelClassName: string;
  distanceM: number;
  expiry: string;
} {
  const meta = feedMetaById[productId] ?? defaultMeta;
  const m = modelMeta[meta.model];
  return {
    model: meta.model,
    modelLabel: m.label,
    modelClassName: m.className,
    distanceM: meta.distanceM,
    expiry: meta.expiry,
  };
}

/**
 * Rank the personalised feed for a persona under the current context and
 * objective. `boostCategory` lifts items sharing a just-redeemed category so
 * the feed visibly re-ranks after the discover → shop → earn → redeem loop.
 */
export function rankFeed(
  appUser: AppUserId,
  context: FeedContext,
  objective: Objective,
  boostCategory?: string | null,
): RankedFeedItem[] {
  const ids = feedProductIdsByUser[appUser] ?? [];
  const active: (TimeOfDay | LocationCtx | WeatherCtx)[] = [
    context.time,
    context.location,
    context.weather,
  ];

  const items = ids
    .map((id) => {
      const product = museProductById(id);
      if (!product) return null;
      const meta = feedMetaById[id] ?? defaultMeta;

      let score = 10;
      if (objective === 'cashback') score += product.cashbackPct * 3;
      else if (objective === 'margin') score += meta.margin;
      else score += meta.acquisition;

      let bestKey: TimeOfDay | LocationCtx | WeatherCtx | undefined;
      let bestBoost = 0;
      for (const key of active) {
        const boost = meta.contextBoost[key] ?? 0;
        score += boost;
        if (boost > bestBoost) {
          bestBoost = boost;
          bestKey = key;
        }
      }

      if (boostCategory && product.category === boostCategory) score += 45;

      const reason =
        bestKey && bestBoost > 0 && meta.contextReason?.[bestKey]
          ? (meta.contextReason[bestKey] as string)
          : meta.reason;

      const m = modelMeta[meta.model];
      const item: RankedFeedItem = {
        product,
        score,
        reason,
        model: meta.model,
        modelLabel: m.label,
        modelClassName: m.className,
        distanceM: meta.distanceM,
        expiry: meta.expiry,
      };
      return item;
    })
    .filter((i): i is RankedFeedItem => i !== null);

  return items.sort((a, b) => b.score - a.score);
}

/** Format a distance in metres to a compact label (e.g. "300 m", "1.2 km"). */
export function formatDistance(m: number): string {
  return m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;
}

/** A context-titled area of the personalised feed (headline + a couple of cards). */
export interface FeedGroup {
  id: string;
  headline: string;
  icon: string;
  items: RankedFeedItem[];
}

/**
 * Weather-driven feed area. The headline is the context rail (promoted from the
 * per-card reason), and it swaps live when the presenter changes the weather.
 * Each pool holds more products than shown so the objective can pick between
 * high-cashback (acquisition/cashback) and low-cashback (margin) picks.
 */
interface WeatherArea {
  headline: string;
  icon: string;
  pool: string[];
}

const weatherAreasByUser: Record<AppUserId, Record<WeatherCtx, WeatherArea>> = {
  1: {
    clear: { headline: 'Sunny near you right now', icon: 'wb_sunny', pool: ['m-sunglasses', 'm-cap', 'm-sunscreen', 'm-bottle'] },
    hot: { headline: 'Beat the heat nearby', icon: 'thermostat', pool: ['m-polo', 'm-bottle', 'm-mug', 'm-sunglasses'] },
    rain: { headline: 'Rainy day essentials', icon: 'rainy', pool: ['m-umbrella', 'm-tote', 'm-powerbank', 'm-notebook'] },
  },
  2: {
    clear: { headline: 'Sunny in Singapore right now', icon: 'wb_sunny', pool: ['m-sunglasses', 'm-sunscreen', 'm-cap', 'm-sneakers'] },
    hot: { headline: 'Beat the Singapore heat', icon: 'thermostat', pool: ['m-polo', 'm-bottle', 'm-blazer', 'm-sunglasses'] },
    rain: { headline: 'Sudden downpour nearby', icon: 'rainy', pool: ['m-umbrella', 'm-earbuds', 'm-powerbank', 'm-adapter'] },
  },
};

/** Second feed area when nothing's been redeemed — headline follows the objective. */
const defaultSpotlightByUser: Record<AppUserId, { icon: string; pool: string[] }> = {
  1: { icon: 'trending_up', pool: ['m-mug', 'm-notebook', 'm-tote', 'm-powerbank'] },
  2: { icon: 'trending_up', pool: ['m-carryon', 'm-adapter', 'm-earbuds', 'm-perfume'] },
};

const defaultSpotlightHeadline: Record<Objective, string> = {
  cashback: 'Top cashback picks for you',
  margin: 'Smart everyday value',
  acquisition: 'New-member favourites',
};

/**
 * Predefined "goes-with" spotlight per redeemed product — a simple, explicit
 * rule set (no learned logic) so redeeming in Muse always re-ranks the feed on
 * return to Home. The FIRST id in each pool is the guaranteed "product B": it is
 * pinned to the top of the spotlight and reserved before the weather group so
 * it is never cannibalised. Every redeemable product has an entry so a visible
 * change always happens.
 */
const postRedeemSpotlight: Record<string, { headline: string; icon: string; pool: string[] }> = {
  'm-sunglasses': { headline: 'Complete your sunny-day kit', icon: 'wb_sunny', pool: ['m-cap', 'm-sunscreen', 'm-bottle'] },
  'm-cap': { headline: 'Round out your warm-weather look', icon: 'checkroom', pool: ['m-sunglasses', 'm-sunscreen', 'm-polo'] },
  'm-polo': { headline: 'Style it out in the sun', icon: 'checkroom', pool: ['m-sunglasses', 'm-cap', 'm-bottle'] },
  'm-bottle': { headline: 'Keep cool on the move', icon: 'water_drop', pool: ['m-cap', 'm-sunglasses', 'm-powerbank'] },
  'm-umbrella': { headline: 'Stay dry and ready', icon: 'umbrella', pool: ['m-tote', 'm-powerbank', 'm-notebook'] },
  'm-mug': { headline: 'For your daily coffee run', icon: 'local_cafe', pool: ['m-tote', 'm-notebook', 'm-bottle'] },
  'm-tote': { headline: 'Everyday carry picks', icon: 'shopping_bag', pool: ['m-notebook', 'm-powerbank', 'm-mug'] },
  'm-notebook': { headline: 'Complete your everyday desk kit', icon: 'edit_note', pool: ['m-mug', 'm-tote', 'm-powerbank'] },
  'm-sneakers': { headline: 'Gear up for long days out', icon: 'directions_walk', pool: ['m-polo', 'm-cap', 'm-bottle'] },
  'm-blazer': { headline: 'Complete the smart-casual look', icon: 'checkroom', pool: ['m-sneakers', 'm-watch', 'm-sunglasses'] },
  'm-powerbank': { headline: 'Power up your day kit', icon: 'bolt', pool: ['m-earbuds', 'm-adapter', 'm-carryon'] },
  // Traveller (Kenji) complements
  'm-carryon': { headline: 'Pack smart for your trip', icon: 'luggage', pool: ['m-adapter', 'm-powerbank', 'm-earbuds'] },
  'm-adapter': { headline: 'Trip tech that goes with it', icon: 'bolt', pool: ['m-powerbank', 'm-earbuds', 'm-carryon'] },
  'm-earbuds': { headline: 'Sorted for the flight', icon: 'headphones', pool: ['m-powerbank', 'm-adapter', 'm-blazer'] },
  'm-perfume': { headline: 'More Orchard Road luxury', icon: 'diamond', pool: ['m-watch', 'm-blazer', 'm-sunglasses'] },
  'm-watch': { headline: 'Finish the look', icon: 'diamond', pool: ['m-perfume', 'm-blazer', 'm-sunglasses'] },
  'm-gardens': { headline: 'Make a day of it in Singapore', icon: 'photo_camera', pool: ['m-sunglasses', 'm-cap', 'm-sneakers'] },
  'm-nightsafari': { headline: 'Set for your night out', icon: 'dark_mode', pool: ['m-earbuds', 'm-powerbank', 'm-sneakers'] },
};

/** Build a feed item straight from a product id, reusing its authored metadata. */
export function feedItemFor(productId: string): RankedFeedItem | null {
  const product = museProductById(productId);
  if (!product) return null;
  const meta = feedMetaById[productId] ?? defaultMeta;
  const m = modelMeta[meta.model];
  return {
    product,
    score: 0,
    reason: meta.reason,
    model: meta.model,
    modelLabel: m.label,
    modelClassName: m.className,
    distanceM: meta.distanceM,
    expiry: meta.expiry,
  };
}

/**
 * Objective ranking — cashback % is the visible lever. "Margin" favours
 * low-cashback (high-margin) products, while "acquisition" and "cashback" lift
 * generous, new-member-friendly cashback.
 */
function objectiveRank(product: MuseProduct, meta: FeedMeta, objective: Objective): number {
  const cb = product.cashbackPct;
  if (objective === 'margin') return 100 - cb * 4 + meta.margin * 0.2;
  if (objective === 'acquisition') return cb * 3 + meta.acquisition * 0.3;
  return cb * 4;
}

/**
 * Pick the top `n` products from a pool for the current objective. When
 * `pinnedFirst` is supplied and still available, it is always placed first
 * regardless of objective ranking — used to guarantee the redeem “product B”.
 */
function pickForObjective(
  pool: string[],
  objective: Objective,
  exclude: Set<string>,
  n: number,
  pinnedFirst?: string,
): RankedFeedItem[] {
  const ranked = pool
    .map((id) => {
      const product = museProductById(id);
      if (!product || exclude.has(id)) return null;
      const meta = feedMetaById[id] ?? defaultMeta;
      const item = feedItemFor(id);
      if (!item) return null;
      return { item, rank: objectiveRank(product, meta, objective) };
    })
    .filter((x): x is { item: RankedFeedItem; rank: number } => x !== null)
    .sort((a, b) => b.rank - a.rank);

  const pinned = pinnedFirst ? ranked.find((x) => x.item.product.id === pinnedFirst) : undefined;
  const ordered = pinned ? [pinned, ...ranked.filter((x) => x !== pinned)] : ranked;
  return ordered.slice(0, n).map((x) => x.item);
}

/**
 * Build the two context areas of the personalised feed: a persona- and
 * weather-driven group that reacts to the live weather, and a spotlight group
 * that re-ranks around the most recently redeemed product. The "Optimise feed
 * for" objective decides which products win each slot. Products never repeat.
 */
export function buildFeedGroups(
  appUser: AppUserId,
  weather: WeatherCtx,
  objective: Objective,
  redeemedProductIds: string[] = [],
): FeedGroup[] {
  const used = new Set<string>();

  const lastRedeemed = redeemedProductIds[redeemedProductIds.length - 1];
  const redeem = lastRedeemed ? postRedeemSpotlight[lastRedeemed] : undefined;

  // After a redeem, build the “goes-with” spotlight FIRST and reserve its picks
  // (pinning “product B” = pool[0]) so the weather group above can't consume
  // them — guaranteeing a visible change when the customer returns to Home.
  let spotItems: RankedFeedItem[] = [];
  if (redeem) {
    used.add(lastRedeemed); // don't re-surface what was just redeemed
    spotItems = pickForObjective(redeem.pool, objective, used, 2, redeem.pool[0]);
    spotItems.forEach((i) => used.add(i.product.id));
  }

  const wa = weatherAreasByUser[appUser][weather];
  const weatherItems = pickForObjective(wa.pool, objective, used, 2);
  weatherItems.forEach((i) => used.add(i.product.id));

  if (!redeem) {
    spotItems = pickForObjective(defaultSpotlightByUser[appUser].pool, objective, used, 2);
  }

  const spotHeadline = redeem ? redeem.headline : defaultSpotlightHeadline[objective];
  const spotIcon = redeem ? redeem.icon : defaultSpotlightByUser[appUser].icon;

  return [
    { id: 'weather', headline: wa.headline, icon: wa.icon, items: weatherItems },
    { id: 'spotlight', headline: spotHeadline, icon: spotIcon, items: spotItems },
  ];
}

/** Flat list of product ids currently featured in the feed (to de-dupe the grid). */
export function featuredFeedIds(
  appUser: AppUserId,
  weather: WeatherCtx,
  objective: Objective,
  redeemedProductIds: string[] = [],
): string[] {
  return buildFeedGroups(appUser, weather, objective, redeemedProductIds).flatMap((g) =>
    g.items.map((i) => i.product.id),
  );
}
