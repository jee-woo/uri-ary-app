import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEncryptedDiary } from "../../services/api";

export const useCreateEncryptedDiaryMutation = ({
  groupId,
}: {
  groupId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEncryptedDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};
