import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isFuture,
  isThisYear,
  parseISO,
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 상대 시간 포맷 (일기 카드, 그룹 카드 등)
 * - 7일 이내: "방금 전", "3시간 전", "2일 전" 등
 * - 7일 초과 & 올해: "3월 5일"
 * - 작년 이전: "2025. 3. 5"
 */
export function formatRelativeTime(dateString: string): string {
  if (!dateString) return "시간 정보 없음";
  const date = parseISO(dateString);

  if (isFuture(date)) return "방금 전";

  const days = differenceInDays(new Date(), date);
  if (days < 7) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  }
  if (isThisYear(date)) {
    return format(date, "M월 d일", { locale: ko });
  }
  return format(date, "yyyy. M. d", { locale: ko });
}

/**
 * 날짜 그룹 헤더용 포맷 (섹션 헤더)
 * - 오늘/어제: "오늘", "어제"
 * - 7일 이내: "n일 전"
 * - 7일 초과 & 올해: "3월 5일"
 * - 작년 이전: "2025. 3. 5"
 */
export function formatDateLabel(dateString: string): string {
  if (!dateString) return "시간 정보 없음";
  const date = parseISO(dateString);

  if (isFuture(date)) return "오늘";

  const days = differenceInDays(new Date(), date);
  if (days === 0) return "오늘";
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;
  if (isThisYear(date)) {
    return format(date, "M월 d일", { locale: ko });
  }
  return format(date, "yyyy. M. d", { locale: ko });
}
