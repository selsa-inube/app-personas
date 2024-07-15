const switchSizes = ["small", "large"] as const;
type SwitchSizeType = (typeof switchSizes)[number];

export { switchSizes };
export type { SwitchSizeType };
