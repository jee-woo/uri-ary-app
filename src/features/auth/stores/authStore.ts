import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearTokens,
  getAccessToken,
} from "@/features/auth/utils/tokenManager";
import { queryClient } from "@/services/queryClient";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  publicKey: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean; // 앱 초기 토큰 검사 상태
  login: () => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>; // 앱 시작 시 실행할 함수
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,

      login: () => set({ isAuthenticated: true }),

      // 1. 비동기로 토큰을 지우고 상태를 변경합니다.
      logout: async () => {
        await clearTokens();
        queryClient.cancelQueries();
        queryClient.clear();
        set({ isAuthenticated: false, user: null });
      },

      // 2. 앱이 켜질 때 저장된 토큰이 있는지 확인합니다.
      initialize: async () => {
        try {
          const token = await getAccessToken();
          set({ isAuthenticated: !!token });
        } finally {
          set({ isLoading: false });
        }
      },

      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // 스토리지에 저장될 때 사용될 키
      storage: createJSONStorage(() => AsyncStorage), // 사용할 스토리지
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // 저장할 상태만 선택
    }
  )
);
