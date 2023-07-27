import { asTags, textAlign } from "src/types/design.types";
import { textAppearance } from "../../../types/color.types";
import { size, type } from "../../../types/typography.types";

const props = {
  as: {
    control: "select",
    options: asTags,
    description:
      "Controls the HTML element to use in the DOM when the component is rendered",
  },
  margin: {
    description: "Controls the area of the CSS Box Model",
  },
  padding: {
    description: "Controls the area of the CSS Box Model",
  },
  appearance: {
    control: "select",
    options: textAppearance,
    description: "Controls the element part of the color.text token",
  },
  type: {
    control: "select",
    options: type,
    description: "Controls the typography style of the text",
  },
  size: {
    control: "select",
    options: size,
    description: "Controls the size of the text",
  },
  textAlign: {
    control: "select",
    options: textAlign,
    description: "Controls the alignment of the text",
  },
  cursorHover: {
    description: "Indicates whether the text should react to a cursor hovering",
  },
  parentHover: {
    description:
      "Indicates if the text should be display in hover state because its parent is hovered. This prop overrides whatever is defined in the cursorHover prop",
  },
  disabled: {
    description: "Controls if the text should appear disabled",
  },
  ellipsis: {
    description:
      "Controls if the text should avoid overflowing or multiple line breaks and instead truncate the string with an ellipsis. This requires that the parent container has a width or max-width definition.",
  },
};

export { props };
