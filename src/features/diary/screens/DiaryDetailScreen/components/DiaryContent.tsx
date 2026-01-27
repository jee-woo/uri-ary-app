import { DiaryDetail } from "@/features/diary/types/diary.types";
import { decryptAESKeyWithRSA, decryptContent } from "@/libs/crypto/aes";
import { formatRelativeTime } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { Image, Text, YStack } from "tamagui";

type Props = {
  diary: DiaryDetail;
};
export function DiaryContent({ diary }: Props) {
  const { authorUsername, createdAt, encryptedContent, imageUrl } = diary;

  const [decryptedContent, setDecryptedContent] =
    useState<string>("복호화 중...");

  useEffect(() => {
    const handleDecrypt = async () => {
      try {
        if (!diary) return;
        // 1. 암호화된 AES 키 복호화
        const decryptedAesKey = await decryptAESKeyWithRSA(
          {
            encryptedAesKey: diary.keyInfo.encryptedAesKey
          },
        );

        // 2. 본문 복호화
        const content = decryptContent(
          encryptedContent,
          decryptedAesKey,
          diary.iv,
          diary.authTag
        );

        setDecryptedContent(content);
      } catch (error) {
        console.error("복호화 실패:", error);
        setDecryptedContent("보안키가 일치하지 않아 내용을 읽을 수 없습니다.");
      }
    };

    handleDecrypt();
  }, [diary]);

  return (
    <YStack gap={10}>
      <Text fontSize="$6" fontWeight="700">
        {authorUsername}
      </Text>
      <Text fontSize="$3" color="$colorPress">
        {formatRelativeTime(createdAt)}
      </Text>

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 10,
            marginTop: 6,
          }}
        />
      )}

      <Text fontSize="$5" lineHeight="$5" marginTop={4}>
        {decryptedContent}
      </Text>
    </YStack>
  );
}
