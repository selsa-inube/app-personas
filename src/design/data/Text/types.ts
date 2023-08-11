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

const textAsTags = [
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

type TextAlignType = (typeof textAlign)[number];
type TextAsTagsType = (typeof textAsTags)[number];

export { textAlign, textAsTags };
export type { TextAlignType, TextAsTagsType };
