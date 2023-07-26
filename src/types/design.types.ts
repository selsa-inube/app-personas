const spacing = ["wide", "compact", "none"] as const;

const variant = ["filled", "outlined", "none"] as const;

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

const shape = ["circle", "rectangle"] as const;

const size = ["large", "medium", "small"] as const;

const asTags = [
  "p",
  "label",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
] as const;

const textAlign = [
  "start",
  "end",
  "left",
  "right",
  "center",
  "justify",
  "initial",
  "inherit",
] as const;

type AsTagsType = (typeof asTags)[number];
type TextAlignType = (typeof textAlign)[number];
type SpacingType = (typeof spacing)[number];
type VariantType = (typeof variant)[number];
type AppearanceType = (typeof appearance)[number];
type ShapeType = (typeof shape)[number];
type SizeType = (typeof size)[number];

export { appearance, asTags, shape, size, spacing, textAlign, variant };
export type {
  AppearanceType,
  AsTagsType,
  ShapeType,
  SizeType,
  SpacingType,
  TextAlignType,
  VariantType,
};
