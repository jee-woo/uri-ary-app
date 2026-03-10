import { ChevronRight, PlusCircle, Users } from "lucide-react-native";
import { Button, Sheet, Text, useTheme, XStack, YStack } from "tamagui";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  onJoin: () => void;
}

export default function GroupActionSheet({
  open,
  onClose,
  onCreate,
  onJoin,
}: Props) {
  const theme = useTheme();
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onClose}
      snapPoints={[50]}
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
            그룹
          </Text>

          <YStack gap={8}>
            <XStack
              alignItems="center"
              gap={12}
              padding={14}
              borderRadius="$4"
              backgroundColor="$cardBackground"
              borderWidth={1}
              borderColor="$color3"
              pressStyle={{ opacity: 0.7 }}
              onPress={() => {
                onCreate();
                onClose();
              }}
            >
              <PlusCircle size={22} color={theme.accent1.val} />
              <YStack flex={1}>
                <Text fontSize="$4" fontWeight="600" color="$color11">
                  그룹 생성
                </Text>
                <Text fontSize="$2" color="$color7">
                  새로운 그룹을 만들어보세요
                </Text>
              </YStack>
              <ChevronRight size={18} color={theme.color7.val} />
            </XStack>

            <XStack
              alignItems="center"
              gap={12}
              padding={14}
              borderRadius="$4"
              backgroundColor="$cardBackground"
              borderWidth={1}
              borderColor="$color3"
              pressStyle={{ opacity: 0.7 }}
              onPress={() => {
                onJoin();
                onClose();
              }}
            >
              <Users size={22} color={theme.accent1.val} />
              <YStack flex={1}>
                <Text fontSize="$4" fontWeight="600" color="$color11">
                  그룹 참여
                </Text>
                <Text fontSize="$2" color="$color7">
                  초대 코드로 그룹에 참여하세요
                </Text>
              </YStack>
              <ChevronRight size={18} color={theme.color7.val} />
            </XStack>
          </YStack>

          <Button
            onPress={onClose}
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
