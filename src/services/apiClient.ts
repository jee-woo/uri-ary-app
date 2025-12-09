import { baseUrl } from "@/constants/api";

import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
} from "@/features/auth/utils/tokenManager";
import axios from "axios";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const exchangeCodeForTokens = async (code: string) => {
  const response = await apiClient.post("/api/auth/token", { code });
  return response.data;
};

export const refreshTokenApi = async (token: string) => {
  const response = await apiClient.post("/api/auth/refresh", {
    refreshToken: token,
  });
  return response.data;
};

// 인터셉터 외부에 상태를 관리할 변수 선언
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

// 실패한 요청을 큐에 추가하고, 리프레시가 완료되면 처리
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      // 새로운 토큰으로 헤더를 업데이트하고 요청을 재실행하도록 resolve
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    // 1. 저장소에서 현재 액세스 토큰을 가져옵니다.
    const accessToken = await getAccessToken();

    // 2. 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 삽입합니다.
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 3. 변경된 요청 설정을 반환합니다.
    return config;
  },
  (error) => {
    // 요청 설정 오류 발생 시
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. 401 에러가 아니거나 이미 재시도된 요청이면 즉시 에러 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 2. 재시도 플래그 설정 및 리프레시 토큰 로직 시작
    originalRequest._retry = true;
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      // 리프레시 토큰이 없으면 즉시 로그아웃 처리 함수 호출
      // logoutHandler(); // TODO: 이 함수는 Auth Context/Store에서 구현해야 함
      return Promise.reject(error);
    }

    // 3. 동시성 처리 로직
    if (isRefreshing) {
      // 현재 리프레시 중이면, 해당 요청을 큐에 넣고 대기
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken) => {
            // 새로운 토큰으로 헤더 설정 후 원래 요청 재시도
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true; // 리프레시 시작

    try {
      // 4. 리프레시 요청 실행 (오직 한 번)
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshTokenApi(refreshToken);

      // 5. 토큰 저장 및 상태 초기화
      await storeTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      isRefreshing = false;

      // 6. 큐 처리
      processQueue(null, newAccessToken);

      // 7. 현재 실패 요청 재실행
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // 8. 리프레시 실패 (토큰 폐기/만료) -> 로그아웃 및 큐 처리
      isRefreshing = false;
      processQueue(refreshError); // 큐에 대기 중인 모든 요청에게 실패를 알림

      // logoutHandler(); // TODO: 로그아웃 처리
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
