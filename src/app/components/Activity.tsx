import type { Activity } from '@/types/Activity';
import { formatDate } from '@/utils/date';
import { textToEmoji } from '@/utils/activityTypes';
import { roundToKm, roundToHoursMinutes } from '@/utils/units';

export default function Activity({ activity, withBorder = false }: { activity: Activity, withBorder?: boolean }) {
  return (
    <div
      className={`rounded-sm p-4 ${
        withBorder ? 'border-gray-300 border-1' : ''
      }`}
    >
      <h3 className="activity-name">{activity.activityName}</h3>
      <p className="text-xl">{textToEmoji(activity?.activityType?.typeKey)}</p>
      <p className="activity-date">{formatDate(activity.startTimeLocal)}</p>
      <p className="activity-distance">
        Distance: {roundToKm(activity.distance)} km
      </p>
      <p className="activity-duration">
        Duration: {roundToHoursMinutes(activity.duration)}
      </p>
    </div>
  );
}
