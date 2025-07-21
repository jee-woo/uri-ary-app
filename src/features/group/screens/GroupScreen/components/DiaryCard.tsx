import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, Image, Paragraph, Text, XStack, YStack } from "tamagui";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Diary">;

interface DiaryCardProps {
  diary: {
    id: number;
    title: string;
    content: string;
    authorUsername: string;
    createdAt: string;
    imageUrl?: string;
  };
  groupId: string;
}

export default function DiaryCard({ diary, groupId }: DiaryCardProps) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Card
      elevate
      bordered
      pressStyle={{ scale: 0.98 }}
      onPress={() =>
        navigation.navigate("Diary", {
          groupId: Number(groupId),
          diaryId: diary.id,
        })
      }
      padding={12}
      borderRadius="$4"
    >
      <YStack gap={8}>
        {diary.imageUrl && (
          <Image
            source={{ uri: diary.imageUrl }}
            style={{ width: "100%", height: 180, borderRadius: 8 }}
          />
        )}
        <Text fontSize="$6" fontWeight="700" numberOfLines={1}>
          {diary.title}
        </Text>
        <Paragraph size="$3" color="$black10" numberOfLines={2}>
          {diary.content}
        </Paragraph>
        <XStack justifyContent="space-between">
          <Text fontSize="$2" color="$black9">
            {diary.authorUsername}
          </Text>
          <Text fontSize="$2" color="$black9">
            {new Date(diary.createdAt).toLocaleDateString()}
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
}
