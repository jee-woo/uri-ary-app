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

export const declineGroupRequest = async (requestId: number) => {
  const response = await apiClient.post(
    `/api/groups/join-requests/${requestId}/reject`,
  );
  return response.data;
};

export interface DiaryKeyDto {
  userId: number;
  diaryId: number;
  encryptedAesKey: string;
}

export interface ApprovalInfoResponse {
  newMemberPublicKey: string;
  diaryKeys: DiaryKeyDto[];
}

export const getApprovalInfo = async (
  targetId: number,
): Promise<ApprovalInfoResponse> => {
  const response = await apiClient.get(
    `/api/groups/join-requests/${targetId}/approval-info`,
  );
  return response.data;
};

interface ApproveMemberRequest {
  reEncryptedKeys: DiaryKeyDto[];
}

export const approveGroupRequest = async (
  targetId: number,
  requestBody: ApproveMemberRequest,
) => {
  const response = await apiClient.post(
    `/api/groups/join-requests/${targetId}/approve`,
    requestBody,
  );
  return response.data;
};

export interface GroupMember {
  userId: number;
  username: string;
  publicKey: string;
}

export const getGroupMembers = async (groupId: number): Promise<GroupMember[]> => {
  const response = await apiClient.get(`/api/groups/${groupId}/members`);
  return response.data;
};
