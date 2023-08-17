import { size } from "@ptypes/typography.types";

const props = {
  size: {
    control: "select",
    options: size,
    description: "Controls the size of the label",
  },
  children: {
    description: "Controls the text to display in the label",
  },
  isDisabled: {
    description: "Controls if the label should appear disabled",
  },
  isFocused: {
    description: "Controls if the label should appear focused",
  },
  isInvalid: {
    description: "Controls if the label should appear invalid",
  },
  htmlFor: {
    description: "Controls the identification of the label",
  },
};

export { props };
