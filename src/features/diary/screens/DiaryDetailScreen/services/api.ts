import { DiaryDetail } from "@/features/diary/types/diary.types";
import apiClient from "@/services/apiClient";

/**
 * ✅ 일기 상세 조회 API (axios 버전)
 * @param groupId 그룹 ID
 * @param diaryId 일기 ID
 */
export async function fetchDiaryDetail(
  groupId: string,
  diaryId: string,
): Promise<DiaryDetail> {
  const { data } = await apiClient.get<DiaryDetail>(
    `/api/groups/${groupId}/diaries/${diaryId}`,
  );

  return data;
}

export async function deleteDiary(
  groupId: string,
  diaryId: string,
): Promise<void> {
  await apiClient.delete(`/api/groups/${groupId}/diaries/${diaryId}`);
}

export async function createComment(
  diaryId: string,
  content: string,
  parentId: number | null = null,
) {
  const response = await apiClient.post(`/api/diaries/${diaryId}/comments`, {
    content,
    parentId,
  });
  return response.data;
}
