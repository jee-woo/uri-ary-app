import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiary } from "../../services/api";

export const useCreateDiaryMutation = ({ groupId }: { groupId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};
