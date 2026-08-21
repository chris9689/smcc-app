import type { Offer, PersonaState, RankedOffer } from '@/types';
import { offers } from '@/mock-data/offers';
import { guardrails } from '@/mock-data/analytics';

/**
 * Lightweight, deterministic mock of a next-best-action decision engine.
 * This does NOT call any real service. It applies illustrative scoring and
 * guardrail filtering so the demo can narrate how Dynamic Yield might rank
 * eligible loyalty value for the current moment.
 */

/** Returns true if every guardrail passes for the given persona. */
export function guardrailsPass(persona: PersonaState): boolean {
  return guardrails.every((g) => g.passes(persona));
}

/** Whether an individual offer is eligible for the persona. */
export function isOfferEligible(offer: Offer, persona: PersonaState): boolean {
  if (offer.requiresLinked && persona === 'notLinked') return false;
  return true;
}

/**
 * Produces an illustrative ranked list of offers for the current moment.
 * Scoring rewards home-setup intent and card-linked cashback value so the
 * household offer wins for the linked persona.
 */
export function rankOffers(persona: PersonaState): RankedOffer[] {
  return offers
    .filter((offer) => isOfferEligible(offer, persona))
    .map((offer) => {
      const reasons: string[] = [];
      let score = offer.baseScore;

      if (offer.kind === 'household' || offer.kind === 'electronics') {
        score += 14;
        reasons.push('Matches current home-setup moment');
      }
      if (offer.cashbackLinked) {
        score += 8;
        reasons.push('Unlocks SMCC card-linked cashback');
      }
      if (persona === 'underEngaged' && offer.kind === 'activity') {
        score += 18;
        reasons.push('Helps re-engage this month');
      }
      if (persona === 'underEngaged' && offer.kind === 'household') {
        score -= 6;
      }
      if (offer.requiresLinked && persona === 'linked') {
        score += 4;
        reasons.push('Eligible via your linked SMCC card');
      }

      return {
        offer,
        score: Math.max(0, Math.min(100, Math.round(score))),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/** Convenience helper returning the single winning offer for a persona. */
export function winningOffer(persona: PersonaState): RankedOffer {
  return rankOffers(persona)[0];
}
