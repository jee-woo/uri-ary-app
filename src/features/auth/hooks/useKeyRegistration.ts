import { generateAndSaveKeys } from "@/libs/keyManager";
import { useEffect } from "react";
import { useRegisterPublicKeyMutation } from "./mutations/useMutation";

export const useKeyRegistration = () => {
  const { mutate, isPending } = useRegisterPublicKeyMutation();

  useEffect(() => {
    const initKeys = async () => {
      try {
        const publicKey = await generateAndSaveKeys();
        if (publicKey) {
          mutate(publicKey);
        }
      } catch (error) {
        if (__DEV__) {
          console.error("로컬 키 생성 오류:", error);
        }
      }
    };

    initKeys();
  }, [mutate]);

  return { isKeyRegistering: isPending };
};
