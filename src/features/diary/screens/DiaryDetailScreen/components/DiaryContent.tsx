import { DiaryDetail } from "@/features/diary/types/diary.types";
import { formatRelativeTime } from "@/utils/formatDate";
import { Image, Text, YStack } from "tamagui";

type Props = {
  diary: DiaryDetail;
};
export function DiaryContent({ diary }: Props) {
  const { authorUsername, createdAt, content, imageUrl } = diary;

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
        {content}
      </Text>
    </YStack>
  );
}
