import { Plus, Settings } from "lucide-react-native";
import { Button, Text, useTheme, XStack } from "tamagui";

export default function GroupListHeader({
  onActionPress,
  onSettingPress,
}: {
  onActionPress: () => void;
  onSettingPress: () => void;
}) {
  const theme = useTheme();
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
      <XStack gap={8}>
        <Button
          size="$3"
          icon={<Settings color={theme.accent1.val} />}
          onPress={onSettingPress}
        />
        <Button
          size="$3"
          backgroundColor="$accent1"
          color="white"
          icon={Plus}
          onPress={onActionPress}
        />
      </XStack>
    </XStack>
  );
}
