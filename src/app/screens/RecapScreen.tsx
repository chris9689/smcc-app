import { Screen } from './Screen';
import { MonthlyRecap } from '@/components/recap/MonthlyRecap';

/** Chapter 6 — Monthly recap. */
export function RecapScreen() {
  return (
    <Screen chapterId={5}>
      <MonthlyRecap />
    </Screen>
  );
}
