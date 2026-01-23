import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { useNotificationListQuery } from "@/features/notification/hooks/queries/useNotificationListQuery";
import { Notification } from "@/features/notification/types/notification.types";
import { Bell } from "lucide-react-native";
import { FlatList } from "react-native";
import { useTheme } from "tamagui";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  onNotificationPress: (notification: Notification) => void;
}

export default function NotificationList({ onNotificationPress }: NotificationListProps) {
  const { data: notifications } = useNotificationListQuery();
  const theme = useTheme();

  if (!notifications || notifications.length === 0) {
    return (
      <EmptyPlaceholder
        icon={<Bell size={48} color={theme.color8.val} />}
        title="새로운 알림이 없습니다"
      />
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem
          notification={item}
          onPress={() => onNotificationPress(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
