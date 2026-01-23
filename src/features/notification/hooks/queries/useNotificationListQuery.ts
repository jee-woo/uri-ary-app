import { fetchNotifications } from "@/features/notification/services/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useNotificationListQuery = () => {
  return useSuspenseQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 0,
  });
};
