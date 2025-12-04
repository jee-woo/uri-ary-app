import apiClient from "@/services/apiClient";
import { GroupDetail } from "@/features/group/types/group.types";

export const fetchGroup = async (groupId: number): Promise<GroupDetail> => {
  const response = await apiClient.get(`/api/groups/${groupId}`);
  return response.data;
};
