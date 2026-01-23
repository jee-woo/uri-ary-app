import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "@/features/notification/services/api";

export const useReadNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
