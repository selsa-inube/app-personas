const asTags = [
  "p",
  "label",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
] as const;
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

type AsTagsType = (typeof asTags)[number];
type TextAlignType = (typeof textAlign)[number];

export { asTags, textAlign };
export type { AsTagsType, TextAlignType };
