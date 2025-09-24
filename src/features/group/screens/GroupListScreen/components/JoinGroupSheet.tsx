import { useEffect, useState } from "react";
import { Button, Input, Sheet, Text, YStack } from "tamagui";

interface JoinGroupSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
  isPending?: boolean;
}

export default function JoinGroupSheet({
  isOpen,
  onClose,
  onJoin,
  isPending,
}: JoinGroupSheetProps) {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCode("");
    }
  }, [isOpen]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[40]}
      modal
      dismissOnSnapToBottom
      moveOnKeyboardChange
    >
      <Sheet.Overlay
        backgroundColor="rgba(0,0,0,0.2)"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        padding={20}
      >
        <YStack gap={12}>
          <Text fontSize="$6" fontWeight="600">
            그룹 참여
          </Text>
          <Input
            placeholder="참여 코드를 입력하세요"
            value={code}
            onChangeText={setCode}
          />
          <YStack gap={8}>
            <Button onPress={() => onJoin(code)} disabled={isPending}>
              {isPending ? "참여 중..." : "참여"}
            </Button>
            <Button variant="outlined" onPress={onClose} disabled={isPending}>
              닫기
            </Button>
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
