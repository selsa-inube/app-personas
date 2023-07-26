import { inube } from "../../tokens";

const as = ["p", "label", "h1", "h2", "h3", "h4", "h5", "h6", "span"] as const;
const textAlign = ["start", "end", "center", "justify"] as const;
const appearance = Object.keys(inube.color.text);
const type = Object.keys(inube.typography);
const size = Object.keys(inube.typography.body);

type AsType = (typeof as)[number];
type TextAlignType = (typeof textAlign)[number];
type SpacingType = keyof typeof inube.spacing;
type AppearanceType = keyof typeof inube.color.text;
type TypeType = keyof typeof inube.typography;
type SizeType = keyof typeof inube.typography.body;

export { as, textAlign, appearance, type, size };
export type {
  AsType,
  TextAlignType,
  AppearanceType,
  TypeType,
  SizeType,
  SpacingType,
};
