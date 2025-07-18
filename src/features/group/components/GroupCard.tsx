import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, H2, Paragraph } from "tamagui";

interface GroupCardProps {
  id: number;
  name: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export default function GroupCard({ id, name }: GroupCardProps) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Card
      bordered
      size="$4"
      elevate
      animation="bouncy"
      pressStyle={{ scale: 0.97 }}
      onPress={() => navigation.navigate("Group", { groupId: id })}
      marginBottom={12}
    >
      <Card.Header padded>
        <H2 size="$6">{name}</H2>
      </Card.Header>
      <Card.Footer padded>
        <Paragraph size="$3" color="$black8"></Paragraph>
      </Card.Footer>
    </Card>
  );
}
