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
const size = ["large", "medium", "small"];

type SpacingType = (typeof spacing)[number];
type VariantType = (typeof variant)[number];
type AppearanceType = (typeof appearance)[number];
type ShapeType = (typeof shape)[number];
type SizeType = (typeof size)[number];

export { appearance, shape, size, spacing, variant };
export type { AppearanceType, ShapeType, SizeType, SpacingType, VariantType };