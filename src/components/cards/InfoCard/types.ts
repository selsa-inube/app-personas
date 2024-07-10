const infoCardAppearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type InfoCardAppearanceType = (typeof infoCardAppearance)[number];

export { infoCardAppearance };

export type { InfoCardAppearanceType };
