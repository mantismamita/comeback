import type { Activity } from '@/types/Activity';
import { formatDate } from '@/utils/date';
import { textToEmoji, textToCssColorProperty } from '@/utils/activityTypes';
import {
  roundToKm,
  roundToHoursMinutes,
  metersPerSecondToKmPerHour,
} from '@/utils/units';

type ActivityProps = {
  activity: Activity;
  withBorder?: boolean;
  variant?: 'default' | 'large';
};

export default function Activity({
  activity,
  withBorder = false,
  variant = 'default',
}: ActivityProps) {
  function getActivityMovingSpeed() {
    if (!activity.distance || !activity.movingDuration) return 0;
    if (activity.activityType.typeKey === 'walking') {
      return metersPerSecondToKmPerHour(
        activity.distance / activity.movingDuration
      );
    }
    return metersPerSecondToKmPerHour(
      activity.averageSpeed ? activity.averageSpeed : 0
    );
  }

  const isLarge = variant === 'large';

  return (
    <div
      className={`
        relative bg-white dark:bg-gray-800 rounded-xl p-5 flex flex-col gap-2
        border ${withBorder ? 'activity-border' : 'border-transparent'}
        transition-shadow
        ${isLarge ? 'items-center text-center py-0' : ''}
      `}
      style={
        {
          '--activity-border': textToCssColorProperty(
            activity?.activityType?.typeKey
          ),
        } as React.CSSProperties
      }
    >
      <div
        className={`flex items-center justify-between mb-2 w-full ${
          isLarge ? 'justify-center' : ''
        }`}
      >
        <h3
          className={`font-semibold text-gray-800 dark:text-gray-100 truncate ${
            isLarge ? 'text-3xl' : 'text-lg'
          } ${isLarge ? 'w-auto' : 'flex-1'}`}
        >
          {activity.activityName}
        </h3>
        <span className={`ml-2 ${isLarge ? 'text-5xl' : 'text-2xl'}`}>
          {textToEmoji(activity?.activityType?.typeKey)}
        </span>
      </div>
      <div
        className={`flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 w-full ${
          isLarge ? 'justify-center' : ''
        }`}
      >
        <span className={isLarge ? 'text-lg' : ''}>
          {formatDate(activity.startTimeLocal)}
        </span>
      </div>
      <div
        className={`flex flex-wrap gap-8 mt-4 w-full ${
          isLarge ? 'justify-center' : ''
        }`}
      >
        <div className="flex flex-col items-center">
          <span
            className={`font-bold text-indigo-600 dark:text-indigo-400 ${
              isLarge ? 'text-3xl' : 'text-lg'
            }`}
          >
            {roundToKm(activity.distance)}
          </span>
          <span
            className={`text-xs text-gray-500 ${isLarge ? 'text-base' : ''}`}
          >
            km
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-bold text-green-500 dark:text-green-300 ${
              isLarge ? 'text-3xl' : 'text-lg'
            }`}
          >
            {roundToHoursMinutes(activity.duration)}
          </span>
          <span
            className={`text-xs text-gray-500 ${isLarge ? 'text-base' : ''}`}
          >
            duration
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-bold text-amber-500 dark:text-amber-300 ${
              isLarge ? 'text-3xl' : 'text-lg'
            }`}
          >
            {getActivityMovingSpeed()}
          </span>
          <span
            className={`text-xs text-gray-500 ${isLarge ? 'text-base' : ''}`}
          >
            km/h
          </span>
        </div>
      </div>
    </div>
  );
}
