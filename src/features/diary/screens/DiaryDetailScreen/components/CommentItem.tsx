import { NestedComment } from "@/features/diary/types/diary.types";
import { MessageCircle } from "lucide-react-native";
import { Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function CommentItem({
  comment,
  onReplyPress,
}: {
  comment: NestedComment;
  onReplyPress: (id: number, username: string, content: string) => void;
}) {
  return (
    <YStack gap={4}>
      <XStack alignItems="center" gap={6}>
        <Text fontWeight="700">{comment.authorUsername}</Text>
        <Text fontSize="$2" color="$colorPress">
          {formatDate(comment.createdAt)}
        </Text>
      </XStack>

      <Text fontSize="$4" lineHeight="$4">
        {comment.content}
      </Text>

      {comment.parentId === null && (
        <Pressable
          onPress={() =>
            onReplyPress(comment.id, comment.authorUsername, comment.content)
          }
          style={{
            paddingVertical: 4,
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MessageCircle size={16} color="#888" />
          <Text fontSize="$2" marginLeft={4} color="#888">
            답글
          </Text>
        </Pressable>
      )}
    </YStack>
  );
}
