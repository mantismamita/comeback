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

export function formatNumber(value: number | string, decimals = 1): string {
  if (typeof Number(value) !== 'number' || isNaN(Number(value))) {
    console.error('Invalid number:', value);
    return '1.0'; // to prevent 0 division
  }
  return (Number(value)).toFixed(decimals);
}
