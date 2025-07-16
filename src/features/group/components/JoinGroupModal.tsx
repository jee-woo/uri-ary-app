import React, { useState } from "react";
import { Modal } from "react-native";
import { Button, Input, Text, YStack } from "tamagui";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export default function JoinGroupModal({
  isOpen,
  onClose,
  onJoin,
}: JoinGroupModalProps) {
  const [code, setCode] = useState("");

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0,0,0,0.5)"
        padding={20}
      >
        <YStack backgroundColor="white" padding={20} borderRadius={8} gap={12}>
          <Text fontSize="$6" fontWeight="600">
            그룹 참여
          </Text>
          <Input
            placeholder="참여 코드를 입력하세요"
            value={code}
            onChangeText={setCode}
          />
          <YStack gap={8}>
            <Button onPress={() => onJoin(code)}>참여</Button>
            <Button variant="outlined" onPress={onClose}>
              닫기
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
