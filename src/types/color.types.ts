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

type AppearanceType = (typeof appearance)[number];

export { appearance };
export type { AppearanceType };
