import { baseUrl } from "@/constants/api";
import { GroupDetail } from "@/features/group/types/group.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchGroup = async (groupId: number): Promise<GroupDetail> => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${baseUrl}/api/groups/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
