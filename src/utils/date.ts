const yearMonthDay: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export function formatDate(
  dateString: string,
  locale = 'fr-FR',
  dateFormat = yearMonthDay
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, dateFormat);
}

export function formatDateToInput(dateObj: Date): string {
  return dateObj.toISOString().split('T')[0];
}

export function isSameDay(dateA: string, dateB: string) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
