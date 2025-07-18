import { Plus } from "lucide-react-native";
import { Button, Text, XStack } from "tamagui";

export default function MyGroupListHeader({
  onActionPress,
}: {
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
        내 그룹
      </Text>
      <Button
        size="$3"
        // backgroundColor="$blue10"
        // color="white"
        icon={Plus}
        onPress={onActionPress}
      />
    </XStack>
  );
}
