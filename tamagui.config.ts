import { config as defaultConfig } from "@tamagui/config";
import { themes } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const config = createTamagui({
  ...defaultConfig,
  themes,
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}
