export function textToEmoji(typeKey: string): string {
  switch (typeKey) {
    case "running":
      return "🏃";
    case "indoor_cycling":
      return "🚴‍♂️";
    case "stair_climbing":
      return "🧗‍♂️";
    case "strength_training":
      return "🏋️‍♂️";
    case "walking":
      return "🚶";
    case "swimming":
      return "🏊";
    case "core_training":
      return "🤸";
    default:
      return "❓";
  }
}
