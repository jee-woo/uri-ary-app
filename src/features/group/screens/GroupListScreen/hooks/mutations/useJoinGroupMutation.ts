import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "../../services/api";

export const useJoinGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
