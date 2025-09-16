import { DiaryDetail } from "@/features/diary/types/diary.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchDiaryDetail } from "../../services/api";

export const useDiaryDetailQuery = (groupId: string, diaryId: string) => {
  return useSuspenseQuery<DiaryDetail>({
    queryKey: ["diaryDetail", groupId, diaryId],
    queryFn: () => fetchDiaryDetail(groupId, diaryId),
  });
};
