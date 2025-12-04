import { Group } from "@/features/group/types/group.types";
import apiClient from "@/services/apiClient";

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await apiClient.get("/api/groups/user");
  return response.data;
};

export const joinGroup = async (code: string) => {
  const response = await apiClient.post("/api/groups/join", { code });
  return response.data;
};
