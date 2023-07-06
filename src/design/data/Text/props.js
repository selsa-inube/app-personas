import { inube } from "../../tokens";

const as = ["p", "label", "h1", "h2", "h3", "h4", "h5", "h6", "span"];
const textAlign = ["start", "end", "center", "justify"];
const color = Object.keys(inube.color.text);
const type = Object.keys(inube.typography);
const size = Object.keys(inube.typography.body);

const props = {
  as: {
    control: "select",
    options: as,
    description:
      "Controls the HTML element to use in the DOM when the component is rendered",
  },
  margin: {
    description: "Controls the area of the CSS Box Model",
  },
  padding: {
    description: "Controls the area of the CSS Box Model",
  },
  color: {
    control: "select",
    options: color,
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
};

export { props, as, color, type, size, textAlign };
