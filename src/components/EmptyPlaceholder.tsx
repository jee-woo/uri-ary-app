import { YStack, Text } from 'tamagui';
import { ReactNode } from 'react';

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
        <Text fontSize="$6" fontWeight="bold" color="$gray10">
          {title}
        </Text>
        <Text fontSize="$4" color="$gray9" textAlign="center">
          {message}
        </Text>
      </YStack>
    </YStack>
  );
}
