import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

export interface Group {
  id: number;
  name: string;
}

interface Member {
  id: number;
  username: string;
  email: string;
}
interface Diary {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  createdAt: string;
  imageUrl: string;
}
export interface GroupDetail extends Group {
  code: string;
  members: Member[];
  diaries: Diary[];
}

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;
const baseUrl = API_BASE_URL;

export const fetchGroups = async (): Promise<Group[]> => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${baseUrl}/api/groups/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchGroup = async (groupId: number): Promise<GroupDetail> => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${baseUrl}/api/groups/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
