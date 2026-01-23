import { Button, Sheet, XStack } from "tamagui";

interface GroupRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onDecline: () => void;
  isPending: boolean;
}

export default function GroupRequestSheet({
  isOpen,
  onClose,
  onApprove,
  onDecline,
  isPending,
}: GroupRequestSheetProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[20]}
      modal
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame padding="$4">
        <XStack justifyContent="space-around" space>
          <Button
            // theme="green_active"
            onPress={onApprove}
            disabled={isPending}
          >
            수락
          </Button>
          {/* <Button
            // theme="red_active"
            onPress={onDecline}
            disabled={isPending}
          >
            거절
          </Button> */}
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
}
