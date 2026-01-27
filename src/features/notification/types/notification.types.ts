export type NotificationType = "REQUEST" | "COMMENT" | "SYSTEM" | "APPROVED";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  targetId: number; // For REQUEST, this is groupId
  isRead: boolean;
  createdAt: string;
}
