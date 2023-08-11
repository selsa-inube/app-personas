import { inube } from "@design/tokens";

const textAppearance = Object.keys(inube.color.text);
const strokeAppearance = Object.keys(inube.color.stroke);
const surfaceAppearance = Object.keys(inube.color.surface);

type TextAppearanceType = keyof typeof inube.color.text;
type StrokeAppearanceType = keyof typeof inube.color.stroke;
type SurfaceAppearanceType = keyof typeof inube.color.surface;

export { textAppearance, strokeAppearance, surfaceAppearance };
export type { TextAppearanceType, StrokeAppearanceType, SurfaceAppearanceType };
