import { shape } from "prop-types";
import { iconAppearance, iconSpacing, iconVariant } from "./types";

const props = {
  icon: {
    description: "Is a React Element that contains the icon to be rendered.",
  },
  appearance: {
    control: "select",
    options: iconAppearance,
    description:
      "Controls the appearance of the icon. This is connected to the color design tokens.",
  },
  size: {
    description: "Controls the size of the icon using pixels",
  },
  spacing: {
    control: "select",
    options: iconSpacing,
    description: "Controls the padding of the icon.",
  },
  variant: {
    control: "select",
    options: iconVariant,
    description: "Controls the background of the icon.",
  },
  shape: {
    control: "select",
    options: shape,
    description:
      "Indicates whether the background of the icon is a circle or a rectangle with its borders rounded.",
  },
  cursorHover: {
    description: "Indicates whether the icon should react to a cursor hovering",
  },
  parentHover: {
    description:
      "Indicates if the icon should be display in hover state because its parent is hovered. This prop overrides whatever is defined in the cursorHover prop",
  },
  disabled: {
    description: "Controls if the icon is disabled",
  },
  onClick: {
    description: "Function to be called when the icon is clicked",
  },
};

export { props };
