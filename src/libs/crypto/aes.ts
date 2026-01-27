import { getPrivateKey } from "@/libs/keyManager";
import { Buffer } from "buffer";
import crypto from "react-native-quick-crypto";

// 1. AES 키 생성
export const generateAESKey = (): string => {
  return crypto.randomBytes(32).toString("base64");
};

// 2. 본문 암호화
export const encryptContent = (content: string, aesKey: string) => {
  const iv = crypto.randomBytes(12);
  const keyBuffer = Buffer.from(aesKey, "base64");

  const cipher = crypto.createCipheriv("aes-256-gcm", keyBuffer, iv);

  let encrypted = cipher.update(content, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag().toString("base64");

  return {
    encryptedContent: encrypted,
    iv: iv.toString("base64"),
    authTag: authTag,
  };
};

// 3. AES 키를 공개키로 암호화
export const encryptAESKeyWithRSA = (
  aesKey: string,
  publicKey: string,
): { encryptedAesKey: string; } => {
  const encryptedAesKey = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // 중요: aesKey(base64문자열)를 다시 32바이트 바이너리로 돌려서 암호화해야 합니다.
    Buffer.from(aesKey, "base64"),
  ).toString("base64");

  return { encryptedAesKey };
};

/**
 * 4. RSA 개인키로 AES 키 복호화
 */
export const decryptAESKeyWithRSA = async ({
  encryptedAesKey,
}: {
  encryptedAesKey: string;
}): Promise<string> => {
  try {
    if (!encryptedAesKey) throw new Error("encryptedAesKey가 비어있습니다.");

    const privateKey = await getPrivateKey();
    if (!privateKey) throw new Error("개인키를 찾을 수 없습니다.");

    const inputBuffer = Buffer.from(encryptedAesKey, "base64");

    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey as string,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      inputBuffer,
    );

    // 32바이트 바이너리를 Base64 문자열로 반환
    return decrypted.toString("base64");
  } catch (error) {
    console.error("RSA 복호화 에러:", error);
    throw error;
  }
};

/**
 * 5. 본문 복호화
 */
export const decryptContent = (
  encryptedContent: string,
  aesKey: string,
  iv: string,
  authTag: string
): string => {
  try {
    // 32바이트로 정확히 변환되도록 "base64" 인자 확인
    const keyBuf = Buffer.from(aesKey, "base64");
    const ivBuf = Buffer.from(iv, "base64");
    const tagBuf = Buffer.from(authTag, "base64");
    const dataBuf = Buffer.from(encryptedContent, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", keyBuf, ivBuf);

    decipher.setAuthTag(tagBuf as any);

    // update의 리턴 타입 이슈 방지를 위해 toString 분리
    let decrypted = decipher.update(dataBuf).toString("utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("복호화 최종 실패:", error);
    throw error;
  }
};
