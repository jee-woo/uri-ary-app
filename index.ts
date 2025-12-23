import { Buffer } from "buffer";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import { Platform } from "react-native";
import App from "./src/App";
global.Buffer = Buffer;

const isMock = Constants.expoConfig?.extra?.eas?.mock === "1";
const isWeb = Platform.OS === "web";

if (isMock && isWeb) {
  const { worker } = require("./src/mocks/browser");
  worker.start().then(() => {
    registerRootComponent(App);
  });
} else {
  registerRootComponent(App);
}
