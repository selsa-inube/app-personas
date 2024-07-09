const iconSpacing = ["wide", "compact", "none"] as const;
const iconVariant = ["filled", "outlined", "none"] as const;
const iconAppearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;
const iconShape = ["circle", "rectangle"] as const;

type IconSpacingType = (typeof iconSpacing)[number];
type IconVariantType = (typeof iconVariant)[number];
type IconAppearanceType = (typeof iconAppearance)[number];
type IconShapeType = (typeof iconShape)[number];

export { iconAppearance, iconShape, iconSpacing, iconVariant };
export type {
  IconAppearanceType,
  IconShapeType,
  IconSpacingType,
  IconVariantType,
};
