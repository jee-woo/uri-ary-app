import { declineGroupRequest } from "@/features/group/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeclineGroupRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineGroupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
