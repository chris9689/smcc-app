import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { PointsUtilityCard } from '@/components/offers/PointsUtilityCard';
import { Button } from '@/components/ui/Button';

/** Chapter 5 — Points utility. */
export function PointsScreen() {
  const { goToChapter } = useDemo();
  return (
    <Screen chapterId={4}>
      <div className="pt-2">
        <PointsUtilityCard />
        <Button variant="outline" className="mt-5" fullWidth onClick={() => goToChapter(5)}>
          View my monthly progress
        </Button>
      </div>
    </Screen>
  );
}
