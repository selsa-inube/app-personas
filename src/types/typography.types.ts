import { inube } from "../design/tokens";

const type = Object.keys(inube.typography);
const size = Object.keys(inube.typography.body);

type TypographyType = keyof typeof inube.typography;
type TypographySizeType = keyof typeof inube.typography.body;

export { type, size };
export type { TypographyType, TypographySizeType };
