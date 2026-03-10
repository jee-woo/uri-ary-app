import { Check } from "lucide-react-native";
import { Button, Sheet, Text, YStack } from "tamagui";

interface GroupRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  isPending: boolean;
}

export default function GroupRequestSheet({
  isOpen,
  onClose,
  onApprove,
  isPending,
}: GroupRequestSheetProps) {
  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[30]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <Sheet.Frame
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        padding={16}
      >
        <YStack gap={16}>
          <Text fontSize="$6" fontWeight="600">
            참여 요청
          </Text>
          <Button
            icon={Check}
            onPress={onApprove}
            disabled={isPending}
            backgroundColor="$accent1"
            color="white"
            disabledStyle={{ backgroundColor: "$color3", opacity: 0.7 }}
          >
            수락
          </Button>
          <Button
            onPress={onClose}
            disabled={isPending}
            chromeless
            color="$color7"
            size="$3"
            pressStyle={{ borderColor: "transparent" }}
          >
            닫기
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
