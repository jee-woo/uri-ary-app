import { baseUrl } from "@/constants/api";
import { DiaryDetail } from "@/features/diary/types/diary.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/**
 * ✅ 일기 상세 조회 API (axios 버전)
 * @param groupId 그룹 ID
 * @param diaryId 다이어리 ID
 */
export async function fetchDiaryDetail(
  groupId: string,
  diaryId: string
): Promise<DiaryDetail> {
  const token = await AsyncStorage.getItem("token");

  const { data } = await axios.get<DiaryDetail>(
    `${baseUrl}/api/groups/${groupId}/diaries/${diaryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
