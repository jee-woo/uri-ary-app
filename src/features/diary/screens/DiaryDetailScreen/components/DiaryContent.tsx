import { DiaryDetail } from "@/features/diary/types/diary.types";
import { Image, Text, YStack } from "tamagui";

type Props = {
  diary: DiaryDetail;
};
export function DiaryContent({ diary }: Props) {
  const { authorUsername, createdAt, content, imageUrl } = diary;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}월 ${String(date.getDate()).padStart(2, "0")}일 ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <YStack gap={10}>
      <Text fontSize="$6" fontWeight="700">
        {authorUsername}
      </Text>
      <Text fontSize="$3" color="$colorPress">
        {formatDate(createdAt)}
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
