import type { ComponentType } from 'react';
import { StatusScreen } from './StatusScreen';
import { BrowseScreen } from './BrowseScreen';
import { OfferScreen } from './OfferScreen';
import { PointsScreen } from './PointsScreen';
import { RecapScreen } from './RecapScreen';
import { SavedBenefitsScreen } from './SavedBenefitsScreen';
import { MuseScreen } from './MuseScreen';

/** Maps a customer-facing chapter id (1-7) to its screen component. */
export const screenByChapter: Record<number, ComponentType> = {
  1: StatusScreen,
  2: BrowseScreen,
  3: OfferScreen,
  4: PointsScreen,
  5: RecapScreen,
  6: SavedBenefitsScreen,
  7: MuseScreen,
};
