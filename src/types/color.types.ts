import { inube } from "../design/tokens";

const textAppearance = Object.keys(inube.color.text);

type TextAppearanceType = keyof typeof inube.color.text;

export { textAppearance };
export type { TextAppearanceType };
