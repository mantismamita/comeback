export function roundToKm(meters: number): string {
  return (meters / 1000).toFixed(2);
}


export function roundToHoursMinutes(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
}

export function formatNumber(value: unknown, decimals = 1): string {
  if (typeof value !== 'number' || isNaN(value)) return '0.0';
  return value.toFixed(decimals);
}
