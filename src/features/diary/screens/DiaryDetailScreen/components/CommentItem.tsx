import { NestedComment } from "@/features/diary/types/diary.types";
import { MessageCircle } from "lucide-react-native";
import { Pressable } from "react-native";
import { Text, XStack, YStack, useTheme } from "tamagui";

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
  const theme = useTheme();

  return (
    <YStack gap={4}>
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap={6}>
          <Text fontWeight="bold" fontSize="$4">
            {comment.authorUsername}
          </Text>
        </XStack>
        <Text fontSize="$2" color="$gray9">
          {formatDate(comment.createdAt)}
        </Text>
      </XStack>

      <Text fontSize="$4" lineHeight="$4" paddingLeft={2}>
        {comment.parentAuthorUsername && (
          <Text fontWeight="bold" color="$blue10">
            @{comment.parentAuthorUsername}{" "}
          </Text>
        )}
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
          <MessageCircle size={14} color={theme.gray9?.val} />
          <Text fontSize="$2" marginLeft={4} color="$gray9">
            답글
          </Text>
        </Pressable>
      )}

      {comment.children && comment.children.length > 0 && (
        <YStack gap={16} paddingLeft={20} paddingTop={8}>
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              onReplyPress={onReplyPress}
            />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
