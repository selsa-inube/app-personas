const countdownBarAppearance = [
  "primary",
  "error",
  "warning",
  "success",
  "information",
  "help",
  "light",
  "gray",
  "dark",
] as const;

type CountdownBarAppearanceType = (typeof countdownBarAppearance)[number];

export { countdownBarAppearance };
export type { CountdownBarAppearanceType };
