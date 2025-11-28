import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatRelativeTime(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}
