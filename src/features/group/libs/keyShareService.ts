import { decryptAESKeyWithRSA, encryptAESKeyWithRSA } from "@/libs/crypto/aes";
import { DiaryKeyDto, getApprovalInfo } from "../services/api";

export const reEncryptDiaryKeysForNewMember = async (
  groupId: number,
): Promise<DiaryKeyDto[]> => {
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

  return reEncryptedKeys;
};
