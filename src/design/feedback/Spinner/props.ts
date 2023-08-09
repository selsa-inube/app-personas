import { appearance, size } from "@ptypes/design.types";

const props = {
  appearance: {
    control: "select",
    options: appearance,
    description: "Controls de color of the Spinner",
  },
  size: {
    control: "select",
    options: size,
    description: "Controls the size of the Spinner",
  },
  track: {
    description:
      "Controls whether or not the Spinner has a gray track behind the spinning color",
  },
};

export { appearance, props, size };
