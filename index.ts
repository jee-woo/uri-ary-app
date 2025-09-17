import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import App from "./src/App";
import { worker } from "./src/mocks/browser";

const isMock = Constants.expoConfig?.extra?.eas?.mock === "1";

if (isMock) {
  worker.start().then(() => {
    registerRootComponent(App);
  });
} else {
  registerRootComponent(App);
}
