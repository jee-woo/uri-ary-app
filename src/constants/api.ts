import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;
const isMock = Constants.expoConfig?.extra?.eas?.mock === "1";

export const baseUrl = isMock ? "" : API_BASE_URL;
