import apiClient from "@/services/apiClient";

export const updatePublicKey = async (publicKey: string) => {
  return await apiClient.post("/api/users/public-key", { publicKey });
};
