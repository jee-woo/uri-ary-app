import { Plus } from "lucide-react-native";
import { Button, Text, XStack } from "tamagui";

export default function GroupDetailHeader({
  title,
  onActionPress,
}: {
  title: string;
  onActionPress: () => void;
}) {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal={16}
      paddingVertical={12}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <Text fontSize="$7" fontWeight="700">
        {title}
      </Text>
      <Button
        size="$3"
        icon={Plus}
        onPress={onActionPress}
        // backgroundColor="$blue10"
        color="white"
        // circular
      />
    </XStack>
  );
}
