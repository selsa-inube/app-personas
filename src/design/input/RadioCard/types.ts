const radioCardSize = ["wide", "compact"] as const;
const radioCardAppearance = [
  "primary",
  "success",
  "warning",
  "error",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type RadioCardSizeType = (typeof radioCardSize)[number];

type RadioCardAppearanceType = (typeof radioCardAppearance)[number];

export { radioCardAppearance, radioCardSize };
export type { RadioCardAppearanceType, RadioCardSizeType };
