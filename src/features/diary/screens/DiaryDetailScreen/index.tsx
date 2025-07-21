import { baseUrl } from "@/constants/api";
import { useRoute } from "@react-navigation/native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image, ScrollView, Spinner, Text, YStack } from "tamagui";
import { fetchDiaryDetail } from "./services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryDetail, NestedComment } from "../../types/diary.types";
import CommentForm from "./components/CommentForm";
import CommentItem from "./components/CommentItem";
import { buildCommentTree } from "./utils/buildCommentTree";

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
        <Text color="red">일기 정보를 불러올 수 없습니다.</Text>
      </YStack>
    );
  }

  const commentTree: NestedComment[] = buildCommentTree(diary.comments);

  return (
    <ScrollView>
      <YStack padding={16} gap={12}>
        <Text fontSize="$7" fontWeight="700">
          {diary.title}
        </Text>
        <Text>
          작성자: <Text fontWeight="600">{diary.authorUsername}</Text>
        </Text>
        <Text>{new Date(diary.createdAt).toLocaleString()}</Text>

        <Text marginTop={8}>{diary.content}</Text>

        {diary.imageUrl && (
          <Image
            source={{ uri: diary.imageUrl }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        )}

        <YStack marginTop={24} gap={12}>
          <Text fontSize="$6" fontWeight="600">
            댓글
          </Text>

          {/* 댓글 작성 폼 */}
          <CommentForm
            onSubmit={async (content) => {
              const token = await AsyncStorage.getItem("token");
              await fetch(`${baseUrl}/api/diaries/${diaryId}/comments`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
              });
            }}
          />

          {commentTree.length === 0 ? (
            <Text color="$black10">아직 댓글이 없습니다.</Text>
          ) : (
            commentTree.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                diaryId={diaryId}
              />
            ))
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
