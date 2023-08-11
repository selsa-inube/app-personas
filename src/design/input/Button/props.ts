import { buttonAppearance, buttonSpacing, buttonVariant } from "./types";

const props = {
  children: {
    description: "Contains the text that the button will display",
  },
  iconBefore: {
    description:
      "Contains an icon to be rendered before the text of the button.",
  },
  iconAfter: {
    description:
      "Contains an icon to be rendered after the text of the button.",
  },
  appearance: {
    control: "select",
    options: buttonAppearance,
    description: "Indicates the colors and background colors of the button.",
  },
  variant: {
    control: "select",
    options: buttonVariant,
    description: "Controls the surface of the button.",
  },
  spacing: {
    control: "select",
    options: buttonSpacing,
    description: "Controls the padding of the button.",
  },
  fullwidth: {
    description:
      "Controls if the button should use the whole width of its parent container.",
  },
  disabled: {
    description: "Controls if the button is disabled",
  },
  load: {
    description:
      "Controls if the user should display that a process is currently loading",
  },
};

export { props };
