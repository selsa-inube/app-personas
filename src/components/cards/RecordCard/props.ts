import { EMovementType } from "src/model/entity/product";

const parameters = {
  docs: {
    description: {
      component: "This component is responsible for displaying the movements.",
    },
  },
};

const props = {
  movementType: {
    control: "select",
    options: EMovementType,
    description:
      "This option corresponds to changing the appearance of the icon depending on the type of movement.",
  },
  description: {
    description:
      "This corresponds to the description attached to the title of the movement.",
  },
  totalValue: {
    description: "This corresponds to the total value of the movement.",
  },
  withExpandingIcon: {
    description:
      "Corresponds to the visualization of an icon to have a better appreciation of the movement.",
  },
  tag: {
    description: "Corresponds to the display of a tag in movement.",
  },
  attributes: {
    description:
      "Corresponds to an array of attributes to display on the card.",
  },
  loading: {
    description:
      "orresponds to the display when the card is loading.",
  },
};

export { parameters, props };
