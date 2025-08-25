import { Activity as TypeActivity } from '@/types/Activity';
import Activity from './Activity';

export default function SelectedActivityDisplay({
  activity,
  title,
  onClose,
}: {
  activity: TypeActivity;
  title: string;
  onClose: () => void;
}) {
  if (!activity?.activityName) return null;

  return (
    <div className="relative mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl font-bold focus:outline-none"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <Activity activity={activity} />
    </div>
  );
}
