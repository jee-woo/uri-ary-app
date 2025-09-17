import Constants from "expo-constants";
import { Platform } from "react-native";

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;
const isWeb = Platform.OS === "web";

// export const baseUrl = isWeb ? "http://localhost:8080" : API_BASE_URL;
export const baseUrl = isWeb ? "" : API_BASE_URL;
