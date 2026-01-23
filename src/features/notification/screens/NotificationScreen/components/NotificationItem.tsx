import { useReadNotificationMutation } from "@/features/notification/hooks/mutations/useReadNotificationMutation";
import { Notification } from "@/features/notification/types/notification.types";
import { formatRelativeTime } from "@/utils/formatDate";
import { ListItem } from "tamagui";

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export default function NotificationItem({
  notification,
  onPress,
}: NotificationItemProps) {
  const { mutate: readNotification } = useReadNotificationMutation();

  const handlePress = () => {
    if (!notification.isRead) {
      readNotification(notification.id);
    }
    onPress();
  };

  return (
    <ListItem
      title={notification.message}
      subTitle={formatRelativeTime(notification.createdAt)}
      backgroundColor={notification.isRead ? "$background" : "$blue2"}
      pressTheme
      onPress={handlePress}
    />
  );
}
