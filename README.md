# SMCC (Vpass) App Prototype

A mobile-first prototype of a personalised SMCC card experience, credible either
within the current Vpass app or as the basis for SMCC's future app.

It keeps the core of the original Rakuten Card demo and adapts it for SMCC: a
clean, modern green design; any-source offers with cashback made prominent; a
persona whose Singapore trip reprioritises content; and **Shopping Muse**, an
in-app conversational marketplace and support assistant.

This prototype is designed to feel like a real customer app, not a presentation.
All values, balances, points, statuses, and counts are illustrative only and
subject to programme rules.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (default: http://localhost:5173/).

## Build check

```bash
npm run build
```

## What's SMCC-specific here

- **SMCC design.** Rakuten branding is replaced with a simple, modern SMCC
  (Vpass) look: green palette, Vpass wordmark, and network-agnostic SMCC card
  artwork (no Rakuten/Mastercard marks).
- **Any offer.** Offers are source-agnostic (`SMCC Offer`, `Partner Offer`,
  `Cashback`, `Travel Offer`). The app brings together and personalises any
  offer, benefit, or cashback opportunity regardless of where it comes from.
- **Cashback as offer.** Cashback is made prominent across home, offer detail,
  and Muse, with a journey to discover, transact, and benefit immediately.
- **Shopping Muse.** A conversational marketplace + customer-support assistant
  (Michael-Kors-style discovery). Customers can discover products
  conversationally, see relevant cashback, and check out without leaving the
  app — and ask common questions answered from SMCC FAQs. Muse also engages
  proactively based on the customer's current context.
- **Singapore-travel persona.** A hotel transaction signal marks one persona
  (Kenji) as heading to Singapore, so the app prioritises Singapore travel,
  dining, and cashback content — and explains why via the "Why shown now" panel.

## Personas

Switch personas from the hidden presenter panel (press `P` → App user):

1. Hanako — furnishing a new home.
2. Kumiko — planning an Okinawa trip.
3. Kenji — **Singapore trip** triggered by a Marina Bay hotel booking.
4. Yuki — lunchtime dining cashback.

## Navigation model

Bottom navigation:

- Home
- Shop
- **Muse** (Shopping Muse — center action)
- Benefits
- Points

The experience is one connected app flow rather than isolated demo chapters.

## Hidden presenter mode

Presenter mode is hidden by default.

- Toggle presenter controls with keyboard shortcut `P`.
- On desktop, presenter controls open as a right-side rail.
- Internal reasoning content is separated from customer-facing screens.
- Tap the main recommended offer to open the "Why shown now" panel.

## State model

The app uses local prototype state only (React context + component state).
No real backend calls, authentication, payment processing, or customer data are used.

## Mock data

Mock data is separated from UI under `src/mock-data` and includes:

- app-user personas and their home experiences (`appUsers.ts`)
- offers and cashback content (`offers.ts`, `appUsers.ts`)
- Shopping Muse products, FAQs, and conversation flows (`muse.ts`)
- points utility, loyalty, and monthly progress content

## Assumptions

- Loyalty (V Point) mechanics shown are illustrative placeholders.
- Offer availability and cashback outcomes are demo values for storytelling.
- The Shopping Muse assistant is a deterministic, offline keyword matcher.
- Programme timing and rule disclaimers are intentionally shown where needed.
