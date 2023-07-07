const direction = ["row", "column", "row-reverse", "column-reverse"];
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
];
const alignItems = ["flex-start", "flex-end", "center", "stretch", "baseline"];
const alignContent = [
  "normal",
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "space-between",
  "space-around",
];
const wrap = ["nowrap", "wrap", "wrap-reverse"];

const props = {
  children: {
    type: "object",
    description: "Includes the flex items the container will organize.",
  },
  direction: {
    control: "select",
    options: direction,
    description: "Controls the CSS flex-direction property of the flex items",
  },
  justifyContent: {
    control: "select",
    options: justifyContent,
    description: "Controls the CSS justify-content property of the flex items",
  },
  alignItems: {
    control: "select",
    options: alignItems,
    description: "Controls the CSS align-items property of the flex items",
  },
  alignContent: {
    control: "select",
    options: alignContent,
    description:
      "Controls the CSS align-content property for the flex container.",
  },
  gap: {
    type: "string",
    description: "Controls the row and column gap between flex items.",
  },
  height: {
    type: "string",
    description: "Controls the height of the flex container",
  },
  width: {
    type: "string",
    description: "Controls the width of the flex container",
  },
  padding: {
    type: "string",
    description: "Controls the padding of the flex container",
  },
  margin: {
    type: "string",
    description: "Controls the margin of the flex container",
  },
  wrap: {
    control: "select",
    options: wrap,
    description: "Controls if the container should wrap or not the items",
  },
};

export { props, direction, justifyContent, alignItems, alignContent, wrap };
