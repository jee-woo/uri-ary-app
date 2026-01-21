import { Group, MemberStatus } from "@/features/group/types/group.types";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, H2, Paragraph } from "tamagui";

interface GroupCardProps extends Group {}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export default function GroupCard({ id, name, status }: GroupCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const isPending = status === "PENDING";

  const handlePress = () => {
    if (isPending) return;
    navigation.navigate("Group", { groupId: id });
  };

  return (
    <Card
      bordered
      size="$4"
      elevate
      animation="bouncy"
      pressStyle={{ scale: isPending ? 1 : 0.97 }}
      onPress={handlePress}
      marginBottom={12}
      opacity={isPending ? 0.5 : 1}
    >
      <Card.Header padded>
        <H2 size="$6">{name}</H2>
      </Card.Header>
      <Card.Footer padded>
        <Paragraph size="$3" color="$color8">
          {isPending && "승인 대기 중"}
        </Paragraph>
      </Card.Footer>
    </Card>
  );
}
