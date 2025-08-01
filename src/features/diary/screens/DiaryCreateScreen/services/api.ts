import { baseUrl } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const token = await AsyncStorage.getItem("token");
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

  const res = await axios.post(
    `${baseUrl}/api/groups/${groupId}/diaries`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
