import { inube } from "../design/tokens";

const spacing = ["wide", "compact", "none"] as const;

type SpacingTokensType = keyof typeof inube.spacing;
type SpacingType = (typeof spacing)[number];

export { spacing };
export type { SpacingTokensType, SpacingType };