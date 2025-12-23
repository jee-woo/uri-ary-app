import crypto from "react-native-quick-crypto";

// 1. AES 키 생성 (256비트 = 32바이트)
export const generateAESKey = (): string => {
  return crypto.randomBytes(32).toString("base64");
};

// 2. 본문 암호화
export const encryptContent = (content: string, aesKey: string) => {
  const iv = crypto.randomBytes(12); // GCM 권장 IV 길이는 12바이트
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

// 3. AES 키를 서버의 공개키로 암호화 (RSA)
export const encryptAESKeyWithRSA = (
  aesKey: string,
  publicKey: string
): string => {
  const encryptedKey = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(aesKey)
  );
  return encryptedKey.toString("base64");
};
