import { baseUrl } from "@/constants/api";
import { NestedComment } from "@/features/diary/types/diary.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import CommentForm from "./CommentForm";

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
}: {
  comment: NestedComment;
  diaryId: string;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

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
          onPress={() => setShowReplyForm((prev) => !prev)}
          marginTop={4}
          alignSelf="flex-start"
        >
          {showReplyForm ? "취소" : "답글 달기"}
        </Button>
      )}

      {showReplyForm && (
        <YStack marginTop={6}>
          <CommentForm
            parentId={comment.id}
            onSubmit={async (content, parentId) => {
              const token = await AsyncStorage.getItem("token");
              await fetch(`${baseUrl}/api/diaries/${diaryId}/comments`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content, parentId }),
              });
              setShowReplyForm(false);
            }}
          />
        </YStack>
      )}

      {comment.replies.length > 0 && (
        <YStack marginTop={6} gap={8}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} diaryId={diaryId} />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
