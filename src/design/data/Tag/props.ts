import { tagAppearance } from "./types";

const props = {
  label: {
    description: "Controls the text that the tag will display",
  },
  appearance: {
    control: "select",
    options: tagAppearance,
    description: "Controls the background color of the tag",
  },
};

export { props };
