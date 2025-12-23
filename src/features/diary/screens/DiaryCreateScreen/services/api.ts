import apiClient from "@/services/apiClient";

interface CreateDiaryPayload {
  groupId: string;
  imageUri?: string | null;
  encryptedContent: string;
  iv: string;
  authTag: string;
  encryptedAesKey: string;
}

export const createEncryptedDiary = async ({
  groupId,
  encryptedContent,
  iv,
  authTag,
  encryptedAesKey,
  imageUri,
}: CreateDiaryPayload) => {
  const formData = new FormData();

  formData.append("title", "");
  formData.append("encryptedContent", encryptedContent);
  formData.append("iv", iv);
  formData.append("authTag", authTag);
  formData.append("encryptedAesKey", encryptedAesKey);

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
