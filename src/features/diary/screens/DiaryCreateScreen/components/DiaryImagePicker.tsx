import * as ImagePicker from "expo-image-picker";
import { Button, Image } from "tamagui";

type Props = {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
};

export default function DiaryImagePicker({ imageUri, setImageUri }: Props) {
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

  return (
    <>
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
    </>
  );
}
