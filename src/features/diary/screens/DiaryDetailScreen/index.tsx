import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import { baseUrl } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Image, ScrollView, Spinner, Text, YStack } from "tamagui";
import { DiaryDetail, NestedComment } from "../../types/diary.types";
import CommentForm from "./components/CommentForm";
import CommentItem from "./components/CommentItem";
import { fetchDiaryDetail } from "./services/api";
import { buildCommentTree } from "./utils/buildCommentTree";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}월 ${String(date.getDate()).padStart(2, "0")}일 ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function DiaryDetailScreen() {
  const route = useRoute();
  const { groupId, diaryId } = route.params as {
    groupId: string;
    diaryId: string;
  };

  const {
    data: diary,
    isLoading,
    isError,
  } = useSuspenseQuery<DiaryDetail>({
    queryKey: ["diaryDetail", groupId, diaryId],
    queryFn: () => fetchDiaryDetail(groupId, diaryId),
  });
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [replyUsername, setReplyUsername] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string | null>(null);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (isError || !diary) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="$colorPress">일기 정보를 불러올 수 없습니다.</Text>
      </YStack>
    );
  }

  const commentTree: NestedComment[] = buildCommentTree(diary.comments);

  return (
    <KeyboardAvoidingWrapper>
      <YStack flex={1} backgroundColor="$background">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        >
          {/* ✅ 일기 상세 */}
          <YStack gap={10}>
            <Text fontSize="$6" fontWeight="700">
              {diary.authorUsername}
            </Text>
            <Text fontSize="$3" color="$colorPress">
              {formatDate(diary.createdAt)}
            </Text>

            {diary.imageUrl && (
              <Image
                source={{ uri: diary.imageUrl }}
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 10,
                  marginTop: 6,
                }}
              />
            )}

            <Text fontSize="$5" lineHeight="$5" marginTop={4}>
              {diary.content}
            </Text>
          </YStack>

          {/* ✅ 댓글 리스트 */}
          <YStack gap={12} marginTop={24}>
            <Text fontSize="$4" fontWeight="600">
              댓글
            </Text>

            {commentTree.length === 0 ? (
              <Text color="$colorPress" fontSize="$3">
                아직 댓글이 없습니다.
              </Text>
            ) : (
              <YStack gap={12}>
                {commentTree.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReplyPress={(id, username, content) => {
                      setReplyParentId(id);
                      setReplyUsername(username);
                      setReplyContent(content);
                    }}
                  />
                ))}
              </YStack>
            )}
          </YStack>
        </ScrollView>

        {/* 통합 입력폼 */}
        <YStack
          padding={12}
          borderTopWidth={1}
          borderColor="$backgroundHover"
          backgroundColor="$background"
        >
          <CommentForm
            parentId={replyParentId}
            parentUsername={replyUsername}
            parentContent={replyContent}
            onSubmit={async (content, parentId) => {
              if (content === "") {
                setReplyParentId(null);
                setReplyUsername(null);
                setReplyContent(null);
                return;
              }

              const token = await AsyncStorage.getItem("token");
              await fetch(`${baseUrl}/api/diaries/${diaryId}/comments`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content, parentId }),
              });

              setReplyParentId(null);
              setReplyUsername(null);
              setReplyContent(null);
            }}
          />
        </YStack>
      </YStack>
    </KeyboardAvoidingWrapper>
  );
}
