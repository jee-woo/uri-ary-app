import apiClient from "@/services/apiClient";

export interface DiaryKeyInfo {
  userId: number;
  encryptedAesKey: string;
}

interface CreateDiaryPayload {
  groupId: string;
  imageUri?: string | null;
  title: string;
  encryptedContent: string;
  iv: string;
  authTag: string;
  keys: DiaryKeyInfo[];
}

export const createEncryptedDiary = async ({
  groupId,
  imageUri,
  title,
  encryptedContent,
  iv,
  authTag,
  keys,
}: CreateDiaryPayload) => {
  const formData = new FormData();

  formData.append("title", "");
  formData.append("encryptedContent", encryptedContent);
  formData.append("iv", iv);
  formData.append("authTag", authTag);

  keys.forEach((keyInfo, index) => {
    formData.append(`keys[${index}].userId`, String(keyInfo.userId));
    formData.append(`keys[${index}].encryptedAesKey`, keyInfo.encryptedAesKey);
  });

  if (imageUri) {
    const filename = imageUri.split("/").pop()!;
    const ext = filename.split(".").pop();
    const mime = `image/${ext}`;

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type: mime,
    } as any);
  }

  const res = await apiClient.post(`/api/groups/${groupId}/diaries`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
