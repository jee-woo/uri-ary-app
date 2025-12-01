import { Plus, Settings } from "lucide-react-native";
import { Button, Text, XStack } from "tamagui";

export default function GroupListHeader({
  onActionPress,
  onSettingPress,
}: {
  onActionPress: () => void;
  onSettingPress: () => void;
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
      <XStack>
        <Button size="$3" icon={Settings} onPress={onSettingPress} />
        <Button
          size="$3"
          // backgroundColor="$accent10"
          // color="white"
          icon={Plus}
          onPress={onActionPress}
        />
      </XStack>
    </XStack>
  );
}
