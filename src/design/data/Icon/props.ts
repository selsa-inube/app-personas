import { shape,  variant } from "../../../types/design.types";
import {spacing} from "../../../types/design.types";
import {appearance} from "../../../types/design.types";

const props = {
  icon: {
    description: "Is a React Element that contains the icon to be rendered.",
  },
  appearance: {
    control: "select",
    options: appearance,
    description:
      "Controls the appearance of the icon. This is connected to the color design tokens.",
  },
  size: {
    description: "Controls the size of the icon using pixels",
  },
  spacing: {
    control: "select",
    options: spacing,
    description: "Controls the padding of the icon.",
  },
  variant: {
    control: "select",
    options: variant,
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
};

export { appearance, props, shape, spacing, variant };
