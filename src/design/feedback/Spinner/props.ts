import { spinnerAppearance, spinnerSize } from "./types";

const props = {
  appearance: {
    control: "select",
    options: spinnerAppearance,
    description: "Controls de color of the Spinner",
  },
  size: {
    control: "select",
    options: spinnerSize,
    description: "Controls the size of the Spinner",
  },
  track: {
    description:
      "Controls whether or not the Spinner has a gray track behind the spinning color",
  },
};

export { props };
