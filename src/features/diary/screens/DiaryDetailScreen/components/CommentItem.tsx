import { baseUrl } from "@/constants/api";
import { NestedComment } from "@/features/diary/types/diary.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import CommentForm from "./CommentForm";

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
      marginBottom={12}
      marginLeft={comment.parentId ? 20 : 0}
      padding={8}
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius={6}
    >
      <Text>{comment.content}</Text>
      <Text fontSize="$2" color="$black10">
        - {comment.authorUsername} |{" "}
        {new Date(comment.createdAt).toLocaleString()}
      </Text>

      {comment.parentId === null && (
        <XStack marginTop={4}>
          <Button
            size="$2"
            variant="outlined"
            onPress={() => setShowReplyForm((prev) => !prev)}
          >
            {showReplyForm ? "취소" : "답글 달기"}
          </Button>
        </XStack>
      )}

      {showReplyForm && (
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
      )}

      {comment.replies.length > 0 && (
        <YStack marginTop={8} gap={8}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} diaryId={diaryId} />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
