import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/api";

export function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      diaryId,
      parentId,
      content,
      groupId,
    }: {
      diaryId: string;
      parentId: number | null;
      content: string;
      groupId: string;
    }) => createComment(diaryId, content, parentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["diaryDetail", variables.groupId, variables.diaryId],
      });
    },
  });
}
