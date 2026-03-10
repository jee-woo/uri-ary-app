import { RootStackParamList } from "@/types/navigation.types";
import { formatRelativeTime } from "@/utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, Image, Text, View, XStack, YStack, styled } from "tamagui";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Diary">;

interface DiarySpringItemProps {
  diary: {
    id: number;
    encryptedContent: string;
    authorUsername: string;
    createdAt: string;
    imageUrl?: string;
  };
  groupId: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const ConnectorLine = styled(View, {
  name: "ConnectorLine",
  width: 2,
  backgroundColor: "$color3",
  position: "absolute",
  left: "50%",
  x: -1,
  zIndex: 0,
});

export default function DiarySpringItem({
  diary,
  groupId,
  isFirst = false,
  isLast = false,
}: DiarySpringItemProps) {
  const navigation = useNavigation<NavigationProp>();

  const connectionOverlap = 1;
  const marginForConnection = 5;

  return (
    <YStack alignItems="center" width="100%" position="relative">
      {!isFirst && (
        <ConnectorLine
          height={marginForConnection + connectionOverlap}
          top={-(marginForConnection + connectionOverlap)}
        />
      )}

      <Card
        pressStyle={{ scale: 0.98 }}
        onPress={() =>
          navigation.navigate("Diary", {
            groupId: Number(groupId),
            diaryId: diary.id,
          })
        }
        padding={14}
        borderRadius="$4"
        backgroundColor="$cardBackground"
        borderWidth={1}
        borderColor="$color3"
        width="100%"
        zIndex={2}
        marginVertical={marginForConnection}
      >
        <YStack gap={8}>
          {diary.imageUrl && (
            <Image
              source={{ uri: diary.imageUrl }}
              style={{ width: "100%", height: 160, borderRadius: 6 }}
            />
          )}

          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" fontWeight="600" color="$color11">
              {diary.authorUsername}
            </Text>
            <Text fontSize="$2" color="$color7">
              {/* {new Date(diary.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} */}
              {formatRelativeTime(diary.createdAt)}
            </Text>
          </XStack>

          <Text fontSize="$3" lineHeight="$4" numberOfLines={3} color="$color9">
            {diary.encryptedContent}
          </Text>
        </YStack>
      </Card>

      {!isLast && (
        <ConnectorLine
          height={marginForConnection + connectionOverlap}
          bottom={-(marginForConnection + connectionOverlap)}
        />
      )}
    </YStack>
  );
}
