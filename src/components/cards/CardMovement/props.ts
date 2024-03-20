import { EMovementType } from "src/model/entity/product";

const parameters = {
  docs: {
    description: {
      component:
        "This component is responsible for displaying the movements made by a card.",
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
  date: {
    description: "This corresponds to the date when the movement was made.",
  },
  quotas: {
    description:
      "This corresponds to the number of installments in which the movement was arranged.",
  },
};

export { parameters, props };
