import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiary } from "../../services/api";

export function useDeleteDiaryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      diaryId,
    }: {
      groupId: string;
      diaryId: string;
    }) => deleteDiary(groupId, diaryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["group", variables.groupId],
      });
    },
  });
}
