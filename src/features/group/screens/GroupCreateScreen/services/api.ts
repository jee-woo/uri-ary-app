import apiClient from "@/services/apiClient";

export const createGroup = async (name: string) => {
  const response = await apiClient.post("/api/groups", { name });
  return response.data;
};
