import { NestedComment } from "@/features/diary/types/diary.types";
import { Button, Text, XStack, YStack } from "tamagui";

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
  diaryId,
  onReplyPress,
}: {
  comment: NestedComment;
  diaryId: string;
  onReplyPress: (id: number, username: string, content: string) => void;
}) {
  return (
    <YStack
      marginBottom={10}
      marginLeft={comment.parentId ? 16 : 0}
      gap={4}
      paddingVertical={4}
    >
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
        <Button
          size="$2"
          variant="outlined"
          onPress={() =>
            onReplyPress(comment.id, comment.authorUsername, comment.content)
          }
          marginTop={4}
          alignSelf="flex-start"
        >
          답글 달기
        </Button>
      )}

      {/* 답글들 */}
      {comment.replies.length > 0 && (
        <YStack marginTop={6} gap={8}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              diaryId={diaryId}
              onReplyPress={onReplyPress}
            />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
