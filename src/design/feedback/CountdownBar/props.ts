import { countdownBarAppearance } from "./types";

const parameters = {
  docs: {
    description: {
      component:
        "A countdown bar graphically communicates to the user a countdown",
    },
  },
};

const props = {
  height: {
    control: { type: "text" },
    description:
      "which allows it to be given a custom thickness, according to the need.",
    table: {
      defaultValue: { summary: "4px" },
    },
  },
  appearance: {
    options: countdownBarAppearance,
    control: { type: "select" },
    description: "colors used to identify the state of the component",
    table: {
      defaultValue: { summary: "primary" },
    },
  },
  duration: {
    control: { type: "number" },
    description: "the total duration of the animation, in milliseconds",
    table: {
      defaultValue: { summary: 1000 },
    },
  },
  paused: {
    control: { type: "boolean" },
    description: "pause or start the animation",
    table: {
      defaultValue: { summary: false },
    },
  },
};

export { props, parameters };
