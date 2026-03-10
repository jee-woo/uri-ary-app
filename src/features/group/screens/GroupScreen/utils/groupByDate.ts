import { GroupDetail } from "@/features/group/types/group.types";
import { formatDateLabel } from "@/utils/formatDate";

export function groupByDate(diaries: GroupDetail["diaries"]) {
  return diaries.reduce(
    (acc, diary) => {
      const label = formatDateLabel(diary.createdAt);
      if (!acc[label]) acc[label] = [];
      acc[label].push(diary);
      return acc;
    },
    {} as Record<string, typeof diaries>,
  );
}
