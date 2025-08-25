import { Activity as TypeActivity } from '@/types/Activity';
import Activity from './Activity';

export default function SelectedActivityDisplay({
  activity,
  title,
}: {
  activity: TypeActivity;
  title: string;
}) {
  if (!activity?.activityName) return;

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <Activity activity={activity} />
    </div>
  );
}
