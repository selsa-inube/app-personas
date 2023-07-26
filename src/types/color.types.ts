import { inube } from "../design/tokens";

const appearance = [
  "primary",
  "success",
  "warning",
  "error",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type TextAppearanceType = keyof typeof inube.color.text;

type AppearanceType = (typeof appearance)[number];

export type { TextAppearanceType, AppearanceType };
