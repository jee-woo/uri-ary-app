import { generateAndSaveKeys } from "@/libs/keyManager";
import { useCallback, useEffect } from "react";
import { useRegisterPublicKeyMutation } from "./mutations/useRegisterPublicKeyMutation";

export const useKeyRegistration = () => {
  const { mutateAsync, isPending } = useRegisterPublicKeyMutation();

  const registerKey = useCallback(async () => {
    try {
      const publicKey = await generateAndSaveKeys();
      if (publicKey) {
        await mutateAsync(publicKey);
        return publicKey;
      }
      return null;
    } catch (error) {
      if (__DEV__) console.error("Key registration process failed:", error);
      throw error;
    }
  }, [mutateAsync]);

  useEffect(() => {
    const init = async () => {
      try {
        await registerKey();
      } catch {
        // 초기화 시 에러는 무시하거나 별도 처리
      }
    };
    init();
  }, [registerKey]);

  return {
    registerKey,
    isKeyRegistering: isPending,
  };
};
