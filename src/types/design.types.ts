const as = ["p", "label", "h1", "h2", "h3", "h4", "h5", "h6", "span"] as const;
const textAlign = [
  "start",
  "end",
  "left",
  "right",
  "center",
  "justify",
  "initial",
  "inherit",
] as const;

export type { AsType, TextAlignType };

const variant = ["filled", "outlined", "none"] as const;

const shape = ["circle", "rectangle"] as const;

type AsType = (typeof as)[number];
type TextAlignType = (typeof textAlign)[number];
type VariantType = (typeof variant)[number];
type ShapeType = (typeof shape)[number];

export { shape, variant };
export type { ShapeType, VariantType };
