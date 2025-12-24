import apiClient from "@/services/apiClient";

export const updatePublicKey = async (publicKey: string) => {
  return await apiClient.post("/api/users/public-key", { publicKey });
};

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  publicKey: string | null;
}

export const getUserInfo = async (): Promise<UserResponse> => {
  const res = await apiClient.get("/api/users/me");
  return res.data;
};
