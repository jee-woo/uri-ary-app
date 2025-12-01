import { differenceInDays, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function formatRelativeTime(
  dateString: string,
  options: { format: "default" | "days" } = { format: "default" }
): string {
  const date = parseISO(dateString);
  if (options.format === "days") {
    const days = differenceInDays(new Date(), date);
    if (days === 0) return "오늘";
    return `${days}일 전`;
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}
