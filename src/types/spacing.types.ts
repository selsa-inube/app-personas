import { inube } from "../design/tokens";

const spacing = ["wide", "compact", "none"] as const;

type SpacingType = (typeof spacing)[number];

export { spacing };
export type { SpacingType };