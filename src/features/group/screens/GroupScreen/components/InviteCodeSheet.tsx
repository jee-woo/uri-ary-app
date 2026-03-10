import { useToastController } from "@tamagui/toast";
import * as Clipboard from "expo-clipboard";
import { Copy } from "lucide-react-native";
import { Button, Input, Sheet, Text, XStack, YStack } from "tamagui";

export default function InviteCodeSheet({
  open,
  onOpenChange,
  inviteCode,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inviteCode: string;
}) {
  const toast = useToastController();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteCode);
    toast.show("초대 코드 복사 완료!", {
      native: true,
    });
  };

  return (
    <Sheet modal open={open} onOpenChange={onOpenChange} snapPoints={[50]}>
      <Sheet.Overlay backgroundColor="rgba(0,0,0,0.2)" />
      <Sheet.Frame
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        padding={16}
      >
        <YStack gap={12}>
          <Text fontSize="$6" fontWeight="600">
            그룹 초대 코드
          </Text>
          <XStack alignItems="center" gap={8}>
            <Input
              value={inviteCode}
              editable={false}
              textAlign="center"
              flex={1}
              color="$color"
              borderWidth={0}
              backgroundColor="$cardBackground"
            />
            <Button
              size="$3"
              icon={Copy}
              onPress={copyToClipboard}
              backgroundColor="$accent1"
              color="white"
            />
          </XStack>
          <Button
            onPress={() => onOpenChange(false)}
            backgroundColor="$color2"
            color="$color12"
          >
            닫기
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
