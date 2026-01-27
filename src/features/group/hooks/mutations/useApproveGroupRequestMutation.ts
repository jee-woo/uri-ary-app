import {
  approveGroupRequest,
  getApprovalInfo,
  DiaryKeyDto,
} from "@/features/group/services/api";
import {
  decryptAESKeyWithRSA,
  encryptAESKeyWithRSA,
} from "@/libs/crypto/aes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ApproveGroupRequestVariables {
  groupId: number;
}

export const useApproveGroupRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId }: ApproveGroupRequestVariables) => {
      // 1. Fetch approval info (encrypted diary keys and new member's public key)
      const { newMemberPublicKey, diaryKeys } = await getApprovalInfo(groupId);

      // 2. Decrypt and re-encrypt keys
      const reEncryptedKeys: DiaryKeyDto[] = await Promise.all(
        diaryKeys.map(async (key) => {
          const decryptedKey = await decryptAESKeyWithRSA({
            encryptedAesKey: key.encryptedAesKey,
          });

          const newEncryptionResult = encryptAESKeyWithRSA(
            decryptedKey,
            newMemberPublicKey,
          );

          return {
            userId: key.userId,
            diaryId: key.diaryId,
            encryptedAesKey: newEncryptionResult.encryptedAesKey,
          };
        }),
      );


      // 3. Call approve API with re-encrypted keys
      return await approveGroupRequest(groupId, { reEncryptedKeys });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
