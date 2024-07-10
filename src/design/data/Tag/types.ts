const tagAppearance = [
  "primary",
  "success",
  "danger",
  "warning",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type TagAppearanceType = (typeof tagAppearance)[number];

const tagModifier = ["regular", "hover", "clear", "disabled"] as const;

type TagModifierType = (typeof tagModifier)[number];

export { tagAppearance };
export type { TagAppearanceType };

export { tagModifier };
export type { TagModifierType };
