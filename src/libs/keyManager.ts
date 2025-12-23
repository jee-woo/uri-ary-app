import * as SecureStore from "expo-secure-store";
import crypto from "react-native-quick-crypto";

const PRIVATE_KEY_ALIAS = "user_private_key";

export const generateAndSaveKeys = async (): Promise<string | null> => {
  const existingKey = await SecureStore.getItemAsync(PRIVATE_KEY_ALIAS);
  if (existingKey) return null;

  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const privKeyStr = privateKey as unknown as string;
  const pubKeyStr = publicKey as unknown as string;

  if (!privKeyStr || !pubKeyStr) {
    throw new Error("키 생성에 실패했습니다.");
  }

  await SecureStore.setItemAsync(PRIVATE_KEY_ALIAS, privKeyStr);

  return pubKeyStr;
};

export const getPrivateKey = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(PRIVATE_KEY_ALIAS);
};
