import { Activity } from '@/types/Activity';

export default function SelectedActivityDisplay({
  activity,
}: {
  activity: Activity | null;
}) {
  if (!activity) return null;

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Selected Activity
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {activity.activityName} on {activity.activityDate}
      </p>
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        Type: {activity.activityType?.typeKey}
      </p>
    </div>
  );
}
// This component displays the details of the selected activity.
