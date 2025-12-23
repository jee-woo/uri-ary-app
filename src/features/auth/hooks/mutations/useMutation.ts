import { useMutation } from "@tanstack/react-query";
import { updatePublicKey } from "../../services/api";

export const useRegisterPublicKeyMutation = () => {
  return useMutation({
    mutationFn: (publicKey: string) => updatePublicKey(publicKey),
    onSuccess: () => {
      if (__DEV__) {
        console.log("공개키 서버 등록 완료");
      }
    },
    onError: (error) => {
      if (__DEV__) {
        console.error("공개키 서버 등록 실패:", error);
      }
    },
  });
};
