import { baseUrl } from "@/constants/api";
import { RootStackParamList } from "@/types/navigation.types";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, Spinner, Text, TextArea, YStack } from "tamagui";
import { z } from "zod";

const DiarySchema = z.object({
  // title: z.string().min(1, "제목은 필수입니다."),
  content: z.string().min(1, "내용을 입력해주세요."),
});

type DiaryInput = z.infer<typeof DiarySchema>;

const API_BASE_URL = baseUrl;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export default function DiaryCreateScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { groupId } = route.params as { groupId: string };

  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryInput>({
    resolver: zodResolver(DiarySchema),
    defaultValues: { content: "" },
  });

  // ✅ 이미지 선택
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ✅ 다이어리 작성
  const onSubmit = async (data: DiaryInput) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", ""); //
      formData.append("content", data.content);

      if (imageUri) {
        const filename = imageUri.split("/").pop() || "image.jpg";
        const type = `image/${filename.split(".").pop()}`;
        formData.append("image", {
          uri: imageUri,
          name: filename,
          type,
        } as any);
      }

      const res = await fetch(`${API_BASE_URL}/api/groups/${groupId}/diaries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("작성 실패");

      alert("✅ 다이어리 작성 완료!");
      navigation.reset({
        index: 0,
        routes: [{ name: "Group", params: { groupId } }],
      });
    } catch (e) {
      console.error("다이어리 작성 오류:", e);
      alert("❌ 작성 실패. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack padding={20} gap={12} flex={1}>
      <Text fontSize="$7" fontWeight="600">
        다이어리 작성
      </Text>

      {/* ✅ 제목 */}
      {/* <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <Input
            placeholder="제목을 입력하세요"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text color="red">{errors.title.message}</Text>} */}

      {/* ✅ 내용 */}
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <TextArea
            placeholder="내용을 입력하세요"
            value={value}
            onChangeText={onChange}
            numberOfLines={5}
          />
        )}
      />
      {errors.content && <Text color="red">{errors.content.message}</Text>}

      {/* ✅ 이미지 */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          width={100}
          height={100}
          borderRadius={8}
        />
      )}
      <Button onPress={pickImage} variant="outlined">
        {imageUri ? "사진 다시 선택" : "사진 선택 (선택사항)"}
      </Button>

      {/* ✅ 작성 버튼 */}
      <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
        {loading ? <Spinner size="small" /> : "작성하기"}
      </Button>
    </YStack>
  );
}
