import type { Activity } from "@/types/Activity";
import { formatDate } from "@/utils/date";
import { roundToKm, roundToHoursMinutes } from "@/utils/units";

export default function ActivityComponent({ activity }: { activity: Activity }) {
  return (
    <div className="activity-card">
      <h3 className="activity-name">{activity.activityName}</h3>
      <p className="activity-type">{activity.activityType.typeKey}</p>
      <p className="activity-date">{formatDate(activity.startTimeLocal)}</p>
      <p className="activity-distance">Distance: {roundToKm(activity.distance)} km</p>
      <p className="activity-duration">Duration: {roundToHoursMinutes(activity.duration)}</p>
    </div>
  );
}
