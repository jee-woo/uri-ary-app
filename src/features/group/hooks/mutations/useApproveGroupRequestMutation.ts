import { approveGroupRequest } from "@/features/group/screens/GroupListScreen/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApproveGroupRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveGroupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
