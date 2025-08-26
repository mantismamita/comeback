import { Activity as TypeActivity } from '@/types/Activity';
import Activity from './Activity';
import Card from './Card';

export default function SelectedActivityDisplay({
  activity,
  onClose,
}: {
  activity: TypeActivity;
  onClose: () => void;
}) {
  if (!activity?.activityName) return null;

  return (
    <Card>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-3xl focus:outline-none"
      >
        ×
      </button>
      <Activity activity={activity} variant="large" />
    </Card>
  );
}
