const yearMonthDay: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}

export function formatDate(dateString: string, locale= 'fr-FR', dateFormat = yearMonthDay): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, dateFormat);
}
