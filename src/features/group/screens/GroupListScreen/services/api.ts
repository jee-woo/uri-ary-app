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
