import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // retry: false,
      retry: (failureCount, error: any) => {
        if (error.response?.status === 401) {
          return false; // 401이면 즉시 멈춤
        }
        return failureCount < 3; // 그 외 에러는 3번까지 재시도
      },
      throwOnError: (error: any) => {
        // 401이 아닐 때만 에러 바운더리로 전달
        return error.response?.status !== 401;
      },
    },
  },
});
