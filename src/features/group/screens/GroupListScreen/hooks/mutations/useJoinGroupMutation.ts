import { joinGroup } from "@/features/group/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJoinGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
