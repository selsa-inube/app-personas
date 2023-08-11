const buttonSpacing = ["wide", "compact", "none"] as const;

const buttonVariant = ["filled", "outlined", "none"] as const;

const buttonAppearance = [
  "primary",
  "success",
  "warning",
  "error",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type ButtonSpacingType = (typeof buttonSpacing)[number];
type ButtonVariantType = (typeof buttonVariant)[number];
type ButtonAppearanceType = (typeof buttonAppearance)[number];

export { buttonAppearance, buttonSpacing, buttonVariant };
export type { ButtonAppearanceType, ButtonSpacingType, ButtonVariantType };
