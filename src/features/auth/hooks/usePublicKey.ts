import { getUserInfo } from "../services/api";
import { useAuthStore } from "../stores/authStore";
import { useKeyRegistration } from "./useKeyRegistration";

export const usePublicKey = () => {
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);
  const { registerKey } = useKeyRegistration(); // 아까 만든 키 생성/등록 로직

  const getOrRegisterKey = async () => {
    // 1. 이미 메모리에 키가 있는 경우
    if (user?.publicKey) return user.publicKey;

    try {
      // 2. 서버에서 최신 정보 다시 확인
      const latestUser = await getUserInfo();
      if (latestUser.publicKey) {
        setUser(latestUser);
        return latestUser.publicKey;
      }

      // 3. 서버에도 없다면 새로 생성하고 등록
      const newPublicKey = await registerKey();
      return newPublicKey;
    } catch (error) {
      throw new Error("보안키를 가져오거나 생성할 수 없습니다.");
    }
  };

  return { getOrRegisterKey };
};
