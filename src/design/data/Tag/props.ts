import { tagAppearance, tagModifier } from "./types";

const props = {
  label: {
    description: "Controls the text that the tag will display",
  },
  appearance: {
    control: "select",
    options: tagAppearance,
    description: "Controls the background color of the tag",
  },
  textAppearance: {
    control: "select",
    options: tagAppearance,
    description: "Controls the text color of the tag",
  },
  modifier: {
    control: "select",
    options: tagModifier,
    description: "Controls the appearance of the tag",
  },
};

export { props };
