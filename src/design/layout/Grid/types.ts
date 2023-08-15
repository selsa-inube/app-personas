const gridJustifyItems = ["start", "end", "center", "stretch"] as const;

const gridAlignItems = [
  "stretch",
  "start",
  "end",
  "center",
  "baseline",
] as const;

const gridJustifyContent = [
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
] as const;
const gridAlignContent = [
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
] as const;
const gridAutoFlow = ["row", "column", "row dense", "column dense"] as const;

type GridJustifyItemsType = (typeof gridJustifyItems)[number];
type GridAlignItemsType = (typeof gridAlignItems)[number];
type GridJustifyContentType = (typeof gridJustifyContent)[number];
type GridAlignContentType = (typeof gridAlignContent)[number];
type GridAutoFlowType = (typeof gridAutoFlow)[number];

export {
  gridAlignContent,
  gridAlignItems,
  gridAutoFlow,
  gridJustifyContent,
  gridJustifyItems,
};

export type {
  GridAlignContentType,
  GridAlignItemsType,
  GridAutoFlowType,
  GridJustifyContentType,
  GridJustifyItemsType,
};
