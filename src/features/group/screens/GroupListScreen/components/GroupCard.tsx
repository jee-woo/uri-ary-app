import { Group } from "@/features/group/types/group.types";
import { RootStackParamList } from "@/types/navigation.types";
import { formatRelativeTime } from "@/utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Clock, Users } from "lucide-react-native";
import { Card, Paragraph, Text, useTheme, XStack } from "tamagui";

interface GroupCardProps extends Group {}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export default function GroupCard({
  id,
  name,
  status,
  memberCount,
  lastDiaryAt,
}: GroupCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const isPending = status === "PENDING";

  const handlePress = () => {
    if (isPending) return;
    navigation.navigate("Group", { groupId: id });
  };

  return (
    <Card
      size="$4"
      animation="bouncy"
      pressStyle={{ scale: isPending ? 1 : 0.97 }}
      onPress={handlePress}
      marginBottom={12}
      opacity={isPending ? 0.5 : 1}
      backgroundColor="$cardBackground"
      borderWidth={1}
      borderColor="$color3"
    >
      <Card.Header padded>
        <Text fontSize="$6" fontWeight="600" color="$color11">
          {name}
        </Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack justifyContent="space-between" alignItems="center" flex={1}>
          {isPending ? (
            <Paragraph size="$3" color="$accent1">
              승인 대기 중
            </Paragraph>
          ) : (
            <XStack alignItems="center" gap={4}>
              <Clock size={14} color={theme.color7.val} />
              <Text fontSize="$2" color="$color7">
                {lastDiaryAt ? formatRelativeTime(lastDiaryAt) : "일기 없음"}
              </Text>
            </XStack>
          )}
          <XStack alignItems="center" gap={4}>
            <Users size={14} color={theme.color7.val} />
            <Text fontSize="$2" color="$color7">
              {memberCount}
            </Text>
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  );
}
