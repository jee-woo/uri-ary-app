import { Group } from "@/features/group/types/group.types";
import apiClient from "@/services/apiClient";

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await apiClient.get("/api/groups/user");
  return response.data;
};

export const joinGroup = async (code: string) => {
  const response = await apiClient.post("/api/groups/join-requests", { code });
  return response.data;
};

export const approveGroupRequest = async (targetId: number) => {
  const response = await apiClient.post(
    `/api/groups/join-requests/${targetId}/approve`,
  );
  return response.data;
};

export const declineGroupRequest = async (requestId: number) => {
  const response = await apiClient.post(
    `/api/groups/join-requests/${requestId}/reject`,
  );
  return response.data;
};
