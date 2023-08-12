const tagAppearance = [
  "primary",
  "success",
  "error",
  "warning",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type TagAppearanceType = (typeof tagAppearance)[number];

export { tagAppearance };
export type { TagAppearanceType };
