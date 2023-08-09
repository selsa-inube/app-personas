import { sizeVariant } from "@ptypes/design.types";

const props = {
  handleClick: {
    options: ["logState"],
    control: { type: "func" },
    description: "shall be determine the behavior of the click event",
  },
  size: {
    options: sizeVariant,
    control: { type: "select" },
    description: "indicates the font size used in the component",
    table: {
      defaultValue: { summary: "labelLarge" },
    },
  },
  routes: {
    description:
      "The breadcrumb-component will utilize this routes for display, and consequently, it can be employed to locate the source of breadcrumbLinks present within this component.",
    table: {
      defaultValue: {
        summary: `This structure must be present [{ label: "", path: "", id: "" }]`,
      },
    },
  },
  cursorHover: {
    description:
      "Indicates whether the component should react to a cursor hovering",
  },
};

export { props };
