export type NotificationType = "REQUEST" | "COMMENT" | "SYSTEM" | "APPROVED";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  targetId: number;
  isRead: boolean;
  createdAt: string;
}
