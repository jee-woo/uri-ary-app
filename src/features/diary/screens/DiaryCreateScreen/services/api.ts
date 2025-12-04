import apiClient from "@/services/apiClient";

interface CreateDiaryPayload {
  groupId: string;
  content: string;
  imageUri?: string | null;
}

export const createDiary = async ({
  groupId,
  content,
  imageUri,
}: CreateDiaryPayload) => {
  const formData = new FormData();

  formData.append("title", "");
  formData.append("content", content);

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

  const res = await apiClient.post(
    `/api/groups/${groupId}/diaries`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
