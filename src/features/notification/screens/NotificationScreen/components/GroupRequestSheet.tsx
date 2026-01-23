import { Check } from "lucide-react-native";
import { Button, ListItem, Sheet, YStack } from "tamagui";

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
        <YStack gap={12}>
          <ListItem
            title="수락"
            icon={Check}
            onPress={onApprove}
            disabled={isPending}
            pressTheme
          />
          <Button onPress={onClose} disabled={isPending}>
            닫기
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
