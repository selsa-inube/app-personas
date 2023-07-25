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

type SpacingType = (typeof spacing)[number];
type VariantType = (typeof variant)[number];
type AppearanceType = (typeof appearance)[number];
type ShapeType = (typeof shape)[number];

export { appearance, shape, spacing, variant };
export type { AppearanceType, ShapeType, SpacingType, VariantType };
