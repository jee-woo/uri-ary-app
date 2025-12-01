import { ReactNode } from "react";
import { Text, YStack } from "tamagui";

interface EmptyPlaceholderProps {
  icon: ReactNode;
  title: string;
  message: string;
}

export default function EmptyPlaceholder({
  icon,
  title,
  message,
}: EmptyPlaceholderProps) {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap={16}
      padding={20}
    >
      {icon}
      <YStack gap={4} alignItems="center">
        <Text fontSize="$6" fontWeight="bold" color="$color12">
          {title}
        </Text>
        <Text fontSize="$4" color="$color11" textAlign="center">
          {message}
        </Text>
      </YStack>
    </YStack>
  );
}
