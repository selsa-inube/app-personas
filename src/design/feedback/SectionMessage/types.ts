const messageAppearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type MessageAppearanceType = (typeof messageAppearance)[number];

export { messageAppearance };
export type { MessageAppearanceType };
