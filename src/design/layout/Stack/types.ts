const direction = ["row", "column", "row-reverse", "column-reverse"] as const;
const justifyContent = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
  "start",
  "end",
  "left",
  "right",
] as const;
const alignItems = [
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "baseline",
] as const;
const alignContent = [
  "normal",
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "space-between",
  "space-around",
] as const;
const wrap = ["nowrap", "wrap", "wrap-reverse"] as const;

type DirectionType = (typeof direction)[number];
type JustifyContentType = (typeof justifyContent)[number];
type AlignItemsType = (typeof alignItems)[number];
type AlignContentType = (typeof alignContent)[number];
type WrapType = (typeof wrap)[number];

export { alignContent, alignItems, direction, justifyContent, wrap };
export type {
  AlignContentType,
  AlignItemsType,
  DirectionType,
  JustifyContentType,
  WrapType,
};
