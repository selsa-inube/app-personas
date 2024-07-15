const spinnerAppearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

const spinnerSize = ["large", "medium", "small"] as const;

type SpinnerAppearanceType = (typeof spinnerAppearance)[number];
type SpinnerSizeType = (typeof spinnerSize)[number];

export { spinnerAppearance, spinnerSize };
export type { SpinnerAppearanceType, SpinnerSizeType };
