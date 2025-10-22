import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    scheme: "uriary",
    owner: "jeje0340",
    name: "UriaryApp",
    slug: "UriaryApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.jeje.uriaryapp",
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.jeje.uriaryapp",
      softwareKeyboardLayoutMode: "resize",
    },

    web: {
      favicon: "./assets/favicon.png",
    },

    plugins: ["expo-web-browser"],

    extra: {
      eas: {
        projectId: "622fb74b-2bde-4c80-8293-8a61628b9f69",
        apiBaseUrl:
          process.env.EXPO_PUBLIC_API_BASE_URL ||
          "https://racer-mint-wholly.ngrok-free.app",
        mock: process.env.MOCK || "0",
      },
    },
  };
};
