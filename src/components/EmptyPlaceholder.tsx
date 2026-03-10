import { ReactNode } from "react";
import { Text, YStack } from "tamagui";

interface EmptyPlaceholderProps {
  icon: ReactNode;
  title: string;
  message?: string;
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
        <Text fontSize="$5" fontWeight="600" color="$color10">
          {title}
        </Text>
        <Text fontSize="$3" color="$color7" textAlign="center">
          {message}
        </Text>
      </YStack>
    </YStack>
  );
}
