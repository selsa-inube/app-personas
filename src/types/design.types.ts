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

type AsType = (typeof as)[number];
type TextAlignType = (typeof textAlign)[number];

export type { AsType, TextAlignType };
