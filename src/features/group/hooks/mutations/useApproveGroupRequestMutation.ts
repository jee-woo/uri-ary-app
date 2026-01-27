import { approveGroupRequest } from "@/features/group/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reEncryptDiaryKeysForNewMember } from "@/features/group/libs/keyShareService";

interface ApproveGroupRequestVariables {
  groupId: number;
}

export const useApproveGroupRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId }: ApproveGroupRequestVariables) => {
      const reEncryptedKeys = await reEncryptDiaryKeysForNewMember(groupId);

      return await approveGroupRequest(groupId, { reEncryptedKeys });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
