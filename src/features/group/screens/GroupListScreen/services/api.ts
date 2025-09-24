import { baseUrl } from "@/constants/api";
import { Group } from "@/features/group/types/group.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchGroups = async (): Promise<Group[]> => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${baseUrl}/api/groups/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const joinGroup = async (code: string) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseUrl}/api/groups/join`,
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "그룹 참여에 실패했습니다."
      );
    }
    throw new Error("참여 중 오류가 발생했습니다.");
  }
};
