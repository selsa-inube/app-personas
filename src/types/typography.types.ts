import { inube } from "../design/tokens";

type TypographyType = keyof typeof inube.typography;
type TypographySizeType = keyof typeof inube.typography.body;

export type { TypographyType, TypographySizeType };
