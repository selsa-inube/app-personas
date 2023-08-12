const buttonTypes = ["submit", "button", "link", "reset"] as const;

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

type ButtonTypesType = (typeof buttonTypes)[number];
type ButtonSpacingType = (typeof buttonSpacing)[number];
type ButtonVariantType = (typeof buttonVariant)[number];
type ButtonAppearanceType = (typeof buttonAppearance)[number];

export { buttonAppearance, buttonSpacing, buttonVariant, buttonTypes };
export type {
  ButtonAppearanceType,
  ButtonSpacingType,
  ButtonVariantType,
  ButtonTypesType,
};
