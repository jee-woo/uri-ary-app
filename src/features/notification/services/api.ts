import apiClient from "@/services/apiClient";
import { Notification } from "../types/notification.types";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await apiClient.get("/api/notifications");
  return response.data;
};

export const readNotification = async (
  notificationId: number,
): Promise<void> => {
  await apiClient.post(`/api/notifications/${notificationId}/read`);
};
