import { GroupDetail } from "@/features/group/types/group.types";
import { formatRelativeTime } from "@/utils/formatDate";

export function groupByDate(diaries: GroupDetail["diaries"]) {
  return diaries.reduce((acc, diary) => {
    const label = formatRelativeTime(diary.createdAt, { format: "days" });
    if (!acc[label]) acc[label] = [];
    acc[label].push(diary);
    return acc;
  }, {} as Record<string, typeof diaries>);
}
