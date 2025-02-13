import { inputSizeTypes, inputStates } from "./types";

const parameters = {
  docs: {
    description: {
      component:
        "A dateField is used to collect and display date informationis also allows a user to write or edit date",
    },
  },
};

const props = {
  label: {
    description: "Controls the text to display in the label",
  },
  name: {
    description: "Name of the dateField",
  },
  id: {
    description: "Corresponds to the identifier of the datefield",
  },
  max: {
    description: "Sets the maximum date that can be selected",
  },
  min: {
    description: "Sets the minimum date that can be selected",
  },
  step: {
    description: "Sets the step of the date",
  },
  value: {
    description: "Correspond initial value",
  },
  size: {
    control: "select",
    options: inputSizeTypes,
    description: "Controls the size of the dateField",
  },
  state: {
    control: "select",
    options: inputStates,
    description: "Controls the state of the dateField",
  },
  required: {
    description: "Defines if the field is required or not",
  },
  fullwidth: {
    description: "Option to fit field width to its parent width",
  },
  readonly: {
    description: "Option to make the field read only",
  },
  disabled: {
    description: "Controls if the label should appear disabled",
  },
  message: {
    description: "Show when the field is validated and there is an error",
  },
  validMessage: {
    description: "Show when the field is validated without errors",
  },
};

export { parameters, props };
