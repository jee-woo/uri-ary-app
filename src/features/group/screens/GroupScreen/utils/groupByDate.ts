import { GroupDetail } from "@/features/group/types/group.types";

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const getKSTDateString = (d: Date) => d.toLocaleDateString("ko-KR", options);

  const todayKSTString = getKSTDateString(new Date());
  const targetDateKSTString = getKSTDateString(date);

  if (targetDateKSTString === todayKSTString) {
    return "오늘";
  }

  const yesterdayKST = new Date();
  yesterdayKST.setDate(yesterdayKST.getDate() - 1); // 현재 날짜 기준 어제
  const yesterdayKSTString = getKSTDateString(yesterdayKST);

  if (targetDateKSTString === yesterdayKSTString) {
    return "어제";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function groupByDate(diaries: GroupDetail["diaries"]) {
  return diaries.reduce((acc, diary) => {
    const label = formatDateLabel(diary.createdAt);
    if (!acc[label]) acc[label] = [];
    acc[label].push(diary);
    return acc;
  }, {} as Record<string, typeof diaries>);
}
