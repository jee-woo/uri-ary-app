import CommonHeader from "@/components/CommonHeader";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import { useApproveGroupRequestMutation } from "@/features/group/hooks/mutations/useApproveGroupRequestMutation";
import { Notification } from "@/features/notification/types/notification.types";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToastController } from "@tamagui/toast";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { H4 } from "tamagui";
import GroupRequestSheet from "./components/GroupRequestSheet";
import NotificationList from "./components/NotificationList";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export default function NotificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const toast = useToastController();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const approveMutation = useApproveGroupRequestMutation();

  const handleRequestNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
    if (notification.type === "REQUEST") {
      setSheetOpen(true);
    } else if (notification.type === "APPROVED") {
      navigation.navigate("Group", { groupId: notification.targetId });
    }
  };

  const handleApprove = () => {
    if (!selectedNotification) return;
    approveMutation.mutate(selectedNotification.targetId, {
      onSuccess: () => {
        toast.show("요청을 수락했습니다.", { native: true });
        setSheetOpen(false);
      },
      onError: () => {
        toast.show("오류가 발생했습니다.", { native: true });
      },
    });
  };

  return (
    <ScreenLayout>
      <CommonHeader
        left={<ChevronLeft size={24} onPress={() => navigation.goBack()} />}
        center={<H4>알림</H4>}
      />
      <NotificationList onNotificationPress={handleRequestNotificationPress} />
      <GroupRequestSheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        onApprove={handleApprove}
        isPending={approveMutation.isPending}
      />
    </ScreenLayout>
  );
}
