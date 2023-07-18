const justifyItems = ["start", "end", "center", "stretch"];
const alignItems = ["stretch", "start", "end", "center", "baseline"];
const justifyContent = [
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
];
const alignContent = [
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
];
const autoFlow = ["row", "column", "row dense", "column dense"];

const props = {
  children: {
    description: "Contains the items of the grid.",
  },
  templateColumns: {
    description: "Controls the grid-template-columns CSS property",
  },
  templateRows: {
    description: "Controls the grid-template-rows CSS property.",
  },
  gap: {
    description: "Controls both the column and row gap of the grid.",
  },
  justifyItems: {
    control: "select",
    options: justifyItems,
    description: "Controls the justify-items CSS property",
  },
  alignItems: {
    control: "select",
    options: alignItems,
    description: "Controls the align-items CSS property",
  },
  justifyContent: {
    control: "select",
    options: justifyContent,
    description: "Controls the justify-content CSS property",
  },
  alignContent: {
    control: "select",
    options: alignContent,
    description: "Controls the align-content CSS property",
  },
  autoColumns: {
    description: "Controls the grid-auto-columns CSS property",
  },
  autoRows: {
    description: "Controls the grid-auto-rows CSS property",
  },
  autoFlow: {
    control: "select",
    options: autoFlow,
    description: "Controls the grid-auto-flow CSS property",
  },
};

export {
  props,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  autoFlow,
};
