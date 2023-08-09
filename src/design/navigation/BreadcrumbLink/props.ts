import { size } from "@ptypes/design.types";

const props = {
  id: {
    control: { type: "text" },
    description: "shall be the id for the text",
  },
  isActive: {
    options: [true, false],
    control: { type: "boolean" },
    description:
      "if the switch is disabled or not. This prevents any interaction.",
    table: {
      defaultValue: { summary: "false" },
    },
  },
  handleClick: {
    options: ["logState"],
    control: { type: "func" },
    description: "shall be determine the behavior of the click event",
  },
  label: {
    control: { type: "text" },
    description: "shall constitute the content to be displayed",
  },
  typo: {
    options: size,
    control: { type: "select" },
    description: "indicates the font size used in the component",
  },
  path: {
    control: { type: "text" },
    description: "is the path where the BreadcrumbLink is going to navigate",
  },
  cursorHover: {
    description:
      "Indicates whether the component should react to a cursor hovering",
  },
};

export { props };
